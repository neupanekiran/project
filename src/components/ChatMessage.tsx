
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`chat ${isBot ? 'chat-start' : 'chat-end'} `}>
    <div className={`chat-bubble p-4 ${isBot ? 'bg-green-100 text-green-600' : 'bg-slate-600 text-white flex  rounded-full space-x-1 h-auto'}`}>
    <div className="prose prose-sm mt-2 mr-1">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? 'bg-green-200' : 'bg-blue-200'
        }`}>
          {isBot ? <Bot className='roudned-full' size={20} /> : <User className='rounded-full' size={20} />}
        </div>
        
      </div>
      
    </div>
  </div>
  
  );
}