import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Message } from '@/lib/types';

// Validate environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const YOUR_SITE_URL = process.env.YOUR_SITE_URL || "http://localhost:3000";
const YOUR_APP_NAME = process.env.YOUR_APP_NAME || "Personal Website Chat";

// Debug environment variables
console.log('OpenRouter API Key length:', OPENROUTER_API_KEY?.length);

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set in environment variables');
}

// Initialize OpenAI client with OpenRouter
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
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

    console.log('🤖 Initializing OpenRouter stream...');
    // Create stream
    const stream = await client.chat.completions.create({
      model: 'google/gemini-flash-1.5',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        }))
      ],
      stream: true,
    }, {
      headers: {
        "HTTP-Referer": YOUR_SITE_URL,
        "X-Title": YOUR_APP_NAME
      }
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
            if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content) {
              chunkCount++;
              const text = chunk.choices[0].delta.content;
              totalTextLength += text.length;

              if (chunkCount % 50 === 0) {
                console.log(`🔄 Stream progress: ${chunkCount} chunks, ${totalTextLength} chars total`);
              }

              const data = JSON.stringify({ text });
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
    console.error('❌ OpenRouter API Error:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
      timestamp: new Date().toISOString(),
      type: 'OpenRouterAPIError'
    });

    // Handle authentication errors
    if (error instanceof Error && error.message.includes('401')) {
      return NextResponse.json(
        { error: 'Authentication failed with OpenRouter. Please check API key configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 