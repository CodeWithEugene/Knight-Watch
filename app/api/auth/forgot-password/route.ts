import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomBytes, createHash } from 'node:crypto';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { checkRateLimit } from '@/lib/rateLimit';
import { getSafeCallbackUrl } from '@/lib/authRedirect';
import { isEmailConfigured, sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getConvexUrl(): string | null {
  return process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || null;
}

function getBaseUrl(request: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;
  if (configured) return configured.replace(/\/$/, '');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'localhost:3000';
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

export async function POST(request: NextRequest) {
  // Rate-limit reset requests: max 5 per IP per hour (abuse + enumeration guard)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'forgot-password', { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many reset attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const locale = typeof body.locale === 'string' && /^[a-z]{2,5}$/.test(body.locale) ? body.locale : 'en';
    const callbackUrl = getSafeCallbackUrl(typeof body.callbackUrl === 'string' ? body.callbackUrl : null, locale);

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const convexUrl = getConvexUrl();
    if (!convexUrl) {
      return NextResponse.json(
        { error: 'Password reset is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Single-use token: raw value goes to the user, only the hash is stored.
    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const client = new ConvexHttpClient(convexUrl);
    const { created } = await client.mutation(api.passwordReset.requestPasswordReset, {
      email,
      tokenHash,
    });

    // Generic response either way — never reveal whether the email is registered.
    const generic = {
      ok: true,
      message: 'If an account exists for this email, a reset link is on its way.',
    };

    if (!created) return NextResponse.json(generic);

    const resetUrl =
      `${getBaseUrl(request)}/${locale}/reset-password` +
      `?token=${encodeURIComponent(token)}` +
      `&callbackUrl=${encodeURIComponent(callbackUrl)}`;

    const template = emailTemplates.passwordReset(resetUrl);
    const { sent } = await sendEmail({ to: email, subject: template.subject, html: template.html });

    // Local-dev fallback: without an email provider, hand the link back
    // outside production so the flow can still be completed and tested.
    if (!sent && process.env.NODE_ENV !== 'production' && !isEmailConfigured()) {
      return NextResponse.json({ ...generic, devResetUrl: resetUrl });
    }

    return NextResponse.json(generic);
  } catch (err) {
    console.error('[auth] forgot-password failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
