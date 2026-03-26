export const LOGICAL_WIDTH = 500;
export const LOGICAL_HEIGHT = 900;

export enum GAME_STATES {
    MENU = 0,
    PLAYING = 1,
    GAMEOVER = 2
}

export enum BLOCK_TYPES {
    INVESTMENT = 'investment',
    FOOD = 'food',
    SOCIAL = 'social',
    DEVLET = 'devlet' // State contribution
}

export const BLOCK_COLORS = {
    [BLOCK_TYPES.INVESTMENT]: { main: '#3b82f6', border: '#2563eb' },
    [BLOCK_TYPES.FOOD]: { main: '#f97316', border: '#ea580c' },
    [BLOCK_TYPES.SOCIAL]: { main: '#a855f7', border: '#9333ea' },
    [BLOCK_TYPES.DEVLET]: { main: '#eab308', border: '#ca8a04' },
    base: { main: '#94a3b8', border: '#64748b' }
};

export const BASE_BLOCK_WIDTH = 160;
export const BLOCK_HEIGHT = 40;
export const DECAY_BASE_RATE = 4; // % per second

export interface BlockEntity {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    color: { main: string; border: string };
    direction?: number;
    speed?: number;
    mass: number;
}
