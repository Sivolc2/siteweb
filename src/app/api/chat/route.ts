import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@/lib/types';

// Validate environment variables
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Debug environment variables
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
  console.log('🚀 Chat API request received');

  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;
    
    console.log('📥 Request payload:', {
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content,
      systemPromptLength: systemPrompt?.length,
    });

    // Input validation
    if (!Array.isArray(messages) || !systemPrompt || typeof systemPrompt !== 'string') {
      console.warn('❌ Invalid request format:', { messages, systemPrompt });
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    console.log('🤖 Initializing Anthropic stream...');
    // Create stream
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      stream: true,
    });
    console.log('✅ Stream initialized successfully');

    // Create a readable stream
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let chunkCount = 0;
          let totalTextLength = 0;
          
          console.log('📤 Starting stream processing...');
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && 
                'delta' in chunk && 
                'text' in chunk.delta) {
              chunkCount++;
              totalTextLength += chunk.delta.text.length;
              
              if (chunkCount % 50 === 0) {
                console.log(`🔄 Stream progress: ${chunkCount} chunks, ${totalTextLength} chars total`);
              }
              
              const data = JSON.stringify({ text: chunk.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          console.log(`✅ Stream completed: ${chunkCount} total chunks, ${totalTextLength} total chars`);
          // Send done signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('❌ Stream processing error:', {
            error: error instanceof Error ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            } : 'Unknown error',
            timestamp: new Date().toISOString(),
          });
          const errorData = JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    console.log('📤 Sending response stream...');
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
      console.error('❌ Anthropic API Error:', {
        status: error.status,
        message: error.message,
        response: error.error,
        headers: error.headers,
        timestamp: new Date().toISOString(),
        type: 'AnthropicAPIError'
      });
    } else {
      console.error('❌ Unexpected error:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : error,
        timestamp: new Date().toISOString(),
        type: 'UnexpectedError'
      });
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