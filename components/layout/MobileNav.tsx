'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
  pathname?: string | null;
}

export function MobileNav({ isOpen, onClose, locale = 'en', pathname }: MobileNavProps) {
  const router = useRouter();
  const { status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const getLocHref = (path: string) => `/${locale}${path}`;

  const isLinkActive = (href: string) => {
    const normCurrent = pathname?.replace(/^\/[a-z]{2,3}/, '') || '/';
    if (href === '/report') {
      return normCurrent === '/report';
    }
    if (href === '/reports') {
      return normCurrent === '/reports' || normCurrent.startsWith('/reports/');
    }
    return normCurrent === href || normCurrent.startsWith(href + '/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const navLinks = [
    { href: '', label: 'Home' },
    { href: '/learn', label: 'Learn' },
    { href: '/intelligence', label: 'Intelligence' },
    { href: '/report', label: 'Report' },
    { href: '/mchango', label: 'Mchango' },
    { href: '/map', label: 'Map' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/reports', label: 'Reports' },
    { href: '/transparency', label: 'Transparency' },
    { href: '/calculator', label: 'Calculator' },
  ];

  return (
    <div
      className="xl:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-md border-b border-border overflow-y-auto px-4 py-6"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div className="max-w-md mx-auto flex flex-col gap-4">
        {/* 1. Search reports... */}
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
          <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports..."
            className="h-10 w-full pl-9 pr-3 text-sm bg-muted/40 border-input placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring rounded-full"
          />
        </form>

        {/* 2 - 10: Navigation links */}
        <div className="flex flex-col gap-1 border-t border-b border-border py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getLocHref(link.href)}
              onClick={onClose}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                isLinkActive(link.href)
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : 'text-foreground/80 hover:bg-accent hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 11. Sign In / Sign Out */}
        <button
          type="button"
          onClick={() => {
            onClose();
            if (status === 'authenticated') {
              signOut({ callbackUrl: `/${locale}` });
            } else {
              router.push(`/${locale}/login`);
            }
          }}
          className={`text-left px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
            status !== 'authenticated' && (pathname === `/${locale}/login` || pathname?.startsWith(`/${locale}/login`))
              ? 'bg-accent text-accent-foreground font-semibold'
              : 'text-foreground/80 hover:bg-accent hover:text-foreground'
          }`}
        >
          {status === 'authenticated' ? 'Sign Out' : 'Sign In'}
        </button>

        {/* 12. Lang */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Language
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
