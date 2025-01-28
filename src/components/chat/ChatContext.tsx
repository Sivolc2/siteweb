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
        const fullContext = `${context}\n\nProjects Data:\n${JSON.stringify(projectsData, null, 2)}`;
        setSystemContext(fullContext);
      } catch (error) {
        console.error('Failed to load context:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load chat context' });
      }
    }
    loadContext();
  }, []);

  const sendMessage = async (content: string, onToken?: (token: string) => void) => {
    try {
      // Check if the message is related to doing work or tasks
      const workRelatedPatterns = [
        // Direct code requests
        'write code',
        'code for',
        'write a program',
        'create a script',
        'build an app',
        'develop a',
        'implement',
        'coding assignment',
        'homework',
        
        // Debug/fix requests
        'debug',
        'fix my code',
        'solve this error',
        'help with my code',
        
        // General work requests
        'do my',
        'help me with my',
        'complete my',
        'finish my',
        
        // Project requests
        'my project',
        'school project',
        'work project',
        'assignment',
        
        // Programming tasks
        'function to',
        'program that',
        'script to',
      ];

      const isWorkRequest = workRelatedPatterns.some(pattern => 
        content.toLowerCase().includes(pattern.toLowerCase())
      );

      if (isWorkRequest) {
        const responses = [
          "I'm focused on discussing this website and its projects. I can't help with external coding tasks or assignments, but I'd be happy to tell you about the technologies and approaches used here!",
          "I'm designed to chat about this website's features and implementation. While I can't help with external work or coding tasks, I can explain how similar features were built here.",
          "Let's keep our discussion focused on this website! I can't assist with external work or coding tasks, but I can share insights about the technologies and patterns used in this site."
        ];
        
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            role: 'assistant',
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: Date.now()
          }
        });
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

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