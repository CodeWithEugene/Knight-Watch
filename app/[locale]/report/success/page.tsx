'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, ShieldCheck, ArrowRight, FileText, Search, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function ReportSuccessContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const reportId = searchParams.get('id') || 'KW-' + Math.floor(100000 + Math.random() * 900000);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(reportId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 lg:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Main Status Container */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-muted text-foreground flex items-center justify-center mx-auto shadow-sm ring-8 ring-muted/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Report Lodged Successfully
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you for standing up for Kenyan electoral integrity. Your report has been cryptographically sealed and queued for independent verification.
          </p>
        </div>

        {/* Cryptographic Receipt Card */}
        <Card className="shadow-md border-border/80 overflow-hidden mb-8">
          <div className="bg-muted/60 px-6 py-3 border-b flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground uppercase tracking-wider">
              Verification Receipt
            </span>
            <Badge variant="outline" className="bg-background text-[11px] font-mono">
              STATUS: QUEUED
            </Badge>
          </div>

          <CardContent className="p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-muted/40 rounded-lg border border-border/60">
              <div>
                <span className="text-xs text-muted-foreground block">Reference ID</span>
                <span className="text-lg font-mono font-bold text-foreground tracking-tight">
                  {reportId}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyId}
                className="gap-1.5 text-xs font-semibold shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-foreground" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Reference'}
              </Button>
            </div>

            {/* Lifecycle Timeline */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                What happens next
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">AI Triage & Sanity Verification</span>
                    <p className="text-muted-foreground mt-0.5">Duplicate submissions and malicious noise are filtered out automatically.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-muted font-bold text-muted-foreground flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-border">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Civil Society Legal Review</span>
                    <p className="text-muted-foreground mt-0.5">Partner legal observers evaluate evidence against Election Offences Act thresholds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-muted font-bold text-muted-foreground flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-border">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Public Ledger Publication & EACC Referral</span>
                    <p className="text-muted-foreground mt-0.5">Verified dossiers are published to the live feed and dispatched to statutory bodies.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy note */}
            <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
              <span>
                Your identity remains protected. We never track your personal credentials without explicit consent.
              </span>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/20 px-6 py-4 border-t flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/reports`} className="w-full sm:flex-1">
              <Button variant="outline" className="w-full gap-2 text-xs font-semibold">
                <Search className="w-3.5 h-3.5" /> View Incident Feed
              </Button>
            </Link>
            <Link href={`/${locale}/report`} className="w-full sm:flex-1">
              <Button className="w-full gap-2 text-xs font-semibold">
                Submit Another <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}

export default function ReportSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm font-medium">Loading receipt...</div>
      </div>
    }>
      <ReportSuccessContent />
    </Suspense>
  );
}
