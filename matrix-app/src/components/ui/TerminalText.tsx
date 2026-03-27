'use client';

import { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TerminalText({
  text,
  speed = 50,
  className = '',
  onComplete,
  showCursor = true,
}: TerminalTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(p => p + text[idx]);
        setIdx(p => p + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [idx, text, speed, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      {showCursor && !done && (
        <span className="text-[#00FF41] animate-pulse">█</span>
      )}
    </span>
  );
}
