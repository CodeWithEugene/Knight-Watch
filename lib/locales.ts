/**
 * Kenyan languages supported by the platform.
 * Code is used in the URL path (/code/...). Name is shown in the language dropdown.
 */
export const KENYAN_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'ki', name: 'Gĩkũyũ (Kikuyu)' },
  { code: 'kam', name: 'Kikamba (Kamba)' },
  { code: 'luy', name: 'Oluluhya (Luhya)' },
  { code: 'luo', name: 'Dholuo (Luo)' },
  { code: 'kln', name: 'Kalenjin' },
  { code: 'so', name: 'Soomaali (Somali)' },
  { code: 'mas', name: 'Maa (Maasai)' },
  { code: 'mer', name: 'Kimeru (Meru)' },
  { code: 'tuv', name: 'Ng\'aturkana (Turkana)' },
  { code: 'ebu', name: 'Kiembu (Embu)' },
  { code: 'guz', name: 'Ekegusii (Kisii)' },
  { code: 'dav', name: 'Kitaita (Taita)' },
  { code: 'pko', name: 'Pokoot (Pokot)' },
  { code: 'kuj', name: 'Kikuria (Kuria)' },
  { code: 'sxb', name: 'Olusuba (Suba)' },
  { code: 'gax', name: 'Afaan Borana (Borana)' },
  { code: 'rel', name: 'Rendille' },
  { code: 'saq', name: 'Kisampur (Samburu)' },
  { code: 'nyf', name: 'Mijikenda' },
  { code: 'ssp', name: 'Ilchamus' },
] as const;

export type LocaleCode = (typeof KENYAN_LOCALES)[number]['code'];

export const LOCALE_CODES = KENYAN_LOCALES.map((l) => l.code);

export function getLocaleName(code: string): string {
  return KENYAN_LOCALES.find((l) => l.code === code)?.name ?? code;
}

export const DEFAULT_LOCALE: LocaleCode = 'en';

/** Cookie that remembers the visitor's last chosen language (read by middleware). */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Locales that have no curated dictionary coverage for every string and are
 * therefore also machine-translated by the Google Translate engine.
 * Value is the Google language code.
 */
export const GOOGLE_TRANSLATE_LOCALES: Partial<Record<LocaleCode, string>> = {
  sw: 'sw',
  so: 'so',
  gax: 'om', // Afaan Borana is an Oromo variant; Google exposes it as 'om'
};

export function isLocaleCode(value: string | null | undefined): value is LocaleCode {
  return !!value && (LOCALE_CODES as readonly string[]).includes(value.toLowerCase());
}

/** Extract the locale from a pathname such as "/sw/reports"; falls back to the default. */
export function getLocaleFromPathname(pathname: string | null | undefined): LocaleCode {
  const first = pathname?.split('/').filter(Boolean)[0]?.toLowerCase();
  return isLocaleCode(first) ? (first as LocaleCode) : DEFAULT_LOCALE;
}

/** Remove a leading locale segment: "/sw/reports" -> "/reports", "/sw" -> "/". */
export function stripLocaleFromPathname(pathname: string | null | undefined): string {
  const parts = (pathname ?? '').split('/').filter(Boolean);
  if (parts.length > 0 && isLocaleCode(parts[0])) parts.shift();
  return parts.length ? `/${parts.join('/')}` : '/';
}

/** Build a locale-prefixed path: ("sw", "/reports") -> "/sw/reports". */
export function localizePathname(locale: string, pathnameWithoutLocale: string): string {
  const rest = pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale;
  return `/${locale}${rest}`;
}
