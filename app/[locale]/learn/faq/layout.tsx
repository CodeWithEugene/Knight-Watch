import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd, faqJsonLd, articleJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return buildPageMetadata({ locale: params.locale, routeKey: 'learn-faq' });
}

export default function LearnFaqLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'learn-faq' })} />
      <JsonLd data={breadcrumbJsonLd(params.locale, [{ name: 'Home', path: '' },{ name: 'Learn', path: 'learn' },{ name: 'FAQ', path: 'learn/faq' }])} />
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={articleJsonLd({ locale: params.locale, routeKey: 'learn-faq' })} />
      {children}
    </>
  );
}
