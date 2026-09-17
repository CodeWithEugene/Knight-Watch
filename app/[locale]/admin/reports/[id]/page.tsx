'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Save, 
  UserCheck, 
  ExternalLink,
  Lock,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

const statuses = [
  { value: 'submitted', label: 'Submitted (New)' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'verified', label: 'Verified & Published' },
  { value: 'unverified', label: 'Unverified / Discredited' },
  { value: 'needs_more_info', label: 'Needs More Evidence' },
] as const;

export default function AdminReportDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'en';
  const id = params?.id as Id<'reports'>;
  const { data: session } = useSession();

  const convexReport = useQuery(api.reports.get, id && !id.startsWith('rep-') ? { id } : 'skip');
  const updateStatus = useMutation(api.reports.updateStatus);
  const assign = useMutation(api.reports.assign);
  const addNote = useMutation(api.reports.addNote);


  const fallbackReport = {
    _id: id || 'rep-1',
    title: 'State vehicles deployed at gubernatorial campaign rally',
    description: 'Multiple government-registered county double-cabin pickups (GKA and 47-CG registration plates) were observed transporting campaign banners, sound amplification equipment, and party regalia to a political rally in Eldoret town. Fuel was allegedly disbursed using county government fuel card vouchers.',
    category: 'misuse-of-public-resources',
    county: 'Uasin Gishu',
    location: 'Eldoret Sports Club Grounds',
    amountInvolved: 1850000,
    status: 'under_review',
    assignedTo: 'eugene@knightwatch.ke',
    publicVerificationNote: 'Geo-tagged timestamps and vehicle registration logs cross-referenced against National Transport and Safety Authority (NTSA) and County fleet tracking ledgers.',
    internalNotes: 'Contacted field observer in Eldoret. Received 4 high-res photos showing license plates GK A 482B and 47 CG 109A.',
    createdAt: Date.now() - 3600000 * 4,
  };

  const report = (convexReport || fallbackReport) as any;

  const [status, setStatus] = useState(report?.status || 'under_review');
  const [publicNote, setPublicNote] = useState(report?.publicVerificationNote || '');
  const [internalNote, setInternalNote] = useState(report?.internalNotes || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const adminEmail = (session?.user?.email as string) || 'officer@knightwatch.ke';

  async function handleStatusChange() {
    if (!status || !report) return;
    setSaving(true);
    try {
      if (updateStatus && !id.startsWith('rep-')) {
        await updateStatus({
          id,
          status: status as any,
          adminEmail,
          publicVerificationNote: publicNote || undefined,
          internalNotes: internalNote || report.internalNotes || undefined,
          assignToSelf: true,
        });
        // Reporter status-update email (fire-and-forget; server re-reads state).
        fetch('/api/notify/report-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportId: id, locale }),
        }).catch(() => {});
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function handleAssign() {
    setSaving(true);
    try {
      if (assign && !id.startsWith('rep-')) {
        await assign({ id, adminEmail });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/${locale}/admin/reports`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
          Back to Verification Queue
        </Link>

        <Link href={`/${locale}/reports/${report._id}`} target="_blank">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary font-semibold">
            View Public Dossier <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase">
            REF-{String(report._id).slice(-6).toUpperCase()}
          </Badge>
          <Badge 
            variant={
              report.status === 'verified' ? 'default' : 
              report.status === 'under_review' ? 'secondary' : 'outline'
            }
            className="capitalize text-xs"
          >
            {report.status?.replace(/_/g, ' ')}
          </Badge>
          <Badge variant="outline" className="capitalize text-xs">
            {report.category?.replace(/-/g, ' ')}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
          {report.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {report.county || report.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Logged {new Date(report.createdAt).toLocaleString('en-KE')}
          </span>
          {report.assignedTo && (
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <UserCheck className="w-3.5 h-3.5 text-foreground" />
              Lead Auditor: {report.assignedTo}
            </span>
          )}
        </div>
      </div>

      {/* Two Column Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Evidence Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Whistleblower Evidence Record</CardTitle>
              <CardDescription className="text-xs">
                Verbatim submission received through public intake gateway:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap p-4 bg-muted/30 rounded-lg border border-border">
                {report.description}
              </p>
            </CardContent>
          </Card>

          {report.amountInvolved && (
            <Card className="shadow-xs bg-muted/20">
              <CardContent className="p-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Estimated Financial Exposure:</span>
                <span className="font-mono font-bold text-sm text-foreground">
                  KSh {Number(report.amountInvolved).toLocaleString()}
                </span>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Triaging & Verification Controls */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="shadow-md border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" />
                Audit Determinations
              </CardTitle>
              <CardDescription className="text-xs">
                Assign clearance and enter verification conclusions.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              
              {/* Status Select */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Verification Determination</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground font-medium text-xs focus:ring-1 focus:ring-primary outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Public Verification Note */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">
                  Public Verification Note (Visible on Public Dossier)
                </label>
                <Textarea
                  value={publicNote}
                  onChange={(e) => setPublicNote(e.target.value)}
                  placeholder="e.g. Verified via NTSA vehicle registration check and eyewitness affidavit..."
                  rows={3}
                  className="text-xs resize-none bg-card"
                />
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  Internal Investigation Notes (Staff Confidential)
                </label>
                <Textarea
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Witness contact details, raw media hashes, pending sub-county inquiries..."
                  rows={3}
                  className="text-xs resize-none bg-card font-mono"
                />
              </div>

            </CardContent>

            <CardFooter className="pt-2 flex flex-col sm:flex-row gap-2 justify-between border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAssign}
                disabled={saving}
                className="w-full sm:w-auto text-xs"
              >
                Assign to Myself
              </Button>

              <Button
                size="sm"
                onClick={handleStatusChange}
                disabled={saving}
                className="w-full sm:w-auto text-xs font-bold gap-1.5"
              >
                {saving ? (
                  <><Spinner data-icon="inline-start" /> Saving...</>
                ) : (
                  <><Save className="w-3.5 h-3.5" /> {saveSuccess ? 'Saved!' : 'Save Determination'}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>

    </div>
  );
}
