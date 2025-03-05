import { useState, useEffect, useRef } from "react";

interface UseTypewriterProps {
  content: string;
  enabled: boolean;
  speed?: number;
}

export function useTypewriter({ content, enabled, speed = 30 }: UseTypewriterProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayedContent(content);
      return;
    }

    setIsTyping(true);
    setDisplayedContent("");
    currentIndex.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (currentIndex.current < content.length) {
        setDisplayedContent(content.slice(0, currentIndex.current + 1));
        currentIndex.current++;
      } else {
        setIsTyping(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [content, enabled, speed]);

  return { displayedContent, isTyping };
}
