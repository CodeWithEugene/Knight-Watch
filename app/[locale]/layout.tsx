import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EmbedAwareLayout } from '@/components/layout/EmbedAwareLayout';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { LocaleLang } from '@/components/seo/LocaleLang';
import { JsonLd } from '@/components/seo/JsonLd';
import { LOCALE_CODES, isLocaleCode } from '@/lib/locales';
import { buildPageMetadata, webpageJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const base = buildPageMetadata({ locale: params.locale, routeKey: 'home' });
  return {
    ...base,
    openGraph: { ...base.openGraph, locale: params.locale === 'sw' ? 'sw_KE' : 'en_KE' },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocaleCode(params.locale)) notFound();
  const locale = params.locale.toLowerCase() as typeof LOCALE_CODES[number];

  return (
    <LocaleProvider locale={locale}>
      <EmbedAwareLayout>
        <LocaleLang locale={locale} />
        <JsonLd data={webpageJsonLd({ locale, routeKey: 'home' })} />
        <JsonLd data={breadcrumbJsonLd(locale, [{ name: 'Home', path: '' }])} />
        {children}
      </EmbedAwareLayout>
    </LocaleProvider>
  );
}
