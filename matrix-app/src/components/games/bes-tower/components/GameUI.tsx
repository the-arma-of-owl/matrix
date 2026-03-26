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
            case BLOCK_TYPES.INVESTMENT: return 'Yatırım (Mavi)';
            case BLOCK_TYPES.FOOD: return 'Yemek (Turuncu)';
            case BLOCK_TYPES.SOCIAL: return 'Sosyal (Mor)';
            case BLOCK_TYPES.DEVLET: return 'Devlet Katkısı (Sarı)';
            default: return 'Blok';
        }
    };

    const isDangerHunger = hunger < 20;
    const isDangerSocial = social < 20;

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between font-sans">
            {/* Top HUD */}
            <div className="flex justify-between p-4 bg-gradient-to-b from-slate-900/80 to-transparent">
                <div className="flex flex-col gap-2 w-2/5 max-w-[200px]">
                    {/* Hunger Bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl drop-shadow-md">🍖</span>
                        <div className={`flex-grow h-3 bg-black/50 rounded-full border overflow-hidden transition-colors ${isDangerHunger ? 'border-red-500' : 'border-white/10'}`}>
                            <div 
                                className="h-full rounded-full transition-all duration-100 shadow-[0_0_8px_#ea580c] bg-gradient-to-r from-orange-600 to-orange-500"
                                style={{ width: `${Math.max(0, hunger)}%` }}
                            />
                        </div>
                    </div>
                    {/* Social Bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl drop-shadow-md">❤️</span>
                        <div className={`flex-grow h-3 bg-black/50 rounded-full border overflow-hidden transition-colors ${isDangerSocial ? 'border-red-500' : 'border-white/10'}`}>
                            <div 
                                className="h-full rounded-full transition-all duration-100 shadow-[0_0_8px_#9333ea] bg-gradient-to-r from-purple-600 to-purple-500"
                                style={{ width: `${Math.max(0, social)}%` }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="text-xs font-semibold text-slate-400 tracking-wider">BİRİKİM</div>
                    <div className="text-3xl font-extrabold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] leading-none">
                        {score}
                    </div>
                </div>
            </div>

            {/* Bottom HUD */}
            {gameState === GAME_STATES.PLAYING && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full font-semibold uppercase tracking-wider text-sm transition-all text-slate-100 shadow-xl">
                    Sıradaki: <span className="text-white">{getTypeName(nextBlockType)}</span>
                </div>
            )}

            {/* Main Menu overlay */}
            {gameState === GAME_STATES.MENU && (
                <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md flex flex-col justify-center items-center p-8 pointer-events-auto">
                    <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent text-center drop-shadow-[0_4px_10px_rgba(56,189,248,0.3)]">
                        BES TOWER
                    </h1>
                    <h2 className="text-xl text-slate-400 mb-8 font-normal">Yaşam Dengesi</h2>
                    
                    <div className="flex flex-col gap-4 mb-10 bg-white/5 p-6 rounded-xl border border-white/10 max-w-sm w-full">
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded bg-blue-500 shrink-0" />
                            <p className="text-sm text-slate-300"><strong className="text-white">Yatırım:</strong> Seçimini artırır, kuleyi yükseltir.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded bg-orange-500 shrink-0" />
                            <p className="text-sm text-slate-300"><strong className="text-white">Yemek:</strong> Açlığını giderir ama sıradaki bloğu daraltır.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded bg-purple-500 shrink-0" />
                            <p className="text-sm text-slate-300"><strong className="text-white">Sosyal:</strong> Motivasyonu sağlar ama kuleyi sarsar.</p>
                        </div>
                    </div>

                    <button 
                        onClick={onStart}
                        className="bg-gradient-to-br from-blue-500/40 to-blue-500/10 border border-blue-500/50 text-white px-10 py-4 rounded-full font-extrabold text-lg uppercase tracking-widest shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all animate-[btn-pulse_2s_infinite]"
                    >
                        OYUNA BAŞLA
                    </button>
                </div>
            )}

            {/* Game Over overlay */}
            {gameState === GAME_STATES.GAMEOVER && (
                <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md flex flex-col justify-center items-center p-8 pointer-events-auto">
                    <h1 className="text-5xl font-extrabold mb-6 text-center text-white">OYUN BİTTİ</h1>
                    
                    <p className={`text-center leading-relaxed mb-8 p-4 rounded-lg border max-w-sm ${gameOverReason?.includes('fena birikim') ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' : 'text-red-300 bg-red-500/10 border-red-500/30'}`}>
                        {gameOverReason}
                    </p>

                    <div className="text-center mb-8">
                        <span className="text-sm text-slate-400 uppercase tracking-widest">Toplam Birikim</span>
                        <h2 className="text-6xl text-emerald-400 font-bold mt-2">{score}</h2>
                    </div>

                    <button 
                        onClick={onRestart}
                        className="bg-gradient-to-br from-blue-500/40 to-blue-500/10 border border-blue-500/50 text-white px-10 py-4 rounded-full font-extrabold text-lg uppercase tracking-widest shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all"
                    >
                        TEKRAR DENE
                    </button>
                </div>
            )}
        </div>
    );
}
