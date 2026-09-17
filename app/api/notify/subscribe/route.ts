import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { notifySubscribe } from '@/lib/notify';

/** Client ping after newsletter signup (server verifies the subscription first). */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'notify-subscribe', { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  const result = await notifySubscribe(email);
  return NextResponse.json({ ok: true, ...result });
}
