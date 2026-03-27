import { MemoryMatchGame } from '../../../components/games/memory-match/MemoryMatchGame';

export const metadata = {
  title: 'Memory Match',
  description: 'A beautifully designed, stylized memory match game.',
};

export default function MemoryMatchPage() {
  return (
    <main className="w-full min-h-screen bg-amber-950 font-sans text-amber-50 selection:bg-amber-500 selection:text-amber-950">
      <MemoryMatchGame />
    </main>
  );
}
