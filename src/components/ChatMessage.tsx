import {  User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types/chat';
import { useTypewriter } from '../hooks/useTypewriter';
import { extractLinksAndPrices } from '../utils/linkExtractor';
import { ProductCard } from './ProductCard';
import Logo from '../assets/Logo.png';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  const { displayedContent, isTyping } = useTypewriter({
    content: message.content,
    enabled: isBot,
  });

  const { links, prices } = extractLinksAndPrices(message.content);
  const parts = displayedContent.split(/https?:\/\/[^\s)]+/g);

  return (
    <div className={`chat ${isBot ? 'chat-start' : 'chat-end'}`}>
      <div className={`chat-bubble h-auto p-4 ${
        isBot
          ? 'bg-yellow-400 text-black border-r-2 border-surfacea30'
          : 'bg-surfacea20 text-white border-r-2 flex h-auto rounded-full border-surfacea30'
      }`}>
        <div className="prose prose-sm mt-2 mr-1">
          {isBot ? (
            <>
              {parts.map((text, index) => (
                <div key={index}>
                  <ReactMarkdown>{text}</ReactMarkdown>
                  {links[index] && (
                    <ProductCard 
                      url={links[index]} 
                      price={prices[index]} 
                    />
                  )}
                </div>
              ))}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-gray-500 animate-pulse" />
              )}
            </>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? 'bg-blue-400 text-white' : 'bg-blue-400 text-white'
        }`}>
          {isBot ? (
            <img
              src={Logo}
              alt="Logo"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <User className="rounded-full" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}