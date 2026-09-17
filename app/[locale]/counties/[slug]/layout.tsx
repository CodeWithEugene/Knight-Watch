import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd, prettyNameFromSlug } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const name = prettyNameFromSlug(decodeURIComponent(params.slug));
  return buildPageMetadata({
    locale: params.locale,
    routeKey: 'county-detail',
    dynamicTitle: `${name} County Campaign Finance Dossier | Knight Watch Kenya`,
    dynamicDescription: `Verified campaign finance incidents, spending patterns and transparency data for ${name} County, Kenya — vote buying, donations and state-resource abuse reports.`,
    pathOverride: `counties/${params.slug}`,
  });
}

export default function CountyDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; slug: string };
}) {
  const name = prettyNameFromSlug(decodeURIComponent(params.slug));
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          locale: params.locale,
          routeKey: 'county-detail',
          title: `${name} County Campaign Finance Dossier | Knight Watch Kenya`,
          pathOverride: `counties/${params.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(params.locale, [
          { name: 'Home', path: '' },
          { name: 'Counties', path: 'counties' },
          { name, path: `counties/${params.slug}` },
        ])}
      />
      {children}
    </>
  );
}
