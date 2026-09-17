'use client';

import { useCallback, useMemo } from 'react';
import { getMessage } from './i18n';
import { KENYAN_LOCALES, isLocaleCode } from './locales';
import { useLocale } from '@/components/i18n/LocaleProvider';

export function useTranslation(overrideLocale?: string) {
  const activeLocale = useLocale();
  const locale = overrideLocale && isLocaleCode(overrideLocale) ? overrideLocale.toLowerCase() : activeLocale;

  const t = useCallback(
    (key: string, fallback?: string): string => getMessage(locale, key, fallback),
    [locale],
  );

  const currentLocaleObj = useMemo(
    () => KENYAN_LOCALES.find((l) => l.code === locale) ?? KENYAN_LOCALES.find((l) => l.code === 'en')!,
    [locale],
  );

  return {
    t,
    locale,
    currentLocaleObj,
    locales: KENYAN_LOCALES,
  };
}
