export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface MetaData {
  imageUrl?: string;
  title?: string;
  description?: string;
}