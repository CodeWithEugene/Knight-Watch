import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return buildPageMetadata({ locale: params.locale, routeKey: 'search' });
}

export default function SearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'search' })} />
      <JsonLd data={breadcrumbJsonLd(params.locale, [{ name: 'Home', path: '' },{ name: 'Search', path: 'search' }])} />
      {children}
    </>
  );
}
