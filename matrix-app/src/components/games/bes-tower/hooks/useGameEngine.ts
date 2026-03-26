'use client';

import { useRef, useCallback, useEffect } from 'react';
import { BLOCK_TYPES, BLOCK_COLORS, BASE_BLOCK_WIDTH, BLOCK_HEIGHT, DECAY_BASE_RATE, BlockEntity, GAME_STATES, LOGICAL_WIDTH, LOGICAL_HEIGHT } from '../utils/config';
import { checkTowerBalance } from '../utils/physics';

export interface GameEngineState {
    gameState: GAME_STATES;
    score: number;
    hunger: number;
    social: number;
    blocks: BlockEntity[];
    activeBlock: BlockEntity | null;
    cameraY: number;
    shakeTime: number;
    gameOverReason: string;
}

interface UseGameEngineProps {
    onUIUpdate: (state: Partial<GameEngineState>) => void;
    audioEngine: any;
}

export function useGameEngine({ onUIUpdate, audioEngine }: UseGameEngineProps) {
    const s = useRef<GameEngineState>({
        gameState: GAME_STATES.MENU,
        score: 0,
        hunger: 100,
        social: 100,
        blocks: [],
        activeBlock: null,
        cameraY: 0,
        shakeTime: 0,
        gameOverReason: ''
    });

    const runRefs = useRef({
        lastTime: 0,
        animationId: 0,
        targetCameraY: 0,
        narrowNextBlock: false,
        blockSpeedMulti: 3
    });

    const getNextBlockType = () => {
        const r = Math.random();
        if (r < 0.5) return BLOCK_TYPES.INVESTMENT;
        if (r < 0.7) return BLOCK_TYPES.FOOD;
        if (r < 0.9) return BLOCK_TYPES.SOCIAL;
        return BLOCK_TYPES.DEVLET;
    };

    const spawnBlock = useCallback(() => {
        const nextType = getNextBlockType();
        let width = BASE_BLOCK_WIDTH;
        
        if (runRefs.current.narrowNextBlock && (nextType === BLOCK_TYPES.INVESTMENT || nextType === BLOCK_TYPES.DEVLET)) {
            width *= 0.7;
            runRefs.current.narrowNextBlock = false;
        }
        
        if (nextType === BLOCK_TYPES.DEVLET) {
            width *= 1.3;
        }

        const colorObj = BLOCK_COLORS[nextType as keyof typeof BLOCK_COLORS] || BLOCK_COLORS[BLOCK_TYPES.INVESTMENT];
        const yLevel = s.current.blocks.length * BLOCK_HEIGHT;
        const speed = runRefs.current.blockSpeedMulti + (s.current.blocks.length * 0.05);

        s.current.activeBlock = {
            x: Math.random() > 0.5 ? width / 2 : LOGICAL_WIDTH - width / 2,
            y: yLevel,
            width,
            height: BLOCK_HEIGHT,
            type: nextType,
            color: colorObj,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed,
            mass: width * BLOCK_HEIGHT
        };
        
        onUIUpdate({ activeBlock: s.current.activeBlock });
    }, [onUIUpdate]);

    const initGame = useCallback(() => {
        audioEngine.init();
        audioEngine.startBGM();

        s.current = {
            gameState: GAME_STATES.PLAYING,
            score: 0,
            hunger: 100,
            social: 100,
            blocks: [],
            activeBlock: null,
            cameraY: 0,
            shakeTime: 0,
            gameOverReason: ''
        };

        runRefs.current = {
            lastTime: performance.now(),
            animationId: 0,
            targetCameraY: 0,
            narrowNextBlock: false,
            blockSpeedMulti: 3
        };

        s.current.blocks.push({
            x: LOGICAL_WIDTH / 2,
            y: 0,
            width: 250,
            height: 60,
            type: 'base',
            color: BLOCK_COLORS.base,
            mass: 250 * 60
        });

        spawnBlock();
        onUIUpdate({ gameState: GAME_STATES.PLAYING, score: 0, hunger: 100, social: 100, activeBlock: s.current.activeBlock });

        const loop = (timestamp: number) => {
            const dt = timestamp - runRefs.current.lastTime;
            runRefs.current.lastTime = timestamp;
            update(dt);
            runRefs.current.animationId = requestAnimationFrame(loop);
        };

        cancelAnimationFrame(runRefs.current.animationId);
        runRefs.current.animationId = requestAnimationFrame(loop);
    }, [audioEngine, spawnBlock, onUIUpdate]);

    const triggerGameOver = useCallback((reason: string) => {
        if (s.current.gameState === GAME_STATES.GAMEOVER) return;
        
        s.current.gameState = GAME_STATES.GAMEOVER;
        s.current.gameOverReason = reason;
        
        audioEngine.playDevrilme();
        setTimeout(() => audioEngine.playGameOver(), 1000);
        audioEngine.stopBGM();

        const currentHigh = parseInt(localStorage.getItem('besHighScore') || '0', 10);
        if (s.current.score > currentHigh) {
            localStorage.setItem('besHighScore', s.current.score.toString());
        }

        let finalReason = reason;
        if (s.current.score > 30 && reason.includes('devrildi')) {
            finalReason = "Kule devrildi, ama fena birikim yapmadın! Daha iyi denge kurmalısın.";
        }
        
        s.current.gameOverReason = finalReason;
        onUIUpdate({ gameState: GAME_STATES.GAMEOVER, gameOverReason: finalReason, score: s.current.score });
    }, [audioEngine, onUIUpdate]);

    const placeBlock = useCallback(() => {
        if (s.current.gameState !== GAME_STATES.PLAYING || !s.current.activeBlock) return;
        
        audioEngine.playClick();
        
        s.current.blocks.push({ ...s.current.activeBlock });
        const placed = s.current.activeBlock;
        
        if (!checkTowerBalance(s.current.blocks)) {
            triggerGameOver("Kule devrildi! Dengeyi sağlayamadın.");
            return;
        }

        if (placed.type === BLOCK_TYPES.INVESTMENT) {
            s.current.score++;
        } else if (placed.type === BLOCK_TYPES.FOOD) {
            s.current.hunger = Math.min(100, s.current.hunger + 40);
            runRefs.current.narrowNextBlock = true;
            audioEngine.playCashRegister();
        } else if (placed.type === BLOCK_TYPES.SOCIAL) {
            s.current.social = Math.min(100, s.current.social + 40);
            s.current.shakeTime = 3000;
            audioEngine.playCashRegister();
        } else if (placed.type === BLOCK_TYPES.DEVLET) {
            s.current.score += 2;
            s.current.shakeTime = 0;
            audioEngine.playStateContribution();
        }

        const topY = s.current.blocks.length * BLOCK_HEIGHT;
        if (topY > LOGICAL_HEIGHT / 2) {
            runRefs.current.targetCameraY = topY - LOGICAL_HEIGHT / 2 + 100;
        }
        
        if (s.current.gameState === GAME_STATES.PLAYING) {
            onUIUpdate({ score: s.current.score, hunger: s.current.hunger, social: s.current.social });
            spawnBlock();
        }
    }, [audioEngine, spawnBlock, triggerGameOver, onUIUpdate]);

    const update = (dt: number) => {
        if (s.current.gameState !== GAME_STATES.PLAYING) return;

        const { activeBlock } = s.current;
        if (activeBlock) {
            const spd = activeBlock.speed || 0;
            const dir = activeBlock.direction || 1;
            activeBlock.x += dir * spd * (dt / 16);
            
            if (activeBlock.x + activeBlock.width / 2 > LOGICAL_WIDTH) {
                activeBlock.x = LOGICAL_WIDTH - activeBlock.width / 2;
                activeBlock.direction = -1;
            } else if (activeBlock.x - activeBlock.width / 2 < 0) {
                activeBlock.x = activeBlock.width / 2;
                activeBlock.direction = 1;
            }
        }

        s.current.cameraY += (runRefs.current.targetCameraY - s.current.cameraY) * 0.1;

        if (s.current.shakeTime > 0) {
            s.current.shakeTime -= dt;
        }

        const decayMulti = 1 + (s.current.blocks.length * 0.05);
        const decay = (dt / 1000) * DECAY_BASE_RATE * decayMulti;

        s.current.hunger -= decay;
        s.current.social -= decay;

        // UI updates throttle (we can assume the requestAnimationFrame provides smooth Canvas drawing via ref
        // but for HUD, UI is purely driven by setUiState - we can rate limit UI state updates if needed, 
        // though modern React batches well. A simpler approach is to update UI every frame, 
        // passing changes up. To save React performance, let's only do it occasionally.
        if (Math.random() < 0.2) { // 20% of frames we update UI bars to save React DOM rendering
            onUIUpdate({ hunger: s.current.hunger, social: s.current.social });
        }

        if (s.current.hunger <= 0 || s.current.social <= 0) {
            triggerGameOver("Biriktirdin ama yaşamayı unuttun! Yaşam dengesi tükendi.");
        }
    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(runRefs.current.animationId);
        };
    }, []);

    return {
        initGame,
        placeBlock,
        gameStateRef: s // Export immutable ref pointing to mutable state
    };
}
