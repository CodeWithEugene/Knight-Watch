import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { notifyReportReceived } from '@/lib/notify';

/** Client ping after a report submission (supports Convex lookup with local fallback data). */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const isDev = process.env.NODE_ENV === 'development';
  const { allowed } = checkRateLimit(ip, 'notify-report-received', { limit: isDev ? 100 : 20, windowMs: 60 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const reportId = typeof body.reportId === 'string' ? body.reportId : '';
  const locale = typeof body.locale === 'string' && /^[a-z]{2,5}$/.test(body.locale) ? body.locale : 'en';
  if (!reportId) return NextResponse.json({ error: 'reportId required' }, { status: 400 });

  const fallbackData = {
    title: typeof body.title === 'string' ? body.title : undefined,
    category: typeof body.category === 'string' ? body.category : undefined,
    location: typeof body.location === 'string' ? body.location : undefined,
    email: typeof body.email === 'string' ? body.email : undefined,
    source: typeof body.source === 'string' ? body.source : 'web',
  };

  const result = await notifyReportReceived(reportId, locale, fallbackData);
  return NextResponse.json({ ok: true, ...result });
}
