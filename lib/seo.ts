/**
 * Central SEO / AEO dictionary for Knight Watch.
 *
 * Visible site copy is NEVER changed here — this file only drives
 * <head> metadata, canonical / hreflang alternates and invisible
 * JSON-LD structured data consumed by search engines and AI answer engines.
 */

import type { Metadata } from 'next';
import { LOCALE_CODES } from './locales';

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://cfwt.codewitheugene.top').replace(
    /\/$/,
    ''
  );

export const SITE_NAME = 'Knight Watch';
export const SITE_FULL_NAME = 'Knight Watch — Campaign Finance Watch Tool';
export const SITE_ORG = 'Transparency International Kenya';
export const SITE_TAGLINE =
  'Track political campaign money, expose misuse of public resources and safeguard public funds in Kenya.';
export const OG_IMAGE = `${SITE_URL}/icon-512.png`;

export type RouteKey =
  | 'home'
  | 'about'
  | 'accessibility'
  | 'admin'
  | 'admin-login'
  | 'admin-reports'
  | 'admin-report-detail'
  | 'alerts'
  | 'alerts-preferences'
  | 'api-docs'
  | 'calculator'
  | 'contact'
  | 'counties'
  | 'county-detail'
  | 'dashboard'
  | 'parties'
  | 'party-detail'
  | 'data-sources'
  | 'embed-chart'
  | 'embed-map'
  | 'intelligence'
  | 'intelligence-results'
  | 'learn'
  | 'learn-ppf'
  | 'learn-glossary'
  | 'learn-formula'
  | 'learn-download'
  | 'learn-funding-overview'
  | 'learn-faq'
  | 'learn-expenditure-period'
  | 'learn-spending-limits'
  | 'login'
  | 'map'
  | 'mchango'
  | 'mchango-success'
  | 'mchango-transparency'
  | 'press'
  | 'privacy'
  | 'report'
  | 'report-ussd'
  | 'report-sms'
  | 'report-success'
  | 'reports'
  | 'report-detail'
  | 'search'
  | 'signup'
  | 'terms'
  | 'transparency'
  | 'transparency-party'
  | 'trends'
  | 'forgot-password'
  | 'reset-password';

interface RouteSeo {
  /** Path segment without locale, e.g. 'learn/faq'. Empty string = locale home. */
  path: string;
  title: string;
  description: string;
  keywords: string[];
  /** Set false for admin / auth / embed / success pages to preserve crawl budget. */
  index?: boolean;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const ROUTE_SEO: Record<RouteKey, RouteSeo> = {
  home: {
    path: '',
    title: 'Track Political Campaign Money in Kenya | Knight Watch',
    description:
      'Knight Watch tracks political campaign financing in Kenya — PPF allocations, IEBC disclosures, ORPP records and verified citizen reports on misuse of public resources.',
    keywords: ['Kenya campaign finance', 'political party funding Kenya', 'IEBC campaign spending', 'ORPP PPF', 'misuse of public resources Kenya', 'election offences reporting'],
    changeFrequency: 'daily',
    priority: 1,
  },
  about: {
    path: 'about',
    title: 'About Us | Electoral Integrity Through Transparency — Knight Watch Kenya',
    description:
      'About Knight Watch: a Transparency International Kenya civic-tech platform defending electoral integrity by making political money in Kenya visible and accountable.',
    keywords: ['about Knight Watch', 'Transparency International Kenya', 'electoral integrity Kenya', 'campaign finance transparency'],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  accessibility: {
    path: 'accessibility',
    title: 'Accessibility Standards & Universal Inclusion | Knight Watch Kenya',
    description:
      'Knight Watch accessibility commitment: WCAG-aligned, multilingual, screen-reader friendly access to Kenya campaign finance data for every citizen.',
    keywords: ['accessibility', 'WCAG Kenya', 'inclusive civic tech'],
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  admin: {
    path: 'admin',
    title: 'Investigator Command Deck | Knight Watch',
    description: 'Restricted investigator workspace for verifying campaign finance incident reports.',
    keywords: [],
    index: false,
  },
  'admin-login': {
    path: 'admin/login',
    title: 'Investigator Sign In | Knight Watch',
    description: 'Restricted sign-in for accredited Knight Watch investigators.',
    keywords: [],
    index: false,
  },
  'admin-reports': {
    path: 'admin/reports',
    title: 'Verification Queue | Knight Watch Investigators',
    description: 'Restricted moderation queue for campaign finance incident verification.',
    keywords: [],
    index: false,
  },
  'admin-report-detail': {
    path: 'admin/reports/[id]',
    title: 'Investigate Report | Knight Watch',
    description: 'Restricted investigator view of a single campaign finance incident report.',
    keywords: [],
    index: false,
  },
  alerts: {
    path: 'alerts',
    title: 'Civic Watchdog Alerts on Campaign Finance | Knight Watch Kenya',
    description:
      'Subscribe to Knight Watch alerts: verified vote-buying, illegal donations and state-resource abuse incidents across Kenya’s 47 counties.',
    keywords: ['election alerts Kenya', 'vote buying alerts', 'campaign finance notifications'],
    changeFrequency: 'daily',
    priority: 0.6,
  },
  'alerts-preferences': {
    path: 'alerts/preferences',
    title: 'Alert Preferences | Knight Watch Kenya',
    description:
      'Manage your Knight Watch alert preferences — daily digest or weekly watchdog brief on Kenya campaign finance violations.',
    keywords: ['alert preferences', 'watchdog digest Kenya'],
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  'api-docs': {
    path: 'api-docs',
    title: 'API Documentation & Embeds for Kenya Election Data | Knight Watch',
    description:
      'Knight Watch open API and embeddable map/chart widgets: query verified campaign finance incidents, PPF data and county dossiers programmatically.',
    keywords: ['election data API Kenya', 'campaign finance API', 'embed election map Kenya', 'ORPP data API'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  calculator: {
    path: 'calculator',
    title: 'Electoral Financing Calculators: PPF & Spending Limits | Knight Watch Kenya',
    description:
      'Compute statutory Political Parties Fund entitlements and IEBC campaign spending ceilings by seat and county with Knight Watch calculators.',
    keywords: ['PPF calculator Kenya', 'campaign spending limit calculator', 'IEBC spending ceilings', 'Political Parties Fund formula'],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  contact: {
    path: 'contact',
    title: 'Contact Knight Watch & Legal Desk | Kenya',
    description:
      'Contact Knight Watch for support, partnerships, press enquiries or legal assistance on reporting electoral malpractice in Kenya.',
    keywords: ['contact Knight Watch', 'election legal assistance Kenya', 'report malpractice help'],
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  counties: {
    path: 'counties',
    title: 'County Campaign Finance Directory: All 47 Counties | Knight Watch Kenya',
    description:
      'Browse campaign finance dossiers for all 47 Kenyan counties — incident reports, PPF flows and county-level misuse of public resources.',
    keywords: ['Kenya counties campaign finance', 'county election spending', 'devolution corruption Kenya'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  'county-detail': {
    path: 'counties/[slug]',
    title: 'County Campaign Finance Dossier | Knight Watch Kenya',
    description:
      'County-level campaign finance dossier: verified incident reports, spending patterns and transparency scores for this Kenyan county.',
    keywords: ['county campaign finance Kenya', 'county election offences', 'county transparency score'],
    changeFrequency: 'daily',
    priority: 0.7,
  },
  dashboard: {
    path: 'dashboard',
    title: 'Campaign Finance Watch Dashboard | Kenya Election Data',
    description:
      'Live Knight Watch dashboard: verified campaign finance violations, PPF disbursements and incident trends across Kenya.',
    keywords: ['campaign finance dashboard Kenya', 'election violations data', 'PPF disbursement tracker'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  parties: {
    path: 'dashboard/parties',
    title: 'Political Parties Intelligence Hub: Funding & Compliance | Knight Watch',
    description:
      'Compare Kenyan political parties — ORPP registration, PPF allocations, transparency scores and verified campaign finance violations.',
    keywords: ['Kenya political parties funding', 'UDA ODM funding', 'PPF allocation by party', 'party transparency score Kenya'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  'party-detail': {
    path: 'dashboard/parties/[slug]',
    title: 'Party Funding & Compliance Dossier | Knight Watch Kenya',
    description:
      'Party-level dossier: statutory PPF allocation, audited accounts disclosure, parliamentary seats and verified violations for this Kenyan party.',
    keywords: ['party PPF allocation Kenya', 'party audited accounts ORPP', 'Kenya party compliance'],
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  'data-sources': {
    path: 'data-sources',
    title: 'Official Data Sources: ORPP, IEBC, EACC & Auditor-General | Knight Watch',
    description:
      'Every Knight Watch fact is traceable: ORPP party registers, IEBC results, EACC probes, Auditor-General audits and TI-Kenya observation data.',
    keywords: ['ORPP data', 'IEBC results', 'EACC Kenya', 'Auditor General political parties audit', 'TI-Kenya data'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'embed-chart': {
    path: 'embed/chart',
    title: 'Violation Categories Chart (Embed) | Knight Watch',
    description: 'Embeddable Knight Watch chart of campaign finance violation categories.',
    keywords: [],
    index: false,
  },
  'embed-map': {
    path: 'embed/map',
    title: 'Incident Map (Embed) | Knight Watch',
    description: 'Embeddable Knight Watch map of verified campaign finance incidents.',
    keywords: [],
    index: false,
  },
  intelligence: {
    path: 'intelligence',
    title: 'Investigate Political Money: Parties & Politicians | Knight Watch Kenya',
    description:
      'AI-powered public-records intelligence on Kenyan parties and politicians — PPF funding, harambee donations, rally financing and integrity probes.',
    keywords: ['Kenya politician wealth', 'party funding intelligence', 'Ruto campaign financing', 'UDA ODM PPF', 'Kenya corruption allegations'],
    changeFrequency: 'daily',
    priority: 0.9,
  },
  'intelligence-results': {
    path: 'intelligence/results',
    title: 'Intelligence Dossier: Activities & Funding Trail | Knight Watch Kenya',
    description:
      'Civic financial intelligence dossier: rallies, PPF disbursements, audits and news for the selected Kenyan party or politician.',
    keywords: ['political intelligence dossier Kenya', 'campaign finance trail', 'PPF audit report'],
    changeFrequency: 'daily',
    priority: 0.5,
  },
  learn: {
    path: 'learn',
    title: 'Learn: How Political Money Works in Kenya | Knight Watch Civic Education',
    description:
      'Free civic education: how campaign funding, the 0.3% Political Parties Fund, spending limits and election offences work in Kenya.',
    keywords: ['campaign funding Kenya explained', 'Political Parties Fund Kenya', 'election offences Kenya', 'civic education Kenya'],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  'learn-ppf': {
    path: 'learn/ppf',
    title: 'The 0.3% Political Parties Fund (PPF) Explained | Knight Watch Kenya',
    description:
      'What is Kenya’s 0.3% Political Parties Fund? Who qualifies, how ORPP disburses it and what parties may legally spend it on.',
    keywords: ['Political Parties Fund Kenya', '0.3% PPF', 'ORPP fund disbursement', 'what is PPF Kenya'],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  'learn-glossary': {
    path: 'learn/glossary',
    title: 'Electoral & Campaign Finance Glossary | Knight Watch Kenya',
    description:
      'Definitions of PPF, IEBC, ORPP, vote buying, harambee, dark donations and every key Kenya campaign finance term.',
    keywords: ['election glossary Kenya', 'PPF meaning', 'ORPP IEBC full form', 'vote buying definition Kenya'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'learn-formula': {
    path: 'learn/formula',
    title: 'The PPF Allocation Formula, Step by Step | Knight Watch Kenya',
    description:
      'How Kenya’s PPF allocation formula divides the 0.3% fund among qualifying parties — worked example with votes, seats and special-interest quotas.',
    keywords: ['PPF formula Kenya', 'how PPF is shared', 'Political Parties Fund calculation'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'learn-download': {
    path: 'learn/download',
    title: 'Free Downloadable Civic Resources & Templates | Knight Watch Kenya',
    description:
      'Download citizen guides to campaign spending, the PPF cheat sheet and polling-station incident log templates — free PDFs.',
    keywords: ['election observer guide PDF Kenya', 'PPF cheat sheet', 'incident log template'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'learn-funding-overview': {
    path: 'learn/funding-overview',
    title: 'Campaign Funding in Kenya: An Overview | Knight Watch',
    description:
      'Overview of campaign funding in Kenya: public PPF money, private donations, harambee culture and the transparency gaps Knight Watch closes.',
    keywords: ['campaign funding Kenya overview', 'harambee donations politics', 'private donations Kenya elections'],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  'learn-faq': {
    path: 'learn/faq',
    title: 'FAQs: Whistleblower Safety, PPF & Vote-Buying Penalties | Knight Watch Kenya',
    description:
      'Answers on anonymous reporting, whistleblower protection under Kenyan law, what PPF may fund, spending limits and vote-buying penalties.',
    keywords: ['is reporting corruption anonymous Kenya', 'whistleblower protection Kenya', 'vote buying penalty Kenya', 'PPF spending rules'],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  'learn-expenditure-period': {
    path: 'learn/expenditure-period',
    title: 'Expenditure Periods & Election Calendar | Knight Watch Kenya',
    description:
      'When does Kenya’s regulated campaign expenditure period start and end? Election calendar, IEBC gazettement and reporting windows explained.',
    keywords: ['expenditure period Kenya', 'campaign period IEBC', 'Kenya election calendar'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'learn-spending-limits': {
    path: 'learn/spending-limits',
    title: 'Legal Campaign Spending Limits by Seat | Knight Watch Kenya',
    description:
      'Kenya’s gazetted campaign spending ceilings for President, Governor, MP, MCA and Woman Rep — history, current status and penalties.',
    keywords: ['campaign spending limits Kenya', 'IEBC spending ceiling president governor', 'Election Campaign Financing Act'],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  login: {
    path: 'login',
    title: 'Citizen Sign In | Knight Watch',
    description: 'Sign in to Knight Watch to file reports, fund parties and manage watchdog alerts.',
    keywords: [],
    index: false,
  },
  map: {
    path: 'map',
    title: '47 Counties Incident Heat Map | Knight Watch Kenya',
    description:
      'Interactive heat map of verified campaign finance incidents — vote buying, state-resource abuse and illegal donations across Kenya.',
    keywords: ['Kenya election map', 'vote buying heatmap', 'campaign incidents map Kenya'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  mchango: {
    path: 'mchango',
    title: 'Mchango: Crowdfund Political Parties Transparently | Knight Watch Kenya',
    description:
      'Mchango lets Kenyans crowdfund political parties via M-Pesa, Airtel Money or card — every shilling receipted on a public transparency ledger.',
    keywords: ['crowdfund political party Kenya', 'Mchango', 'donate via M-Pesa political party', 'party donations Kenya'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  'mchango-success': {
    path: 'mchango/success',
    title: 'Contribution Received | Knight Watch Mchango',
    description: 'Your Mchango contribution receipt and public ledger entry.',
    keywords: [],
    index: false,
  },
  'mchango-transparency': {
    path: 'mchango/transparency',
    title: 'Mchango Transparency Ledger: Every Shilling Tracked | Knight Watch',
    description:
      'Public Mchango ledger: party crowdfunding goals, amounts raised and Paystack-verified mobile-money receipts.',
    keywords: ['Mchango ledger', 'party donations transparency Kenya', 'political crowdfunding ledger'],
    changeFrequency: 'daily',
    priority: 0.6,
  },
  press: {
    path: 'press',
    title: 'Press & Research Toolkit | Knight Watch Kenya',
    description:
      'Press kit, methodology notes and research-ready datasets on Kenya campaign finance for journalists and academics.',
    keywords: ['Kenya election press kit', 'campaign finance research Kenya', 'TI-Kenya media'],
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  privacy: {
    path: 'privacy',
    title: 'Privacy Policy & Whistleblower Immunity | Knight Watch Kenya',
    description:
      'How Knight Watch protects whistleblowers: zero-knowledge architecture, stripped metadata, and your rights under Kenya’s Data Protection Act.',
    keywords: ['privacy policy', 'whistleblower anonymity Kenya', 'Data Protection Act Kenya'],
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  report: {
    path: 'report',
    title: 'Report Vote Buying & Campaign Finance Abuse Anonymously | Knight Watch',
    description:
      'File an anonymous report on vote buying, illegal donations or misuse of public resources — online, via *384*11400# USSD or toll-free SMS.',
    keywords: ['report vote buying Kenya', 'report election offence', 'anonymous corruption report Kenya', '*384*11400#'],
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  'report-ussd': {
    path: 'report/ussd',
    title: 'Report via Free USSD *384*11400# Without Internet | Knight Watch Kenya',
    description:
      'No internet? Dial *384*11400# on Safaricom, Airtel or Telkom to report electoral malpractice free of charge, in any Kenyan language.',
    keywords: ['USSD report Kenya', '*384*11400#', 'report without internet Kenya'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'report-sms': {
    path: 'report/sms',
    title: 'Report via Toll-Free SMS 38383 | Knight Watch Kenya',
    description:
      'Send a free SMS — REPORT [Category] [Details] [Location] — to 38383 to blow the whistle on campaign finance abuse in Kenya.',
    keywords: ['SMS report Kenya', 'toll free election SMS', '38383 shortcode'],
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  'report-success': {
    path: 'report/success',
    title: 'Report Lodged Successfully | Knight Watch',
    description: 'Confirmation that your anonymous incident report was received for verification.',
    keywords: [],
    index: false,
  },
  reports: {
    path: 'reports',
    title: 'Public Incident Reports Feed: Verified Election Offences | Knight Watch',
    description:
      'Browse verified citizen reports of vote buying, dark donations and state-resource abuse filed with Knight Watch across Kenya.',
    keywords: ['election offences reports Kenya', 'vote buying reports', 'verified corruption reports Kenya'],
    changeFrequency: 'hourly',
    priority: 0.8,
  },
  'report-detail': {
    path: 'reports/[id]',
    title: 'Incident Report Dossier | Knight Watch Kenya',
    description:
      'Verified incident dossier: evidence summary, location, category and verification status of this Kenya campaign finance report.',
    keywords: ['incident dossier Kenya', 'election offence case'],
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  search: {
    path: 'search',
    title: 'Search Incident Dossiers & Party Records | Knight Watch Kenya',
    description:
      'Search Knight Watch incident dossiers, party filings and county records by keyword, category or location.',
    keywords: ['search election reports Kenya', 'find vote buying case'],
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  signup: {
    path: 'signup',
    title: 'Join Knight Watch | Citizen Watchdog Account',
    description: 'Create a free Knight Watch account to report, subscribe to alerts and support electoral transparency.',
    keywords: [],
    index: false,
  },
  terms: {
    path: 'terms',
    title: 'Terms & Civic Use Covenant | Knight Watch Kenya',
    description:
      'Terms of use for Knight Watch: responsible reporting duties, evidence standards and prohibited conduct under Kenyan law.',
    keywords: ['terms of use', 'civic use covenant'],
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  transparency: {
    path: 'transparency',
    title: 'Kenya Political Parties Transparency Index & Rankings | Knight Watch',
    description:
      'Ranked transparency index of Kenyan parties: audited accounts, PPF compliance, public Mchango disclosure and incident resolution rates.',
    keywords: ['party transparency index Kenya', 'most transparent party Kenya', 'PPF compliance ranking'],
    changeFrequency: 'daily',
    priority: 0.8,
  },
  'transparency-party': {
    path: 'transparency/[party]',
    title: 'Party Transparency Scorecard | Knight Watch Kenya',
    description:
      'Full transparency scorecard for this Kenyan party: audit disclosure, PPF compliance, donation openness and citizen-report resolution.',
    keywords: ['party transparency score Kenya', 'party audit disclosure ORPP'],
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  trends: {
    path: 'trends',
    title: 'Historical Finance & Incident Trends 2017–2027 | Knight Watch Kenya',
    description:
      'Decade-long trends in Kenya campaign finance: PPF growth, violation categories and incident volumes across election cycles 2017, 2022 and 2027.',
    keywords: ['campaign finance trends Kenya', 'election violations statistics', 'PPF history Kenya'],
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  'forgot-password': {
    path: 'forgot-password',
    title: 'Forgot Password | Knight Watch',
    description: 'Request a one-time password reset link for your Knight Watch citizen account.',
    keywords: [],
    index: false,
  },
  'reset-password': {
    path: 'reset-password',
    title: 'Set New Password | Knight Watch',
    description: 'Choose a new password for your Knight Watch citizen account.',
    keywords: [],
    index: false,
  },
};

/** Canonical URL for a locale + route path. */
export function canonicalUrl(locale: string, path: string): string {
  return path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`;
}

/** hreflang alternates incl. x-default (English). */
export function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const code of LOCALE_CODES) {
    out[code] = path ? `${SITE_URL}/${code}/${path}` : `${SITE_URL}/${code}`;
  }
  return out;
}

export function buildPageMetadata(opts: { locale: string; routeKey: RouteKey; dynamicTitle?: string; dynamicDescription?: string; pathOverride?: string }): Metadata {
  const route = ROUTE_SEO[opts.routeKey];
  const title = opts.dynamicTitle ?? route.title;
  const description = opts.dynamicDescription ?? route.description;
  const path = opts.pathOverride ?? route.path;
  const canonical = canonicalUrl(opts.locale, path);
  const languages = languageAlternates(path);
  const index = route.index !== false;
  return {
    title: { absolute: title },
    description,
    keywords: route.keywords.length ? route.keywords : undefined,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': pathUrl(path) },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_FULL_NAME,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 512, height: 512, alt: `${SITE_NAME} — ${title}` }],
      locale: localeToOg(opts.locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: index
      ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
      : { index: false, follow: false, noarchive: true },
  };
}

function pathUrl(path: string): string {
  return path ? `${SITE_URL}/en/${path}` : `${SITE_URL}/en`;
}

function localeToOg(locale: string): string {
  if (locale === 'sw') return 'sw_KE';
  if (locale === 'en') return 'en_KE';
  return 'en_KE';
}

/* ---------------- JSON-LD builders (invisible, AEO) ---------------- */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_ORG,
    alternateName: [SITE_NAME, 'Campaign Finance Watch Tool'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: OG_IMAGE, width: 512, height: 512 },
    sameAs: ['https://tikenya.org/'],
    areaServed: { '@type': 'Country', name: 'Kenya' },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_FULL_NAME,
    inLanguage: ['en-KE', 'sw-KE'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/en/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(locale: string, crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path ? `${SITE_URL}/${locale}/${c.path}` : `${SITE_URL}/${locale}`,
    })),
  };
}

export function webpageJsonLd(opts: { locale: string; routeKey: RouteKey; title?: string; description?: string; pathOverride?: string }) {
  const route = ROUTE_SEO[opts.routeKey];
  const path = opts.pathOverride ?? route.path;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl(opts.locale, path)}#webpage`,
    url: canonicalUrl(opts.locale, path),
    name: opts.title ?? route.title,
    description: opts.description ?? route.description,
    inLanguage: opts.locale === 'sw' ? 'sw-KE' : 'en-KE',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd() {  const mainEntity = [
    {
      '@type': 'Question',
      name: 'Will my identity be revealed if I submit an evidence report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Knight Watch operates on a zero-knowledge architecture. All IP addresses, GPS coordinates, device fingerprints, and browser metadata are cryptographically stripped before entering our database.',
      },
    },
    {
      '@type': 'Question',
      name: 'What protections exist for whistleblowers under Kenyan law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Witness Protection Act (Cap. 79) and the Bribery Act 2016 provide statutory protection against occupational harassment, dismissal, and criminal retaliation for citizens who disclose corrupt electoral practices in good faith.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do political parties receive public taxpayer money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 23 of the Political Parties Act, public funding institutionalizes political parties as democratic public organs, reducing dependency on oligarchic donors and organized crime.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can political parties legally spend the Political Parties Fund on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Permitted expenses include civic and voter education, representation of special interest groups (minimum 30% of allocation), policy research, and capped administrative operations. It cannot fund voter handouts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current legal limit on presidential or gubernatorial campaign spending?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently there are no legally enforced spending limits; the 2017 draft regulations were scuttled before 2022, and courts have directed IEBC to reinstate binding limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the penalties for vote buying under the Election Offences Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 9 of the Election Offences Act (No. 37 of 2016) provides up to 5 years imprisonment, a fine of up to KSh 2,000,000, and disqualification from public office for up to 5 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I submit an incident report without internet or smartphone access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dial *384*11400# from any Kenyan mobile phone (toll-free on Safaricom, Airtel and Telkom), or send REPORT [Category] [Details] [Location] by free SMS to 38383.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Knight Watch verify crowd-sourced incident reports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Submissions undergo automated AI triage for deduplication, followed by independent field verification by accredited civil society observers, media fact-checkers and legal analysts.',
      },
    },
  ];
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}

export const KENYA_COUNTY_SLUGS = [
  'mombasa', 'kwale', 'kilifi', 'tana-river', 'lamu', 'taita-taveta', 'garissa', 'wajir', 'mandera',
  'marsabit', 'isiolo', 'meru', 'tharaka-nithi', 'embu', 'kitui', 'machakos', 'makueni', 'nyandarua',
  'nyeri', 'kirinyaga', 'muranga', 'kiambu', 'turkana', 'west-pokot', 'samburu', 'trans-nzoia',
  'uasin-gishu', 'elgeyo-marakwet', 'nandi', 'baringo', 'laikipia', 'nakuru', 'narok', 'kajiado',
  'kericho', 'bomet', 'kakamega', 'vihiga', 'bungoma', 'busia', 'siaya', 'kisumu', 'homa-bay',
  'migori', 'kisii', 'nyamira', 'nairobi',
];

export const PARTY_SLUGS = ['uda', 'odm', 'jubilee', 'wdm-k', 'anc', 'ford-kenya', 'kanu', 'dap-k'];

export function prettyNameFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w.toLowerCase() === 'mc' ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

/** Article schema for civic-education guides and press resources (AEO citations). */
export function articleJsonLd(opts: { locale: string; routeKey: RouteKey }) {
  const route = ROUTE_SEO[opts.routeKey];
  const url = canonicalUrl(opts.locale, route.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: route.title,
    description: route.description,
    inLanguage: opts.locale === 'sw' ? 'sw-KE' : 'en-KE',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: {
      '@type': 'Organization',
      name: SITE_ORG,
      logo: { '@type': 'ImageObject', url: OG_IMAGE, width: 512, height: 512 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
    about: [
      { '@type': 'Thing', name: 'Campaign finance in Kenya' },
      { '@type': 'Thing', name: 'Political Parties Fund' },
      { '@type': 'Thing', name: 'Election offences' },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };
}

/** Dataset schema for open-data pages (data-sources, api-docs). */
export function datasetJsonLd(opts: { locale: string; routeKey: RouteKey }) {
  const route = ROUTE_SEO[opts.routeKey];
  const url = canonicalUrl(opts.locale, route.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name: route.title,
    description: route.description,
    url,
    inLanguage: opts.locale === 'sw' ? 'sw-KE' : 'en-KE',
    creator: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    spatialCoverage: { '@type': 'Country', name: 'Kenya' },
    keywords: route.keywords,
  };
}
