'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gerçek Login Entegrasyonu buraya gelecek
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md border border-green-900 border-opacity-50 bg-black/80 p-8 shadow-[0_0_40px_rgba(0,255,156,0.15)] relative overflow-hidden">
        {/* Dekoratif Matrix çizgi/glitch */}
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#00FF9C]" />

        <h2 className="text-2xl text-green-500 font-bold mb-8 uppercase tracking-widest">
          {'>'} GİRİŞ BEKLENİYOR_
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-green-700 text-sm">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-green-800 text-green-400 p-3 outline-none focus:border-green-500 transition-colors"
              placeholder="neo"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-green-700 text-sm">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-green-800 text-green-400 p-3 outline-none focus:border-green-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-900/40 text-green-400 border border-green-600 hover:bg-green-500 hover:text-black transition-all font-bold tracking-widest mt-4"
          >
            ENTER THE MATRIX
          </button>
        </form>
      </div>
    </div>
  );
}
