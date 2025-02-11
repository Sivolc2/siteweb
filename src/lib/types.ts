export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string, onToken?: (token: string) => void) => Promise<void>;
  addAssistantMessage: (content: string) => void;
  isLoading: boolean;
  error: string | null;
} 