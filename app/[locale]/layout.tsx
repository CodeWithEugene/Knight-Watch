import type { Metadata } from 'next';
import { EmbedAwareLayout } from '@/components/layout/EmbedAwareLayout';
import { LocaleLang } from '@/components/seo/LocaleLang';
import { JsonLd } from '@/components/seo/JsonLd';
import { LOCALE_CODES } from '@/lib/locales';
import { SITE_URL, buildPageMetadata, webpageJsonLd, breadcrumbJsonLd } from '@/lib/seo';

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
  return (
    <EmbedAwareLayout>
      <LocaleLang locale={params.locale} />
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'home' })} />
      <JsonLd data={breadcrumbJsonLd(params.locale, [{ name: 'Home', path: '' }])} />
      {children}
    </EmbedAwareLayout>
  );
}
