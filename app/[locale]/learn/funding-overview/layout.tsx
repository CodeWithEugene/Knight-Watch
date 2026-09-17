import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd, articleJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return buildPageMetadata({ locale: params.locale, routeKey: 'learn-funding-overview' });
}

export default function LearnFunding_overviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'learn-funding-overview' })} />
      <JsonLd data={breadcrumbJsonLd(params.locale, [{ name: 'Home', path: '' },{ name: 'Learn', path: 'learn' },{ name: 'Funding overview', path: 'learn/funding-overview' }])} />
      <JsonLd data={articleJsonLd({ locale: params.locale, routeKey: 'learn-funding-overview' })} />
      {children}
    </>
  );
}
