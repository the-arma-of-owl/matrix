'use client';

import React, { useRef, useEffect } from 'react';
import { GameEngineState } from '../hooks/useGameEngine';
import { LOGICAL_WIDTH, LOGICAL_HEIGHT, GAME_STATES, BLOCK_COLORS, BLOCK_TYPES } from '../utils/config';

interface GameCanvasProps {
    gameStateRef: React.MutableRefObject<GameEngineState>;
    onPlaceBlock: () => void;
}

export function GameCanvas({ gameStateRef, onPlaceBlock }: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const render = () => {
            try {
                const gameState = gameStateRef.current;
                
                if (!canvas.parentElement) {
                    animationId = requestAnimationFrame(render);
                    return;
                }
                
                const parentWidth = canvas.parentElement.clientWidth;
                const parentHeight = canvas.parentElement.clientHeight;
                
                // Avoid rendering if parent hasn't gained layout yet
                if (parentWidth === 0 || parentHeight === 0) {
                    animationId = requestAnimationFrame(render);
                    return;
                }
                
                if (canvas.width !== parentWidth || canvas.height !== parentHeight) {
                    canvas.width = parentWidth;
                    canvas.height = parentHeight;
                }

                const scaleX = canvas.width / LOGICAL_WIDTH;
                const scaleY = canvas.height / LOGICAL_HEIGHT;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                
                let shakeX = 0;
                let shakeY = 0;
                if (gameState.shakeTime > 0 && gameState.gameState === GAME_STATES.PLAYING) {
                    const intensity = Math.min(10, gameState.shakeTime / 100);
                    shakeX = (Math.random() - 0.5) * intensity * scaleX;
                    shakeY = (Math.random() - 0.5) * intensity * scaleY;
                    ctx.translate(shakeX, shakeY);
                }

                ctx.scale(scaleX, scaleY);

                const getScreenY = (worldY: number) => {
                    const cy = isNaN(gameState.cameraY) ? 0 : gameState.cameraY;
                    return LOGICAL_HEIGHT - 100 - worldY + cy;
                };

                // Base line (Matrix Ground)
                ctx.strokeStyle = 'rgba(34,197,94,0.4)';
                ctx.lineWidth = 3;
                ctx.shadowColor = '#22c55e';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                const baseY = getScreenY(0);
                ctx.moveTo(0, baseY);
                ctx.lineTo(LOGICAL_WIDTH, baseY);
                ctx.stroke();

                // Reset shadow for performance
                ctx.shadowBlur = 0;

                const getTypeName = (t: string) => {
                    switch(String(t)) {
                        case 'investment': return 'YATIRIM';
                        case 'food': return 'YEMEK';
                        case 'social': return 'SOSYAL';
                        case 'devlet': return '%30 DEVLET';
                        case 'base': return '';
                        default: return String(t).toUpperCase();
                    }
                };

                const drawBlock = (x: number, worldY: number, w: number, h: number, colors: any, text?: string) => {
                    const left = x - w / 2;
                    const top = getScreenY(worldY) - h;
                    
                    if (!colors) colors = BLOCK_COLORS.base;
                    
                    ctx.fillStyle = colors.main || '#ccc';
                    ctx.lineJoin = 'round';
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = colors.border || '#999';
                    
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = 'transparent';

                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(left, top, w, h, 8);
                    } else {
                        ctx.rect(left, top, w, h);
                    }
                    ctx.fill();
                    ctx.stroke();
                    
                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(left, top, w, h/2, [8, 8, 0, 0] as any);
                    } else {
                        ctx.rect(left, top, w, h/2);
                    }
                    ctx.fill();

                    if (text && text !== '') {
                        ctx.font = '900 22px "Arial", sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        
                        // Siyah Kalın Kontur (Stroke)
                        ctx.lineWidth = 6;
                        ctx.strokeStyle = '#000000';
                        ctx.strokeText(text, x, top + h/2 + 2);
                        
                        // Beyaz Dolgu (Fill)
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(text, x, top + h/2 + 2);
                    }
                };

                // draw rested
                if (gameState.blocks && Array.isArray(gameState.blocks)) {
                    gameState.blocks.forEach((b) => {
                        drawBlock(b.x, b.y, b.width, b.height, b.color, getTypeName(b.type));
                    });
                }

                // active block drop target line
                if (gameState.gameState === GAME_STATES.PLAYING && gameState.activeBlock) {
                    const b = gameState.activeBlock;
                    const targetDrawY = getScreenY(b.y);
                    
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([10, 10]);
                    ctx.beginPath();
                    ctx.moveTo(b.x, targetDrawY - b.height);
                    ctx.lineTo(b.x, baseY);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    
                    drawBlock(b.x, b.y, b.width, b.height, b.color, getTypeName(b.type));
                }

                ctx.restore();
            } catch (err) {
                console.error("Canvas Render Error:", err);
                if (ctx) ctx.restore(); // Ensure context is restored on crash
            }
            
            animationId = requestAnimationFrame(render);
        };

        animationId = requestAnimationFrame(render);
        
        return () => cancelAnimationFrame(animationId);
    }, [gameStateRef]); // Run loop once, read from ref inside

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        onPlaceBlock();
    };

    return (
        <canvas 
            ref={canvasRef} 
            className="w-full h-full block touch-none"
            onPointerDown={handlePointerDown}
        />
    );
}
