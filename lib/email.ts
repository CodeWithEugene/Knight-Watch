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
}): Promise<{ sent: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.log(`[email] BREVO_API_KEY missing — would send to ${opts.to}: ${opts.subject}`);
    return { sent: false };
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
        subject: opts.subject,
        htmlContent: opts.html,
        textContent: opts.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[email] Brevo send failed:', res.status, body.slice(0, 300));
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error('[email] Brevo send error:', err);
    return { sent: false };
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
