import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-col-1 items-center">
      <div className="flex gap-4 max-w-4xl mx-auto items-center mb-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none rounded-full border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 bg-white h-auto"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="items-center ml-1 hover:scale-125 mt-1 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
         >
          <Send size={30} />
        </button>
      </div>
    </div>
  );
}
