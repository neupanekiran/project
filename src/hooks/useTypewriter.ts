import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  content: string;
  enabled: boolean;
  speed?: number;
}

export function useTypewriter({ content, enabled, speed = 20 }: UseTypewriterProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsTyping(true);
      let index = -1;
      setDisplayedContent('');

      const typingInterval = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent((prev) => prev + content.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, enabled, speed]);

  return { displayedContent, isTyping };
}