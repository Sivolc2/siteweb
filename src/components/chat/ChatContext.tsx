import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Message, ChatState, ChatContextType } from '@/lib/types';

// Initial state
const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

// Action types
type Action =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_LAST_MESSAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Reducer
function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'UPDATE_LAST_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg, index) => 
          index === state.messages.length - 1
            ? { ...msg, content: action.payload }
            : msg
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [systemContext, setSystemContext] = React.useState<string>('');

  // Load context from context.md and projects data
  useEffect(() => {
    async function loadContext() {
      try {
        const [contextResponse, projectsModule] = await Promise.all([
          fetch('/context.md'),
          import('@/data/projects')
        ]);
        
        const context = await contextResponse.text();
        const projectsData = projectsModule.projectData;
        
        // Combine context and projects data
        const fullContext = `
You are a friendly and knowledgeable assistant focused exclusively on discussing Clovis' website, projects, skills, and professional experiences.

Important Guidelines:
- DO NOT help with coding tasks or homework assignments
- DO NOT provide code solutions or debugging help
- DO NOT assist with general programming questions
- DO NOT help with writing essays or assignments
- ONLY discuss topics directly related to Clovis' work, projects, and experiences
- If asked about prohibited topics, politely redirect the conversation back to Clovis' projects and experiences

Context Information:
${context}

Projects Data:
${JSON.stringify(projectsData, null, 2)}`;
        setSystemContext(fullContext);
      } catch (error) {
        console.error('Failed to load context:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load chat context' });
      }
    }
    loadContext();
  }, []);

  const addAssistantMessage = (content: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { role: 'assistant', content, timestamp: Date.now() },
    });
  };

  const sendMessage = async (content: string, onToken?: (token: string) => void) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Add user message
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { role: 'user', content, timestamp: Date.now() },
      });

      // Add empty assistant message that we'll update
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { role: 'assistant', content: '', timestamp: Date.now() },
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...state.messages.map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: 'user', content }
          ],
          systemPrompt: systemContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                break;
              }

              try {
                const parsed = JSON.parse(data);
                
                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.text) {
                  assistantMessage += parsed.text;
                  dispatch({ type: 'UPDATE_LAST_MESSAGE', payload: assistantMessage });
                  onToken?.(parsed.text);
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error reading stream:', error);
        throw error;
      }

    } catch (error) {
      console.error('Chat error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to send message. Please try again.',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        sendMessage,
        addAssistantMessage,
        isLoading: state.isLoading,
        error: state.error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}