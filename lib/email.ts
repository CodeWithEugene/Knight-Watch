/**
 * Transactional email sender via Brevo (SMTP API).
 * Verified sender: Campaign Finance Watch Tool <noreply@cfwt.codewitheugene.top>
 * Requires BREVO_API_KEY. When missing, sends are logged server-side and
 * (outside production) reported as unsent so flows stay testable locally.
 */

export function isEmailConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

export function getEmailFrom(): { name: string; email: string } {
  const raw =
    process.env.EMAIL_FROM ?? 'Campaign Finance Watch Tool <noreply@cfwt.codewitheugene.top>';
  const match = raw.match(/^(.*)<([^>]+)>\s*$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { name: 'Campaign Finance Watch Tool', email: raw.trim() };
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  tags?: string[];
  replyTo?: { email: string; name?: string };
}): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn(`[email] BREVO_API_KEY missing — simulated send to ${opts.to}: ${opts.subject}`);
    return { sent: false, error: 'BREVO_API_KEY environment variable is not configured.' };
  }
  try {
    const from = getEmailFrom();
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: from.name, email: from.email },
        to: [{ email: opts.to }],
        replyTo: opts.replyTo,
        subject: opts.subject,
        htmlContent: opts.html,
        textContent: opts.text,
        tags: opts.tags,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[email] Brevo send failed:', res.status, body.slice(0, 300));
      return { sent: false, error: `Brevo error (${res.status}): ${body.slice(0, 300)}` };
    }
    const data = await res.json().catch(() => ({}));
    const messageId = typeof data.messageId === 'string' ? data.messageId : undefined;
    console.log(`[email] Sent successfully via Brevo to ${opts.to} (messageId: ${messageId ?? 'ok'})`);
    return { sent: true, messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[email] Brevo send error:', message);
    return { sent: false, error: message };
  }
}

/** Escape user-supplied content interpolated into email HTML. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
