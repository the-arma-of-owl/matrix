'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useAudioEngine() {
    const ctxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const bgmGainRef = useRef<GainNode | null>(null);
    const bgmOscsRef = useRef<OscillatorNode[]>([]);
    const isPlayingBGMRef = useRef(false);

    const init = useCallback(() => {
        if (ctxRef.current) return;
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        ctxRef.current = new AudioContextClass();

        masterGainRef.current = ctxRef.current.createGain();
        masterGainRef.current.gain.value = 0.3;
        masterGainRef.current.connect(ctxRef.current.destination);

        bgmGainRef.current = ctxRef.current.createGain();
        bgmGainRef.current.gain.value = 0.1;
        bgmGainRef.current.connect(masterGainRef.current);
    }, []);

    const startBGM = useCallback(() => {
        init();
        if (isPlayingBGMRef.current || !ctxRef.current || !bgmGainRef.current) return;

        const osc1 = ctxRef.current.createOscillator();
        const osc2 = ctxRef.current.createOscillator();
        const lfo = ctxRef.current.createOscillator();
        const lfoGain = ctxRef.current.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        lfo.type = 'sine';

        osc1.frequency.value = 220; // A3
        osc2.frequency.value = 110; // A2
        lfo.frequency.value = 0.1;
        lfoGain.gain.value = 10;

        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);

        osc1.connect(bgmGainRef.current);
        osc2.connect(bgmGainRef.current);

        osc1.start();
        osc2.start();
        lfo.start();

        bgmOscsRef.current = [osc1, osc2, lfo];
        isPlayingBGMRef.current = true;
    }, [init]);

    const stopBGM = useCallback(() => {
        if (!isPlayingBGMRef.current) return;
        bgmOscsRef.current.forEach(osc => {
            try { osc.stop(); } catch (e) {}
        });
        bgmOscsRef.current = [];
        isPlayingBGMRef.current = false;
    }, []);

    const playNote = useCallback((type: OscillatorType, freq: number, timeOffset: number, duration: number) => {
        if (!ctxRef.current || !masterGainRef.current) return;
        const osc = ctxRef.current.createOscillator();
        const gain = ctxRef.current.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        const startTime = ctxRef.current.currentTime + timeOffset;

        gain.gain.setValueAtTime(0.5, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
    }, []);

    const playClick = useCallback(() => {
        if (!ctxRef.current || !masterGainRef.current) return;
        const osc = ctxRef.current.createOscillator();
        const gain = ctxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctxRef.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctxRef.current.currentTime + 0.1);

        gain.gain.setValueAtTime(1, ctxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctxRef.current.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start();
        osc.stop(ctxRef.current.currentTime + 0.15);
    }, []);

    const playCashRegister = useCallback(() => {
        playNote('square', 1200, 0, 0.1);
        playNote('square', 1600, 0.05, 0.2);
    }, [playNote]);

    const playStateContribution = useCallback(() => {
        playNote('sine', 440, 0, 0.1);
        playNote('sine', 554, 0.05, 0.1);
        playNote('sine', 659, 0.1, 0.2);
    }, [playNote]);

    const playGameOver = useCallback(() => {
        playNote('triangle', 300, 0, 0.4);
        playNote('triangle', 250, 0.3, 0.4);
        playNote('triangle', 200, 0.6, 0.8);
    }, [playNote]);

    const playDevrilme = useCallback(() => {
        if (!ctxRef.current || !masterGainRef.current) return;
        const bufferSize = ctxRef.current.sampleRate * 1.5;
        const buffer = ctxRef.current.createBuffer(1, bufferSize, ctxRef.current.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctxRef.current.createBufferSource();
        noise.buffer = buffer;

        const filter = ctxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, ctxRef.current.currentTime);
        filter.frequency.exponentialRampToValueAtTime(50, ctxRef.current.currentTime + 1);

        const gain = ctxRef.current.createGain();
        gain.gain.setValueAtTime(1, ctxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctxRef.current.currentTime + 1.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);

        noise.start();
    }, []);

    // Cleanup
    useEffect(() => {
        return () => {
            stopBGM();
            if (ctxRef.current) {
                ctxRef.current.close().catch(() => {});
            }
        };
    }, [stopBGM]);

    return {
        init,
        startBGM,
        stopBGM,
        playClick,
        playCashRegister,
        playStateContribution,
        playDevrilme,
        playGameOver
    };
}
