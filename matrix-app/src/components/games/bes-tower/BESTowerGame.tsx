'use client';

import React, { useState, useCallback } from 'react';
import { useAudioEngine } from './hooks/useAudioEngine';
import { useGameEngine } from './hooks/useGameEngine';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { GAME_STATES } from './utils/config';

export function BESTowerGame() {
    // Engine specific UI state throttled or event-driven to avoid 60fps React re-renders
    const [uiState, setUiState] = useState({
        gameState: GAME_STATES.MENU,
        score: 0,
        hunger: 100,
        social: 100,
        nextBlockType: '',
        gameOverReason: ''
    });

    const audioEngine = useAudioEngine();

    const handleUIUpdate = useCallback((partialState: any) => {
        setUiState(prev => {
            const next = { ...prev, ...partialState };
            if (partialState.activeBlock) {
                next.nextBlockType = partialState.activeBlock.type;
            }
            return next;
        });
    }, []);

    const { initGame, placeBlock, gameStateRef } = useGameEngine({
        onUIUpdate: handleUIUpdate,
        audioEngine
    });

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden select-none font-mono">
            {/* Matrix Background */}
            <iframe 
                className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 z-0"
                src="https://www.youtube.com/embed/MUVo20q6tx8?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=MUVo20q6tx8" 
                title="Matrix Rain Background" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            />

            {/* Game Canvas & UI Container (Mobile sizing) */}
            <div className="relative w-full max-w-xl h-full mx-auto z-10 border-x border-green-500/20 bg-black/40">
                <GameCanvas 
                    gameStateRef={gameStateRef} 
                    onPlaceBlock={placeBlock} 
                />
                
                <GameUI 
                    gameState={uiState.gameState}
                    score={uiState.score}
                    hunger={uiState.hunger}
                    social={uiState.social}
                    nextBlockType={uiState.nextBlockType}
                    gameOverReason={uiState.gameOverReason as string}
                    onStart={initGame}
                    onRestart={initGame}
                />
            </div>
        </div>
    );
}
