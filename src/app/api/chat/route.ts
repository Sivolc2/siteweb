import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@/lib/types';

// Validate environment variables
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Debug environment variables
console.log('Full API Key:', ANTHROPIC_API_KEY);
console.log('API Key length:', ANTHROPIC_API_KEY?.length);

if (!ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
}

// Initialize Anthropic with API key from server environment
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-version': '2023-06-01'
  }
});

export async function POST(request: Request) {
  const encoder = new TextEncoder();

  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;

    // Input validation
    if (!Array.isArray(messages) || !systemPrompt || typeof systemPrompt !== 'string') {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    // Create stream
    const stream = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      stream: true,
    });

    // Create a readable stream
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && 
                'delta' in chunk && 
                'text' in chunk.delta) {
              const data = JSON.stringify({ text: chunk.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          // Send done signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    // Enhanced error logging
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API Error:', {
        status: error.status,
        message: error.message,
        response: error.error,
        headers: error.headers,
      });
    } else {
      console.error('Unexpected error:', error);
    }

    // Handle authentication errors
    if (error instanceof Anthropic.APIError && error.status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed with AI service. Please check API key configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 