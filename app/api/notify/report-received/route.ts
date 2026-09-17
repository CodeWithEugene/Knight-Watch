import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { notifyReportReceived } from '@/lib/notify';

/** Client ping after a successful web report submission (server re-reads; no caller addresses). */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'notify-report-received', { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const reportId = typeof body.reportId === 'string' ? body.reportId : '';
  const locale = typeof body.locale === 'string' && /^[a-z]{2,5}$/.test(body.locale) ? body.locale : 'en';
  if (!reportId) return NextResponse.json({ error: 'reportId required' }, { status: 400 });

  const result = await notifyReportReceived(reportId, locale);
  return NextResponse.json({ ok: true, ...result });
}
