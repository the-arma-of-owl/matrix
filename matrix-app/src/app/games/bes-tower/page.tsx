'use client';

import React from 'react';
import { BESTowerGame } from '@/components/games/bes-tower/BESTowerGame';

export default function BESTowerPage() {
    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
            <BESTowerGame />
        </main>
    );
}
