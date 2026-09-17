import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createHash } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { validatePassword } from '@/lib/password';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/emailTemplates';

function getConvexUrl(): string | null {
  return process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || null;
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** GET ?token=… — pre-check for the reset form (UX only; POST re-validates). */
export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'reset-password', { limit: 30, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const token = request.nextUrl.searchParams.get('token') ?? '';
  if (!token) return NextResponse.json({ valid: false });

  const convexUrl = getConvexUrl();
  if (!convexUrl) return NextResponse.json({ valid: false });

  try {
    const client = new ConvexHttpClient(convexUrl);
    const { valid } = await client.query(api.passwordReset.validateResetToken, {
      tokenHash: hashToken(token),
    });
    return NextResponse.json({ valid });
  } catch (err) {
    console.error('[auth] reset-password validate failed:', err);
    return NextResponse.json({ valid: false });
  }
}

/** POST {token, password} — consume the token and set the new password. */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(ip, 'reset-password', { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body.token === 'string' ? body.token : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!token || !password) {
      return NextResponse.json({ error: 'Reset token and new password are required' }, { status: 400 });
    }

    const pwValidation = validatePassword(password);
    if (!pwValidation.valid) {
      return NextResponse.json({ error: pwValidation.error }, { status: 400 });
    }

    const convexUrl = getConvexUrl();
    if (!convexUrl) {
      return NextResponse.json(
        { error: 'Password reset is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const client = new ConvexHttpClient(convexUrl);
    const { email } = await client.mutation(api.passwordReset.resetPasswordWithToken, {
      tokenHash: hashToken(token),
      passwordHash,
    });

    // Password-changed confirmation — never blocks the reset response.
    if (email) {
      try {
        const template = emailTemplates.passwordChanged();
        await sendEmail({ to: email, subject: template.subject, html: template.html });
      } catch (err) {
        console.error('[auth] password-changed email failed:', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Reset failed';
    if (message.includes('invalid or has expired')) {
      return NextResponse.json(
        { error: 'This reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }
    console.error('[auth] reset-password failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
