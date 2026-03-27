'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
}

export function MatrixRain({
  opacity = 0.1,
  speed = 1,
  fontSize = 14,
  color = '#00FF41',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウカキクケサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArr = chars.split('');
    const columns = () => Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns()).fill(1);

    window.addEventListener('resize', () => { drops = Array(columns()).fill(1); });

    let animId: number;
    let lastTime = 0;
    const interval = 50 / speed;

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);
      if (now - lastTime < interval) return;
      lastTime = now;

      ctx.fillStyle = `rgba(13,2,8,${opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    animId = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, [opacity, speed, fontSize, color]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
