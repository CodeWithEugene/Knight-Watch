import type { MetadataRoute } from 'next';
import { LOCALE_CODES } from '@/lib/locales';
import { SITE_URL, ROUTE_SEO, KENYA_COUNTY_SLUGS } from '@/lib/seo';

/**
 * Only publicly crawlable routes are listed. Auth-gated segments
 * (mchango, map, dashboard, reports, transparency, calculator)
 * 307-redirect to /login in middleware, so including them would feed
 * crawlers redirect URLs — they keep their metadata layouts for
 * authenticated sharing but stay out of the sitemap.
 * Note: /report (singular) is intentionally public — anyone can file
 * a report without an account.
 */
const GATED_TOP_SEGMENTS = new Set(['mchango', 'map', 'dashboard', 'reports', 'transparency', 'calculator']);

function isPublic(path: string): boolean {
  if (!path) return true;
  const top = path.split('/')[0];
  return !GATED_TOP_SEGMENTS.has(top);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes × every locale
  for (const locale of LOCALE_CODES) {
    for (const route of Object.values(ROUTE_SEO)) {
      // Skip parameterized templates here; dynamic slugs enumerated below
      if (route.path.includes('[')) continue;
      if (route.index === false) continue;
      if (!isPublic(route.path)) continue;
      entries.push({
        url: route.path ? `${SITE_URL}/${locale}/${route.path}` : `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: (route.changeFrequency ?? 'weekly') as MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: route.priority ?? 0.5,
      });
    }

    // Dynamic county dossiers (public)
    for (const slug of KENYA_COUNTY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/counties/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
