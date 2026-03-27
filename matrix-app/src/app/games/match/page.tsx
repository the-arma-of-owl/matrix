import { MatchGame } from '../../../components/games/match/MatchGame';

export const metadata = {
  title: 'Terminal Eşleştirme Sistemi',
  description: 'Finansal kavramları açıklamalarıyla eşleştirin.',
};

export default function MatchPage() {
  return (
    <main className="w-full min-h-screen bg-black font-mono text-green-500 selection:bg-green-500 selection:text-black">
      <MatchGame />
    </main>
  );
}
