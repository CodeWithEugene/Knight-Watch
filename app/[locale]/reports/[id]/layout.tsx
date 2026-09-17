import type { Metadata } from 'next';
import { buildPageMetadata, breadcrumbJsonLd, webpageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    routeKey: 'report-detail',
    dynamicTitle: `Incident Report ${decodeURIComponent(params.id)} — Evidence Dossier | Knight Watch Kenya`,
    dynamicDescription:
      'Verified evidence dossier for this Kenya campaign finance incident: category, location, evidence summary and independent verification status.',
  });
}

export default function ReportDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; id: string };
}) {
  return (
    <>
      <JsonLd data={webpageJsonLd({ locale: params.locale, routeKey: 'report-detail' })} />
      <JsonLd
        data={breadcrumbJsonLd(params.locale, [
          { name: 'Home', path: '' },
          { name: 'Reports', path: 'reports' },
          { name: 'Dossier', path: 'reports' },
        ])}
      />
      {children}
    </>
  );
}
