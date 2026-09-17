import { NextResponse, NextRequest } from 'next/server';
import { sendEmail, getEmailFrom, isEmailConfigured } from '@/lib/email';
import { emailTemplates } from '@/lib/emailTemplates';

/**
 * Diagnostic and testing route for Knight Watch transactional emails.
 * Only enabled in development or when DEBUG_EMAIL=1.
 * Usage:
 *   GET  /api/notify/test?to=someone@example.com&type=test|report|subscribe|contact
 *   POST /api/notify/test (json body with { to, type, name, message })
 */
export async function GET(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_EMAIL === '1';
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to') || 'eugenegabriel.ke@gmail.com';
  const type = searchParams.get('type') || 'test';

  const diagnostics = {
    configured: isEmailConfigured(),
    sender: getEmailFrom(),
    hasApiKey: Boolean(process.env.BREVO_API_KEY),
    apiKeyPrefix: process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.slice(0, 12) + '...' : null,
    environment: process.env.NODE_ENV,
    isDev,
  };

  if (!isDev && !searchParams.get('key')) {
    return NextResponse.json(
      { error: 'Email diagnostics route is only available in development mode.', diagnostics },
      { status: 403 }
    );
  }

  if (!diagnostics.hasApiKey) {
    return NextResponse.json(
      { ok: false, error: 'BREVO_API_KEY is not set in environment.', diagnostics },
      { status: 500 }
    );
  }

  let template: { subject: string; html: string };
  if (type === 'report') {
    template = emailTemplates.reportReceived({
      title: 'Suspicious Campaign Funding in Kiambu County',
      category: 'illegal-donations',
      location: 'Kiambu County',
      reportId: 'RPT-TEST-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
    });
  } else if (type === 'subscribe') {
    template = emailTemplates.newsletterWelcome();
  } else if (type === 'contact') {
    template = emailTemplates.contactConfirmation('Eugene');
  } else {
    template = {
      subject: 'Knight Watch — Transactional Email Verification',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:20px auto;padding:24px;border:1px solid #e4e4e7;border-radius:16px;">
          <h2 style="color:#09090b;margin-top:0;">Knight Watch Email Active ✅</h2>
          <p style="color:#3f3f46;font-size:14px;line-height:1.6;">
            Your Brevo transactional email configuration for <strong>Knight Watch</strong> is working properly.
          </p>
          <div style="background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:12px;color:#71717a;">
            <div>Timestamp: ${new Date().toISOString()}</div>
            <div>Sender: ${diagnostics.sender.name} &lt;${diagnostics.sender.email}&gt;</div>
          </div>
        </div>
      `,
    };
  }

  const result = await sendEmail({
    to,
    subject: template.subject,
    html: template.html,
    tags: [`test-${type}`],
  });

  return NextResponse.json({
    ok: result.sent,
    recipient: to,
    type,
    messageId: result.messageId,
    error: result.error,
    diagnostics,
  });
}

export async function POST(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_EMAIL === '1';
  if (!isDev) {
    return NextResponse.json({ error: 'Not available' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const to = (body.to as string) || 'eugenegabriel.ke@gmail.com';
  const type = (body.type as string) || 'test';

  const url = new URL(request.url);
  url.searchParams.set('to', to);
  url.searchParams.set('type', type);

  return GET(new NextRequest(url.toString(), { headers: request.headers }));
}
