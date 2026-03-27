'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Landmark, Gamepad2, User, Trophy, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',            icon: Home,     label: 'Giriş'   },
  { href: '/dashboard',   icon: BookOpen, label: 'Eğitim'  },
  { href: '/games/bes-tower', icon: Landmark, label: 'BES' },
  { href: '/dashboard',   icon: Gamepad2, label: 'Oyunlar' },
  { href: '/leaderboard', icon: Trophy,   label: 'Sıralama'},
  { href: '/login',       icon: User,     label: 'Profil'  },
];

export function NavigationBar() {
  const pathname = usePathname();

  // Landing ve login'de gösterme
  if (pathname === '/' || pathname === '/login') return null;

  return (
    <nav
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
      style={{ width: 72 }}
    >
      <div className="flex flex-col h-full bg-[#080f08]/95 backdrop-blur-xl border-r border-[#00FF41]/20 shadow-[4px_0_30px_rgba(0,255,65,0.08)]">

        {/* Logo */}
        <div className="flex items-center justify-center py-4 border-b border-[#00FF41]/15">
          <div className="w-9 h-9 flex items-center justify-center bg-[#00FF41]/10 border border-[#00FF41]/40 rounded">
            <Sparkles className="w-5 h-5 text-[#00FF41]" />
          </div>
        </div>

        {/* Nav items */}
        <div className="flex flex-col items-center gap-1 py-3 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="relative w-full flex flex-col items-center gap-1 py-3 px-1 transition-all group"
              >
                {/* Aktif sol kenar çizgisi */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#00FF41] rounded-r-full shadow-[0_0_8px_rgba(0,255,65,0.7)]" />
                )}

                <div className={`p-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#00FF41]/15 text-[#00FF41]'
                    : 'text-gray-500 group-hover:text-[#00FF41]/70 group-hover:bg-[#00FF41]/5'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <span className={`text-[9px] font-mono font-medium leading-none transition-colors ${
                  isActive ? 'text-[#00FF41]' : 'text-gray-600 group-hover:text-gray-400'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Alt XP strip */}
        <div className="border-t border-[#00FF41]/15 py-3 flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-0.5">
            <Sparkles className="w-3 h-3 text-[#00FF41]/60" />
            <span className="text-[#00FF41] text-[10px] font-mono font-bold">XP</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px]">🏆</span>
            <span className="text-[#00FF41] text-[10px] font-mono font-bold">—</span>
          </div>
        </div>

      </div>
    </nav>
  );
}
