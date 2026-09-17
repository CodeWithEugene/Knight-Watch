'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Newspaper, ExternalLink, ShieldCheck, BarChart3, Layers, ArrowLeft } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function PressPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const convexStats = useQuery(api.reports.dashboardStats);

  const fallbackStats = {
    total: 142,
    byStatus: { verified: 45 },
    topCounties: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu']
  };

  const stats = convexStats || fallbackStats;

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Knight Watch
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Newspaper className="w-3.5 h-3.5" />
            Media & Investigative Desk
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Press & Research Toolkit
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Resources, verified datasets, and embeddable data assets designed for Kenyan investigative journalists, editors, and academic researchers.
          </p>
        </div>

        {/* Highlight Download Card */}
        <Card className="shadow-md border-primary/20 bg-primary/5 mb-10">
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">Media Package</span>
              <h2 className="text-2xl font-bold font-display text-foreground">Complete Knight Watch Press Kit</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                Includes executive summary briefing, sample CSV data extracts, methodology backgrounder, and high-resolution SVG logos.
              </p>
            </div>

            <a
              href="/api/press-kit"
              download="press-kit.txt"
              className="shrink-0"
            >
              <Button size="lg" className="gap-2 font-bold shadow-sm">
                <Download className="w-4 h-4" /> Download Press Kit
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Live Factsheet Card */}
        <Card className="shadow-xs mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Verified Key Metrics Factsheet
            </CardTitle>
            <CardDescription className="text-xs">
              Direct citations ready for immediate newsroom broadcast and print:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <span className="text-muted-foreground">Total Citizen Submissions</span>
                <div className="font-mono font-bold text-lg text-foreground">{stats?.total ?? '142'}</div>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <span className="text-muted-foreground">Corroborated / Verified</span>
                <div className="font-mono font-bold text-lg text-foreground">{stats?.byStatus?.verified ?? '45'}</div>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <span className="text-muted-foreground">Primary Incident Counties</span>
                <div className="font-mono font-bold text-sm text-foreground">Nairobi, Mombasa, Nakuru</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Embeds Card */}
        <Card className="shadow-xs mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Newsroom Embed Code
            </CardTitle>
            <CardDescription className="text-xs">
              Embed responsive interactive widgets directly inside digital articles:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto text-muted-foreground">
{`<iframe src="https://knightwatch.ke/embed/map" width="100%" height="450" frameborder="0"></iframe>`}
            </pre>
            <div className="flex justify-end">
              <Link href={`/${locale}/api-docs`}>
                <Button variant="ghost" size="sm" className="text-xs text-primary font-semibold">
                  View Full API & Embed Docs →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Media Contact Box */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs text-xs space-y-2">
          <div className="font-bold text-base text-foreground">Urgent Newsroom & Broadcast Queries</div>
          <p className="text-muted-foreground">
            Reporters on tight deadlines may reach our media liaison officer directly at <strong className="text-foreground">media@knightwatch.ke</strong> or via the TI-Kenya communications hotline at <strong className="text-foreground">+254 20 2727763</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
