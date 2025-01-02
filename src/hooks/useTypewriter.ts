import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  content: string;
  enabled: boolean;
  speed?: number;
}

export function useTypewriter({ content, enabled, speed = 30 }: UseTypewriterProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedContent(content);
      return;
    }

    setIsTyping(true);
    setDisplayedContent('');
    let index = -1;

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
  }, [content, enabled, speed]);

  return { displayedContent, isTyping };
}
