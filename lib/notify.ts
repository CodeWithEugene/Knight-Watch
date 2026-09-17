/**
 * Server-side notification engine. All transactional email flows through
 * here so Convex-originated events (USSD/SMS/admin) and Next API routes
 * share one rate-limited, abuse-resistant path. Keys stay in Vercel env.
 */
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { sendEmail } from './email';
import { emailTemplates } from './emailTemplates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getConvexUrl(): string | null {
  return process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || null;
}

function getAdminDeskEmail(): string | null {
  const email = (process.env.ADMIN_EMAIL ?? '').trim();
  return email && EMAIL_REGEX.test(email) ? email : null;
}

function isFresh(createdAt: number, maxAgeMs: number): boolean {
  return Date.now() - createdAt <= maxAgeMs;
}

/** Reporter acknowledgment + investigator alert for a newly filed report. */
export async function notifyReportReceived(
  reportId: string,
  locale = 'en'
): Promise<{ reporterSent: boolean; adminSent: boolean }> {
  const out = { reporterSent: false, adminSent: false };
  const convexUrl = getConvexUrl();
  if (!convexUrl || !reportId) return out;
  try {
    const client = new ConvexHttpClient(convexUrl);
    const report = await client.query(api.reports.get, { id: reportId as never });
    if (!report || !isFresh(report.createdAt, 24 * 60 * 60 * 1000)) return out;

    if (report.email && EMAIL_REGEX.test(report.email)) {
      const t = emailTemplates.reportReceived({
        title: report.title,
        category: report.category,
        location: report.location,
        reportId: String(report._id),
        locale,
      });
      out.reporterSent = (await sendEmail({ to: report.email, subject: t.subject, html: t.html })).sent;
    }

    const desk = getAdminDeskEmail();
    if (desk && desk.toLowerCase() !== (report.email ?? '').toLowerCase()) {
      const t = emailTemplates.adminNewReport({
        title: report.title,
        category: report.category,
        location: report.location,
        source: report.source ?? 'web',
        reportId: String(report._id),
        locale,
      });
      out.adminSent = (await sendEmail({ to: desk, subject: t.subject, html: t.html })).sent;
    }
  } catch (err) {
    console.error('[notify] report-received failed:', err);
  }
  return out;
}

/** Status-change update to the reporter (reads current state; no caller-supplied addresses). */
export async function notifyReportStatus(
  reportId: string,
  locale = 'en'
): Promise<{ sent: boolean }> {
  const convexUrl = getConvexUrl();
  if (!convexUrl || !reportId) return { sent: false };
  try {
    const client = new ConvexHttpClient(convexUrl);
    const report = await client.query(api.reports.get, { id: reportId as never });
    if (!report?.email || !EMAIL_REGEX.test(report.email)) return { sent: false };
    const audit = report.auditLog ?? [];
    const lastChange = [...audit].reverse().find((a) => a.action === 'status_change');
    const t = emailTemplates.reportStatusUpdate({
      title: report.title,
      fromStatus: (lastChange?.fromStatus as string) ?? report.status,
      toStatus: report.status,
      note: report.publicVerificationNote ?? undefined,
      reportId: String(report._id),
      locale,
    });
    return await sendEmail({ to: report.email, subject: t.subject, html: t.html });
  } catch (err) {
    console.error('[notify] report-status failed:', err);
    return { sent: false };
  }
}

/** Confirm a newsletter subscription (verified against Convex first). */
export async function notifySubscribe(email: string): Promise<{ sent: boolean }> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(clean)) return { sent: false };
  const convexUrl = getConvexUrl();
  if (!convexUrl) return { sent: false };
  try {
    const client = new ConvexHttpClient(convexUrl);
    const existing = await client.query(api.newsletter.getByEmail, { email: clean });
    if (!existing?.optedIn) return { sent: false };
    const t = emailTemplates.newsletterWelcome();
    return await sendEmail({ to: clean, subject: t.subject, html: t.html });
  } catch (err) {
    console.error('[notify] subscribe failed:', err);
    return { sent: false };
  }
}

/** Contact form: team notification + sender confirmation. */
export async function notifyContact(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ teamSent: boolean; confirmSent: boolean }> {
  const out = { teamSent: false, confirmSent: false };
  const name = input.name.trim().slice(0, 100);
  const email = input.email.trim().toLowerCase();
  const subject = input.subject.trim().slice(0, 140);
  const message = input.message.trim().slice(0, 4000);
  if (!name || !EMAIL_REGEX.test(email) || !message) return out;

  const desk = getAdminDeskEmail();
  if (desk) {
    const t = emailTemplates.contactTeamNotification({ name, email, subject, message });
    out.teamSent = (await sendEmail({ to: desk, subject: t.subject, html: t.html })).sent;
  }
  const c = emailTemplates.contactConfirmation(name);
  out.confirmSent = (await sendEmail({ to: email, subject: c.subject, html: c.html })).sent;
  return out;
}

/** Mchango contribution receipt (claimed atomically; exactly-once). */
export async function notifyMchangoReceipt(input: {
  paystackReference: string;
  payerEmail: string;
  amountKes: number;
  paidAt?: string;
  locale?: string;
}): Promise<{ sent: boolean }> {
  if (!EMAIL_REGEX.test(input.payerEmail)) return { sent: false };
  const convexUrl = getConvexUrl();
  if (!convexUrl) return { sent: false };
  try {
    const client = new ConvexHttpClient(convexUrl);
    const { claimed, contribution } = await client.mutation(api.contributions.claimReceiptEmail, {
      paystackReference: input.paystackReference,
    });
    if (!claimed || !contribution) return { sent: false };
    const t = emailTemplates.mchangoReceipt({
      partyName: contribution.partyName,
      amountKes: input.amountKes,
      reference: input.paystackReference,
      paidAt: input.paidAt,
      locale: input.locale ?? 'en',
    });
    return await sendEmail({ to: input.payerEmail, subject: t.subject, html: t.html });
  } catch (err) {
    console.error('[notify] mchango receipt failed:', err);
    return { sent: false };
  }
}
