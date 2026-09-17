import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from './providers';
import { SkipLink } from '@/components/layout/SkipLink';
import { AccessibilityWidget } from '@/components/AccessibilityWidget';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_FULL_NAME, SITE_ORG, SITE_TAGLINE, OG_IMAGE, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';
import 'leaflet/dist/leaflet.css';

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

const siteUrl = SITE_URL;
const ogImage = OG_IMAGE;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Track Political Campaign Money in Kenya | Knight Watch',
    template: '%s | Knight Watch Kenya',
  },
  description: SITE_TAGLINE,
  applicationName: SITE_FULL_NAME,
  authors: [{ name: SITE_ORG, url: 'https://tikenya.org/' }],
  creator: SITE_ORG,
  publisher: SITE_ORG,
  category: 'civic tech',
  keywords: [
    'Kenya campaign finance',
    'political party funding Kenya',
    'IEBC',
    'ORPP',
    'Political Parties Fund',
    'election offences Kenya',
    'vote buying Kenya',
    'misuse of public resources',
    'Transparency International Kenya',
  ],
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: { 'x-default': `${siteUrl}/en` },
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/en`,
    siteName: SITE_FULL_NAME,
    title: 'Track Political Campaign Money in Kenya | Knight Watch',
    description: SITE_TAGLINE,
    locale: 'en_KE',
    alternateLocale: ['sw_KE'],
    images: [{ url: ogImage, width: 512, height: 512, alt: 'Knight Watch — Campaign Finance Watch Tool, Kenya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Political Campaign Money in Kenya | Knight Watch',
    description: SITE_TAGLINE,
    images: [ogImage],
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <SkipLink />
          {children}
          <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-1">
            <AccessibilityWidget />
            <ChatbotWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
