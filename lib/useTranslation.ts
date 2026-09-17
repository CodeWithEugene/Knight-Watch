'use client';

import { usePathname } from 'next/navigation';
import { getMessage } from './i18n';
import { KENYAN_LOCALES, LocaleCode } from './locales';

export function useTranslation(overrideLocale?: string) {
  const pathname = usePathname();
  const firstSegment = pathname?.split('/')[1]?.toLowerCase() || '';
  const isKnown = KENYAN_LOCALES.some((l) => l.code === firstSegment);
  const locale = overrideLocale || (isKnown ? firstSegment : 'en');

  const t = (key: string, fallback?: string): string => {
    return getMessage(locale, key, fallback);
  };

  const currentLocaleObj =
    KENYAN_LOCALES.find((l) => l.code === locale) ||
    KENYAN_LOCALES.find((l) => l.code === 'en')!;

  return {
    t,
    locale,
    currentLocaleObj,
    locales: KENYAN_LOCALES,
  };
}
