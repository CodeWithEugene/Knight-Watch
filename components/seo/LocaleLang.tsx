'use client';

import { useEffect } from 'react';

/** Keeps <html lang> in sync with the locale route segment (no visual change). */
export function LocaleLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
