import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-3 ${isBot ? 'bg-gray-50' : ''} p-4 border-b border-gray-100`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
      }`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-medium text-sm text-gray-600">
          {isBot ? 'AI Assistant' : 'You'}
        </p>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}