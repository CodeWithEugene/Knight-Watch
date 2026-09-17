'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Input } from '@/components/ui/input';
import { MobileNav } from './MobileNav';

function getLocalizedHref(href: string, pathname: string | null): string {
  const locale = pathname?.split('/')[1] || 'en';
  return `/${locale}${href}`;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const locale = pathname?.split('/')[1] || 'en';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

  const navLinks = [
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
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-background transition-colors"
        role="banner"
      >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo with icon and subtitle */}
          <div className="shrink-0">
            <BrandLogo locale={locale} />
          </div>

          {/* Desktop Navigation in requested sequence */}
          <nav
            className="hidden xl:flex items-center gap-1 2xl:gap-1.5 text-xs font-medium shrink-0"
            aria-label="Main navigation"
          >
            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${
                pathname === `/${locale}` || pathname === `/${locale}/`
                  ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                  : 'text-foreground/80 hover:text-foreground hover:bg-accent'
              }`}
            >
              Home
            </Link>

            {/* 1. Search reports... */}
            <form onSubmit={handleSearch} className="relative flex items-center shrink-0">
              <Search className="absolute left-2.5 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="h-8 w-32 2xl:w-40 pl-8 pr-2 text-xs bg-muted/40 border-input placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring rounded-full"
              />
            </form>

            {/* 2 - 10: Learn, Intelligence, Report, Mchango, Map, Dashboard, Reports, Transparency, Calculator */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocalizedHref(link.href, pathname)}
                className={`px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${
                  isLinkActive(link.href)
                    ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 11. Sign In / Sign Out */}
            <button
              type="button"
              onClick={() => {
                if (status === 'authenticated') {
                  signOut({ callbackUrl: `/${locale}` });
                } else {
                  router.push(`/${locale}/login`);
                }
              }}
              className={`px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer ${
                status !== 'authenticated' && (pathname === `/${locale}/login` || pathname?.startsWith(`/${locale}/login`))
                  ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                  : 'text-foreground/80 hover:text-foreground hover:bg-accent'
              }`}
            >
              {status === 'authenticated' ? 'Sign Out' : 'Sign In'}
            </button>

            {/* 12. Lang */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Trigger (active below xl breakpoint to protect alignment) */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="size-8 rounded-full border border-border bg-card hover:bg-accent text-foreground transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        pathname={pathname}
      />
    </header>
    {/* Spacer so page content flows smoothly below fixed header */}
    <div className="h-16 shrink-0 w-full pointer-events-none" aria-hidden="true" />
  </>
  );
}
