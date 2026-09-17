import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { notifyContact } from '@/lib/notify';

/** Contact form backend: integrity-desk notification + sender confirmation. */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'notify-contact', { limit: 3, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === 'string' ? body.name : '';
  const email = typeof body.email === 'string' ? body.email : '';
  const subject = typeof body.subject === 'string' ? body.subject : '';
  const message = typeof body.message === 'string' ? body.message : '';
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
  }

  const result = await notifyContact({ name, email, subject, message });
  if (!result.teamSent && !result.confirmSent) {
    return NextResponse.json(
      { error: 'Message service is temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true });
}
