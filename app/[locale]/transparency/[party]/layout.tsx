import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd, prettyNameFromSlug } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; party: string };
}): Promise<Metadata> {
  const name = prettyNameFromSlug(decodeURIComponent(params.party)).toUpperCase();
  return buildPageMetadata({
    locale: params.locale,
    routeKey: 'transparency-party',
    dynamicTitle: `${name} Transparency Scorecard & Audit Record | Knight Watch Kenya`,
    dynamicDescription: `Full transparency scorecard for ${name}: audited accounts disclosure, PPF compliance, donation openness and citizen-report resolution in Kenya.`,
    pathOverride: `transparency/${params.party}`,
  });
}

export default function TransparencyPartyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; party: string };
}) {
  const name = prettyNameFromSlug(decodeURIComponent(params.party)).toUpperCase();
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          locale: params.locale,
          routeKey: 'transparency-party',
          title: `${name} Transparency Scorecard & Audit Record | Knight Watch Kenya`,
          pathOverride: `transparency/${params.party}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(params.locale, [
          { name: 'Home', path: '' },
          { name: 'Transparency', path: 'transparency' },
          { name, path: `transparency/${params.party}` },
        ])}
      />
      {children}
    </>
  );
}
