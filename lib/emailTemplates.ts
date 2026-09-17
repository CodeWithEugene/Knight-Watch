/**
 * Branded Brevo email templates for Knight Watch.
 * shadcn-inspired, fully centered: logo + wordmark + tagline header
 * (mirrors the navbar/footer combo), centered body, dark pill CTA.
 */
import { esc } from './email';

const LOGO_URL = 'https://cfwt.codewitheugene.top/images/icon/icon-black.png';
const SITE_URL = 'https://cfwt.codewitheugene.top';

function layout(opts: {
  preheader?: string;
  heading: string;
  intro: string;
  body?: string;
  cta?: { label: string; url: string };
  reason: string;
}): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  ${opts.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
        <tr><td align="center" style="padding:32px 32px 0 32px;">
          <img src="${LOGO_URL}" alt="Knight Watch" width="48" height="48" style="display:block;width:48px;height:48px;" />
          <div style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#09090b;margin-top:12px;">Knight Watch</div>
          <div style="font-size:11px;font-weight:500;letter-spacing:0.04em;color:#71717a;margin-top:4px;">Civic Campaign Finance Integrity</div>
        </td></tr>
        <tr><td style="padding:24px 32px 0 32px;"><div style="border-top:1px solid #e4e4e7;"></div></td></tr>
        <tr><td align="center" style="padding:24px 32px 8px 32px;">
          <div style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#09090b;">${opts.heading}</div>
          <p style="font-size:14px;line-height:1.6;color:#3f3f46;margin:12px 0 0 0;">${opts.intro}</p>
          ${opts.body ?? ''}
          ${opts.cta ? `<div style="margin:24px 0 8px 0;"><a href="${opts.cta.url}" style="display:inline-block;padding:12px 28px;background-color:#18181b;color:#ffffff;border-radius:9999px;text-decoration:none;font-size:14px;font-weight:700;">${esc(opts.cta.label)}</a></div>` : ''}
        </td></tr>
        <tr><td align="center" style="padding:16px 32px 32px 32px;">
          <div style="font-size:11px;line-height:1.6;color:#a1a1aa;">&copy; ${year} Knight Watch Kenya. Open data initiative in partnership with TI-Kenya.<br/>Dedicated to a transparent, fair, and accountable Kenya.<br/>${esc(opts.reason)}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailBox(rows: { label: string; value: string }[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 4px 0;background-color:#f4f4f5;border:1px solid #e4e4e7;border-radius:12px;">
    <tr><td style="padding:16px 20px;">${rows
      .map(
        (r) => `<div style="font-size:13px;line-height:1.5;color:#3f3f46;margin:6px 0;"><span style="color:#71717a;">${esc(r.label)}:</span> <strong style="color:#09090b;">${r.value}</strong></div>`
      )
      .join('')}</td></tr>
  </table>`;
}

export const REPORT_STATUS_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  verified: 'Verified',
  unverified: 'Unverified',
  needs_more_info: 'Needs More Info',
};

export const REPORT_CATEGORY_LABELS: Record<string, string> = {
  'vote-buying': 'Vote Buying',
  'illegal-donations': 'Illegal Donations',
  'misuse-public-resources': 'Misuse of Public Resources',
  'undeclared-spending': 'Undeclared Spending',
  bribery: 'Bribery',
  other: 'Other',
};

export const emailTemplates = {
  welcomeSignup(name?: string) {
    const greeting = name ? esc(name) : 'Citizen';
    return {
      subject: 'Welcome to Knight Watch — your watchdog account is ready',
      html: layout({
        preheader: 'Your Knight Watch citizen account is ready.',
        heading: `Karibu, ${greeting}`,
        intro: 'Your Knight Watch account is ready. You can now save favorite counties, set watchdog alerts, fund parties transparently through Mchango, and track every report you file.',
        body: detailBox([
          { label: 'Report malpractice', value: 'Web, *384*11400# USSD, or free SMS' },
          { label: 'Explore intelligence', value: 'Parties, politicians & PPF trails' },
        ]),
        cta: { label: 'Open Your Dashboard', url: `${SITE_URL}/en/dashboard` },
        reason: "You're receiving this because you created a Knight Watch account.",
      }),
    };
  },

  loginAlert(when: string) {
    return {
      subject: 'New sign-in to your Knight Watch account',
      html: layout({
        preheader: 'A new sign-in was detected on your account.',
        heading: 'New Sign-In Detected',
        intro: `Someone signed in to your Knight Watch account on ${esc(when)}. If this was you, no action is needed.`,
        body: `<p style="font-size:14px;line-height:1.6;color:#3f3f46;margin:12px 0 0 0;">If you don't recognise this activity, reset your password immediately and contact our integrity desk.</p>`,
        cta: { label: 'Review Account Security', url: `${SITE_URL}/en/login` },
        reason: "You're receiving this as a security alert for your Knight Watch account.",
      }),
    };
  },

  passwordReset(resetUrl: string) {
    return {
      subject: 'Reset your Knight Watch password',
      html: layout({
        preheader: 'Reset your password — link expires in 1 hour.',
        heading: 'Reset Your Password',
        intro: 'You requested a password reset for your Knight Watch account. This link expires in 1 hour and can only be used once.',
        cta: { label: 'Reset Password', url: resetUrl },
        reason: "You're receiving this because a password reset was requested for this email. Ignore it if that wasn't you.",
      }),
    };
  },

  passwordChanged() {
    return {
      subject: 'Your Knight Watch password was changed',
      html: layout({
        preheader: 'Your password was successfully changed.',
        heading: 'Password Changed',
        intro: 'Your Knight Watch account password was just changed. If you made this change, you are all set.',
        body: `<p style="font-size:14px;line-height:1.6;color:#3f3f46;margin:12px 0 0 0;">If you didn't change it, request a new reset link right away — your account may be compromised.</p>`,
        cta: { label: 'Sign In', url: `${SITE_URL}/en/login` },
        reason: "You're receiving this as a security confirmation for your Knight Watch account.",
      }),
    };
  },

  reportReceived(opts: { title: string; category: string; location: string; reportId: string; locale?: string }) {
    const category = REPORT_CATEGORY_LABELS[opts.category] ?? opts.category;
    return {
      subject: 'Report received — our investigators are on it',
      html: layout({
        preheader: 'Your evidence report has been logged for verification.',
        heading: 'Report Received',
        intro: 'Thank you for standing up for electoral integrity. Your report has been logged and queued for independent verification by our civil society observers.',
        body: detailBox([
          { label: 'Report', value: esc(opts.title) },
          { label: 'Category', value: esc(category) },
          { label: 'Location', value: esc(opts.location) },
          { label: 'Ticket', value: esc(String(opts.reportId).slice(0, 12)) },
        ]),
        cta: { label: 'Track Public Reports', url: `${SITE_URL}/${opts.locale ?? 'en'}/reports` },
        reason: "You're receiving this because you filed a report with this email address.",
      }),
    };
  },

  reportStatusUpdate(opts: { title: string; fromStatus: string; toStatus: string; note?: string; reportId: string; locale?: string }) {
    const from = REPORT_STATUS_LABELS[opts.fromStatus] ?? opts.fromStatus;
    const to = REPORT_STATUS_LABELS[opts.toStatus] ?? opts.toStatus;
    return {
      subject: `Update on your report: ${to}`,
      html: layout({
        preheader: `Your report moved from ${from} to ${to}.`,
        heading: 'Report Status Update',
        intro: `There is movement on your report <strong>${esc(opts.title)}</strong>. Our verification team updated its status.`,
        body:
          detailBox([
            { label: 'Previous status', value: esc(from) },
            { label: 'New status', value: esc(to) },
            ...(opts.note ? [{ label: 'Verification note', value: esc(opts.note) }] : []),
          ]) +
          `<p style="font-size:14px;line-height:1.6;color:#3f3f46;margin:12px 0 0 0;">Verified reports feed the public dashboard, county heat map, and party transparency scores.</p>`,
        cta: { label: 'View Public Reports', url: `${SITE_URL}/${opts.locale ?? 'en'}/reports` },
        reason: "You're receiving this because you filed this report with this email address.",
      }),
    };
  },

  mchangoReceipt(opts: { partyName: string; amountKes: number; reference: string; paidAt?: string; locale?: string }) {
    const amount = `KES ${opts.amountKes.toLocaleString('en-KE')}`;
    return {
      subject: `Mchango receipt — ${amount} to ${opts.partyName}`,
      html: layout({
        preheader: `Your ${amount} contribution to ${opts.partyName} is confirmed.`,
        heading: 'Contribution Received',
        intro: `Your Mchango contribution to <strong>${esc(opts.partyName)}</strong> is confirmed and will appear on the public transparency ledger. Every shilling tracked.`,
        body: detailBox([
          { label: 'Amount', value: esc(amount) },
          { label: 'Party', value: esc(opts.partyName) },
          { label: 'Reference', value: esc(opts.reference) },
          ...(opts.paidAt ? [{ label: 'Paid at', value: esc(opts.paidAt) }] : []),
        ]),
        cta: { label: 'View Transparency Ledger', url: `${SITE_URL}/${opts.locale ?? 'en'}/mchango/transparency` },
        reason: "You're receiving this receipt because you contributed via Mchango with this email address.",
      }),
    };
  },

  newsletterWelcome() {
    return {
      subject: 'You’re on the watchdog list — alerts activated',
      html: layout({
        preheader: 'Verified violation alerts will land in your inbox.',
        heading: 'Subscription Confirmed',
        intro: "You're now on the civic watchdog list. You'll receive verified campaign finance violation alerts, Political Parties Fund disbursement updates, and county hotspot briefs.",
        cta: { label: 'Manage Preferences', url: `${SITE_URL}/en/alerts/preferences` },
        reason: "You're receiving this because you subscribed to Knight Watch alerts with this email address.",
      }),
    };
  },

  contactTeamNotification(opts: { name: string; email: string; subject: string; message: string }) {
    return {
      subject: `[Integrity Desk] ${opts.subject || 'New citizen message'}`,
      html: layout({
        preheader: `New message from ${opts.name} (${opts.email}).`,
        heading: 'New Desk Message',
        intro: 'A citizen sent the following message through the contact form. Reply directly to start the thread.',
        body: detailBox([
          { label: 'From', value: `${esc(opts.name)} &lt;${esc(opts.email)}&gt;` },
          { label: 'Subject', value: esc(opts.subject || '—') },
          { label: 'Message', value: esc(opts.message) },
        ]),
        reason: "You're receiving this as a Knight Watch integrity desk notification.",
      }),
    };
  },

  contactConfirmation(name: string) {
    return {
      subject: 'Message received — integrity desk will respond within 24 hours',
      html: layout({
        preheader: 'Your message is with our civic liaison team.',
        heading: `Thank You${name ? `, ${esc(name)}` : ''}`,
        intro: 'Your inquiry has been routed to our civic liaison team. We typically respond within 24 business hours.',
        cta: { label: 'Keep Exploring', url: `${SITE_URL}/en` },
        reason: "You're receiving this because you contacted Knight Watch with this email address.",
      }),
    };
  },

  adminNewReport(opts: { title: string; category: string; location: string; source: string; reportId: string; locale?: string }) {
    const category = REPORT_CATEGORY_LABELS[opts.category] ?? opts.category;
    return {
      subject: `[Verification Queue] New ${category} report — ${opts.location}`,
      html: layout({
        preheader: `New report needs triage: ${opts.title}`,
        heading: 'New Report in Queue',
        intro: 'A new incident report just landed in the verification queue and is waiting for triage.',
        body: detailBox([
          { label: 'Report', value: esc(opts.title) },
          { label: 'Category', value: esc(category) },
          { label: 'Location', value: esc(opts.location) },
          { label: 'Channel', value: esc(opts.source.toUpperCase()) },
        ]),
        cta: { label: 'Open Verification Queue', url: `${SITE_URL}/${opts.locale ?? 'en'}/admin/reports` },
        reason: "You're receiving this as a Knight Watch investigator notification.",
      }),
    };
  },
};
