'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useTransition } from 'react';
import { ChevronDown, Globe, Loader2 } from 'lucide-react';
import {
  KENYAN_LOCALES,
  GOOGLE_TRANSLATE_LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  stripLocaleFromPathname,
  localizePathname,
  type LocaleCode,
} from '@/lib/locales';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { useTranslation } from '@/lib/useTranslation';

function setCookie(name: string, value: string, maxAge: number) {
  try {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {}
}

function clearCookie(name: string) {
  try {
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = `${name}=; ${expired}`;
    document.cookie = `${name}=; domain=${window.location.hostname}; ${expired}`;
  } catch {}
}

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [reloading, setReloading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pathWithoutLocale = stripLocaleFromPathname(pathname);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const currentLocaleObj = KENYAN_LOCALES.find((l) => l.code === currentLocale);
  const currentName = currentLocaleObj?.name ?? 'English';
  const shortName = currentLocaleObj?.name.split(' ')[0] ?? 'English';
  const busy = isPending || reloading;

  const switchLocale = (target: LocaleCode) => {
    setOpen(false);
    if (target === currentLocale) return;

    // Remember the choice so "/" and unprefixed links resolve to this language.
    setCookie(LOCALE_COOKIE, target, LOCALE_COOKIE_MAX_AGE);

    const search = typeof window !== 'undefined' ? window.location.search : '';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const href = `${localizePathname(target, pathWithoutLocale)}${search}${hash}`;

    const fromGoogle = GOOGLE_TRANSLATE_LOCALES[currentLocale];
    const toGoogle = GOOGLE_TRANSLATE_LOCALES[target];

    if (fromGoogle || toGoogle) {
      // Google Translate only applies (and only fully un-applies) on a fresh
      // document load, so a full navigation is the one deterministic path.
      if (toGoogle) {
        setCookie('googtrans', `/en/${toGoogle}`, LOCALE_COOKIE_MAX_AGE);
      } else {
        clearCookie('googtrans');
      }
      setReloading(true);
      window.location.assign(href);
      return;
    }

    clearCookie('googtrans');
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  return (
    <div
      className={`relative inline-block text-left shrink-0 ${className}`}
      ref={ref}
      data-no-translate
      translate="no"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={busy}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-accent border border-input bg-background transition-all duration-200 hover:scale-105 active:scale-95 hover:border-foreground/30 shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:cursor-wait disabled:opacity-70"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-busy={busy}
        aria-label={`${t('nav.selectLang', 'Select Language')}. ${currentName}`}
      >
        {busy ? (
          <Loader2 className="size-3 text-muted-foreground animate-spin" />
        ) : (
          <Globe className="size-3 text-muted-foreground" />
        )}
        <span className="font-semibold">{shortName}</span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('nav.selectLang', 'Select Language')}
          className="absolute right-0 top-full mt-1.5 w-56 max-h-80 overflow-y-auto rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-2xl z-50 focus:outline-none"
        >
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
            {KENYAN_LOCALES.length} Kenyan Languages
          </div>
          {KENYAN_LOCALES.map((loc) => {
            const isSelected = currentLocale === loc.code;
            return (
              <Link
                key={loc.code}
                href={localizePathname(loc.code, pathWithoutLocale)}
                onClick={(e) => {
                  e.preventDefault();
                  switchLocale(loc.code);
                }}
                role="option"
                aria-selected={isSelected}
                lang={loc.code}
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
