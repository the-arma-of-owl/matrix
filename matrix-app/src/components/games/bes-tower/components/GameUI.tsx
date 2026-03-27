'use client';

import React from 'react';
import { GAME_STATES, BLOCK_TYPES } from '../utils/config';

interface GameUIProps {
    gameState: GAME_STATES;
    score: number;
    hunger: number;
    social: number;
    nextBlockType?: string;
    gameOverReason?: string;
    onStart: () => void;
    onRestart: () => void;
}

export function GameUI({ 
    gameState, score, hunger, social, 
    nextBlockType, gameOverReason, onStart, onRestart 
}: GameUIProps) {
    const getTypeName = (type?: string) => {
        switch(type) {
            case BLOCK_TYPES.INVESTMENT: return 'Yatırım Datası';
            case BLOCK_TYPES.FOOD: return 'Sistem Takviyesi';
            case BLOCK_TYPES.SOCIAL: return 'Ağ Güncellemesi';
            case BLOCK_TYPES.DEVLET: return 'Devlet Protokolü';
            default: return 'Veri Bloğu';
        }
    };

    const isDangerHunger = hunger < 20;
    const isDangerSocial = social < 20;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between font-mono">
            
            {/* Top HUD - Matrix Overlay */}
            <div className="flex justify-between p-4 bg-gradient-to-b from-black/90 to-transparent border-b border-green-500/20 shadow-[0_4px_30px_rgba(34,197,94,0.1)]">
                <div className="flex flex-col gap-3 w-2/5 max-w-[200px]">
                    {/* Energy/Hunger Bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl drop-shadow-[0_0_8px_rgba(255,200,50,0.5)]">🍔</span>
                        <div className={`flex-grow h-2 bg-black/80 rounded border overflow-hidden transition-colors ${isDangerHunger ? 'border-red-500 shadow-[0_0_10px_red]' : 'border-orange-500/40'}`}>
                            <div 
                                className="h-full transition-all duration-100 shadow-[0_0_8px_#ea580c] bg-gradient-to-r from-orange-600 to-orange-500"
                                style={{ width: `${Math.max(0, hunger)}%` }}
                            />
                        </div>
                    </div>
                    {/* Signal/Social Bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl drop-shadow-[0_0_8px_rgba(255,200,50,0.5)]">👥</span>
                        <div className={`flex-grow h-2 bg-black/80 rounded border overflow-hidden transition-colors ${isDangerSocial ? 'border-red-500 shadow-[0_0_10px_red]' : 'border-purple-500/40'}`}>
                            <div 
                                className="h-full transition-all duration-100 shadow-[0_0_8px_#9333ea] bg-gradient-to-r from-purple-600 to-purple-500"
                                style={{ width: `${Math.max(0, social)}%` }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="text-[10px] font-bold text-green-600 tracking-widest uppercase">FON HACMİ</div>
                    <div className="text-3xl sm:text-4xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] leading-none mt-1">
                        {score} <span className="text-sm text-green-800">TB</span>
                    </div>
                </div>
            </div>

            {/* Bottom HUD - Removed */}

            {/* Main Menu overlay */}
            {gameState === GAME_STATES.MENU && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-8 pointer-events-auto">
                    <h1 className="text-5xl sm:text-6xl font-black mb-2 text-green-500 text-center tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                        BES TOWER
                    </h1>
                    <h2 className="text-lg text-green-700 mb-8 font-bold tracking-[0.3em] uppercase">Sistem Bağlantısı</h2>
                    
                    <div className="flex flex-col gap-4 mb-10 bg-black/60 p-6 rounded-lg border border-green-500/30 max-w-sm w-full shadow-[inset_0_0_30px_rgba(34,197,94,0.1)]">
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-green-500/20 border border-green-400 shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                            <p className="text-xs text-green-600 tracking-wide"><strong className="text-green-400">Yatırım Datası:</strong> Seçimini artırır, kuleyi yükseltir.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-green-600/40 border border-green-500 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <p className="text-xs text-green-600 tracking-wide"><strong className="text-green-400">Sistem Takviyesi:</strong> Bataryayı doldurur, dengeyi daraltır.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-green-700/60 border border-green-600 shrink-0 shadow-[0_0_8px_rgba(22,163,74,0.5)]" />
                            <p className="text-xs text-green-600 tracking-wide"><strong className="text-green-400">Ağ Güncellemesi:</strong> Sinyali güçlendirir ama frekansı sarsar.</p>
                        </div>
                    </div>

                    <button 
                        onClick={onStart}
                        className="bg-black border-2 border-green-500 text-green-400 px-10 py-4 rounded font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] transition-all active:scale-95"
                    >
                        Sisteme Giriş Yap
                    </button>
                </div>
            )}

            {/* Game Over overlay */}
            {gameState === GAME_STATES.GAMEOVER && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-8 pointer-events-auto border-[4px] border-red-900/50">
                    <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center text-red-500 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-[pulse_1s_infinite]">
                        BAĞLANTI KOPTU
                    </h1>
                    
                    <p className="text-center font-bold text-xs uppercase tracking-widest leading-relaxed mb-8 p-4 rounded border bg-black border-green-500/30 text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] max-w-sm">
                        <span className="text-red-400 block mb-2">[ HATA ]</span>
                        {gameOverReason}
                    </p>

                    <div className="text-center mb-10">
                        <span className="text-[10px] text-green-700 uppercase tracking-widest font-bold">Kurtarılan Veri</span >
                        <h2 className="text-5xl text-green-400 font-black mt-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">{score} <span className="text-lg">TB</span></h2>
                    </div>

                    <button 
                        onClick={onRestart}
                        className="bg-black border-2 border-green-500 text-green-400 px-10 py-4 rounded font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] transition-all active:scale-95"
                    >
                        Yeniden Bağlan
                    </button>
                </div>
            )}
        </div>
    );
}
