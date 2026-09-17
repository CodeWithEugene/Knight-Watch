import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return buildPageMetadata({ locale: params.locale, routeKey: 'terms' });
}

export default function TermsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'terms' })} />
      <JsonLd data={breadcrumbJsonLd(params.locale, [{ name: 'Home', path: '' },{ name: 'Terms', path: 'terms' }])} />
      {children}
    </>
  );
}
