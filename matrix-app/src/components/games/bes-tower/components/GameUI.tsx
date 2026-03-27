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
                
                <div className="text-right flex flex-col items-end">
                    <div className="text-[10px] font-bold text-green-600 tracking-widest uppercase">FON HACMİ</div>
                    <div className="text-2xl sm:text-3xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] leading-none mt-1">
                        {score} <span className="text-xs text-green-800">Birim</span>
                    </div>
                    
                    <div className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase mt-3 animate-pulse">CANLI SKOR</div>
                    <div className="text-xl sm:text-2xl font-black text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] leading-none mt-1">
                        {score * 500} <span className="text-[10px] text-cyan-800">PTS</span>
                    </div>
                </div>
            </div>

            {/* Bottom HUD - Removed */}

            {/* Main Menu overlay */}
            {gameState === GAME_STATES.MENU && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-8 pointer-events-auto overflow-y-auto">
                    <h1 className="text-5xl sm:text-6xl font-black mb-2 text-green-500 text-center tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                        BES TOWER
                    </h1>
                    <h2 className="text-lg text-green-700 mb-6 font-bold tracking-[0.3em] uppercase">Simülasyona Hoş Geldin</h2>
                    
                    <div className="flex flex-col gap-3 mb-8 bg-black/60 p-5 rounded-lg border border-green-500/30 w-full max-w-md shadow-[inset_0_0_30px_rgba(34,197,94,0.1)]">
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-blue-500 border border-blue-400 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <p className="text-xs text-green-500 tracking-wide leading-relaxed"><strong className="text-blue-400">YATIRIM:</strong> Fon hacmini (+1) büyütür ve kulenizi istikrarlı şekilde yükseltir.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-orange-500 border border-orange-400 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                            <p className="text-xs text-green-500 tracking-wide leading-relaxed"><strong className="text-orange-400">YEMEK:</strong> Beslenme (🍔) barını çok hızlı doldurur. Ancak dikkat! <span className="text-red-400">Sonraki gelen bloğun ebatını daraltır.</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-purple-500 border border-purple-400 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                            <p className="text-xs text-green-500 tracking-wide leading-relaxed"><strong className="text-purple-400">SOSYAL:</strong> Sosyal hayat (👥) barını tam doldurur. Ancak dikkat! <span className="text-red-400">Tüm kuleyi sarsarak dengeyi zorlar.</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-sm bg-yellow-500 border border-yellow-400 shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                            <p className="text-xs text-green-500 tracking-wide leading-relaxed"><strong className="text-yellow-400">%20 DEVLET:</strong> Fon hacmine havadan dev (+2) bonus katar. Sallanmaz, üstelik düşeceği <strong className="text-green-400">alanı daha geniştir!</strong></p>
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

                    <div className="bg-black border flex flex-col items-center border-green-500/30 p-4 rounded mb-10 min-w-[200px] shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]">
                        <div className="text-center w-full mb-2">
                            <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold block mb-1">Yapılan Yatırım</span >
                            <h2 className="text-3xl text-green-500 font-bold">{score} <span className="text-sm">Birim</span></h2>
                        </div>
                        <hr className="w-full border-green-900/50 my-2" />
                        <div className="text-center w-full">
                            <span className="text-xs text-green-400 uppercase tracking-widest font-black block mb-1">Performans Skoru</span >
                            <h2 className="text-4xl text-green-300 font-black drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                                {score * 500} <span className="text-lg">PTS</span>
                            </h2>
                        </div>
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
