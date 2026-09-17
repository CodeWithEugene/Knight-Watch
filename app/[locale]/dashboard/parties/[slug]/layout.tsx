import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd, prettyNameFromSlug } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const name = prettyNameFromSlug(decodeURIComponent(params.slug)).toUpperCase();
  return buildPageMetadata({
    locale: params.locale,
    routeKey: 'party-detail',
    dynamicTitle: `${name} Funding, PPF & Compliance Dossier | Knight Watch Kenya`,
    dynamicDescription: `${name} party dossier: ORPP registration, statutory PPF allocation, audited accounts and verified campaign finance violations in Kenya.`,
    pathOverride: `dashboard/parties/${params.slug}`,
  });
}

export default function PartyDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; slug: string };
}) {
  const name = prettyNameFromSlug(decodeURIComponent(params.slug)).toUpperCase();
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          locale: params.locale,
          routeKey: 'party-detail',
          title: `${name} Funding, PPF & Compliance Dossier | Knight Watch Kenya`,
          pathOverride: `dashboard/parties/${params.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(params.locale, [
          { name: 'Home', path: '' },
          { name: 'Dashboard', path: 'dashboard' },
          { name: 'Parties', path: 'dashboard/parties' },
          { name, path: `dashboard/parties/${params.slug}` },
        ])}
      />
      {children}
    </>
  );
}
