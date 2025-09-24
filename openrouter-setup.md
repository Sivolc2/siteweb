# OpenRouter Integration with Gemini 2.5 Pro

This document provides context and setup instructions for the OpenRouter integration using Google's Gemini 2.5 Pro model.

## Overview

The chatbot has been migrated from Anthropic's Claude to use OpenRouter with Google's Gemini 2.5 Pro model. This provides:

- Access to multiple AI models through a single API
- Cost-effective pricing
- High-quality responses from Google's latest model

## Environment Variables Required

Add these to your `.env.local` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
YOUR_SITE_URL=http://localhost:3000
YOUR_APP_NAME=Personal Website Chat
```

## Model Information

**Current Model**: `google/gemini-2.5-pro`

### Alternative Models Available

You can switch to any of these models by changing the model parameter in `/src/app/api/chat/route.ts`:

#### Premium Models
- `anthropic/claude-sonnet-4` - Latest Claude model
- `openai/o3-pro` - OpenAI's most advanced model
- `google/gemini-2.5-pro-preview` - Preview version with latest features

#### Cost-Effective Options
- `google/gemini-2.5-flash` - Faster, cheaper version of Gemini 2.5
- `mistralai/mistral-large-2411` - High-quality European model
- `meta-llama/llama-3.3-70b-instruct` - Open source alternative

#### Free Models (with limitations)
- `google/gemini-2.5-flash-lite-preview-06-17:free`
- `mistralai/mistral-small-3.2-24b-instruct:free`
- `qwen/qwen-2.5-72b-instruct:free`

## Technical Implementation

### Key Changes Made

1. **Provider Migration**: Switched from `@anthropic-ai/sdk` to `openai` package
2. **API Endpoint**: Using OpenRouter's endpoint (`https://openrouter.ai/api/v1`)
3. **Model Selection**: Set to `google/gemini-2.5-pro`
4. **Stream Processing**: Updated to handle OpenAI-compatible streaming format

### Code Structure

```typescript
// Initialize OpenAI client with OpenRouter
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
});

// Create streaming request
const stream = await client.chat.completions.create({
  model: 'google/gemini-2.5-pro',
  max_tokens: 1024,
  temperature: 0.7,
  messages: [...],
  stream: true,
  extra_headers: {
    "HTTP-Referer": YOUR_SITE_URL,
    "X-Title": YOUR_APP_NAME
  }
});
```

## Getting Started

1. **Get OpenRouter API Key**:
   - Visit [openrouter.ai](https://openrouter.ai)
   - Create an account
   - Generate an API key

2. **Install Dependencies**:
   ```bash
   npm install openai
   npm uninstall @anthropic-ai/sdk  # Remove old dependency
   ```

3. **Configure Environment**:
   - Add `OPENROUTER_API_KEY` to your environment variables
   - Optionally set `YOUR_SITE_URL` and `YOUR_APP_NAME` for tracking

4. **Test the Integration**:
   - Start your development server
   - Try sending a message through the chat interface

## Monitoring and Debugging

- Check OpenRouter dashboard for usage statistics
- Monitor console logs for API errors
- Verify stream processing is working correctly

## Cost Considerations

- Gemini 2.5 Pro: ~$3.50 per 1M input tokens, ~$10.50 per 1M output tokens
- Consider using Gemini 2.5 Flash for development/testing (much cheaper)
- Monitor usage through OpenRouter dashboard

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Verify API key is correctly set
2. **Rate Limits**: Check OpenRouter limits for your plan
3. **Model Unavailable**: Ensure the model ID is correct
4. **Streaming Issues**: Verify the stream processing logic matches OpenAI format

### Error Handling

The implementation includes comprehensive error handling for:
- API authentication failures
- Network timeouts
- Invalid request formats
- Model availability issues

## Future Considerations

- Consider implementing model switching based on request complexity
- Add retry logic for transient failures
- Implement usage tracking and alerts
- Consider caching for frequently asked questions