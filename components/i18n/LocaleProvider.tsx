'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, type LocaleCode } from '@/lib/locales';

const LocaleContext = createContext<LocaleCode | null>(null);

/**
 * Single source of truth for the active locale.
 * Rendered once in app/[locale]/layout.tsx with the route segment, so every
 * client component below it re-renders with the new locale the moment the
 * route changes — no per-component URL parsing, no drift between components.
 */
export function LocaleProvider({ locale, children }: { locale: LocaleCode; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Active locale; falls back to the URL for components rendered outside the provider. */
export function useLocale(): LocaleCode {
  const fromContext = useContext(LocaleContext);
  const pathname = usePathname();
  return fromContext ?? getLocaleFromPathname(pathname);
}
