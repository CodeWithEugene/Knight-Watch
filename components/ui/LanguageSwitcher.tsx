'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { KENYAN_LOCALES } from '@/lib/locales';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2,3}/, '') || '/';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocaleObj = KENYAN_LOCALES.find((l) => l.code === currentLocale);
  const currentName = currentLocaleObj?.name ?? 'English';
  const shortName = currentLocaleObj?.name.split(' ')[0] ?? 'English';

  const handleLocaleSelect = (locCode: string) => {
    const googleCode = locCode === 'sw' ? 'sw' : locCode === 'so' ? 'so' : locCode === 'gax' ? 'om' : null;
    try {
      if (googleCode) {
        document.cookie = `googtrans=/en/${googleCode}; path=/;`;
        document.cookie = `googtrans=/en/${googleCode}; domain=${window.location.hostname}; path=/;`;
      } else {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      }
    } catch {}
    setOpen(false);
  };

  return (
    <div className={`relative inline-block text-left shrink-0 ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-accent border border-input bg-background transition-all duration-200 hover:scale-105 active:scale-95 hover:border-foreground/30 shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language selector. Current: ${currentName}`}
      >
        <Globe className="size-3 text-muted-foreground" />
        <span className="font-semibold">{shortName}</span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 w-56 max-h-80 overflow-y-auto rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-2xl z-50 focus:outline-none"
        >
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
            22 Kenyan Languages
          </div>
          {KENYAN_LOCALES.map((loc) => {
            const isSelected = currentLocale === loc.code;
            return (
              <Link
                key={loc.code}
                href={`/${loc.code}${pathWithoutLocale}`}
                onClick={() => handleLocaleSelect(loc.code)}
                role="option"
                aria-selected={isSelected}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isSelected ? 'bg-accent font-semibold text-accent-foreground' : 'text-foreground'
                }`}
              >
                <span>{loc.name}</span>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  {loc.code}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
