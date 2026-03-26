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
        <div className="relative w-full h-screen max-w-md mx-auto bg-[#0d1117] overflow-hidden shadow-2xl select-none font-sans">
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
    );
}
