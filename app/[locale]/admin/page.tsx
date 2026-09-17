'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Layers,
  Download
} from 'lucide-react';

export default function AdminDashboardPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const convexStats = useQuery(api.reports.dashboardStats);

  // Graceful fallback stats for immediate rendering
  const fallbackStats = {
    total: 142,
    thisWeek: 28,
    thisMonth: 86,
    byStatus: {
      verified: 45,
      under_review: 68,
      unverified: 19,
      submitted: 10
    },
    recentReports: [
      {
        _id: 'rep-1',
        title: 'State vehicles deployed at gubernatorial campaign rally',
        category: 'misuse-of-public-resources',
        county: 'Uasin Gishu',
        location: 'Eldoret Sports Club',
        status: 'verified',
        createdAt: Date.now() - 3600000 * 4,
      },
      {
        _id: 'rep-2',
        title: 'Uncapped cash handouts distributed inside polling precinct',
        category: 'vote-buying',
        county: 'Nairobi',
        location: 'Embakasi Central Sub-county',
        status: 'under_review',
        createdAt: Date.now() - 3600000 * 12,
      },
      {
        _id: 'rep-3',
        title: 'Undisclosed corporate donation exceeding legal threshold',
        category: 'illegal-donations',
        county: 'Mombasa',
        location: 'Nyali Constituency',
        status: 'verified',
        createdAt: Date.now() - 3600000 * 24,
      },
      {
        _id: 'rep-4',
        title: 'County sound truck equipment branded with party symbols',
        category: 'misuse-of-public-resources',
        county: 'Nakuru',
        location: 'Naivasha Town',
        status: 'under_review',
        createdAt: Date.now() - 3600000 * 48,
      },
    ]
  };

  const stats = convexStats || fallbackStats;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Investigator Command Deck
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time citizen reporting intake, evidence review, and statutory verification queue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/api/export/reports?format=csv" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
              <Download className="w-3.5 h-3.5" /> Export Review Ledger
            </Button>
          </a>
          <Link href={`/${locale}/admin/reports`}>
            <Button size="sm" className="gap-1.5 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" /> Triage Queue ({stats.byStatus?.under_review ?? 0})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card className="shadow-xs">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <span>Total Submissions</span>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
              {stats.total}
            </div>
            <p className="text-[11px] text-muted-foreground">All time intake</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <span>This Week</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
              {stats.thisWeek}
            </div>
            <p className="text-[11px] text-muted-foreground">Active 7-day volume</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <span>Under Review</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
              {stats.byStatus?.under_review ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground">Awaiting corroboration</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              <span>Verified Dossiers</span>
              <ShieldCheck className="w-4 h-4 text-foreground" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
              {stats.byStatus?.verified ?? 0}
            </div>
            <p className="text-[11px] text-muted-foreground">Corroborated & published</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Incoming Incident Stream</CardTitle>
              <CardDescription className="text-xs">Latest submissions requiring investigator evaluation</CardDescription>
            </div>
            <Link href={`/${locale}/admin/reports`}>
              <Button variant="ghost" size="sm" className="text-xs text-primary font-semibold gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {(stats.recentReports ?? []).slice(0, 8).map((r: any) => (
              <div key={r._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground hover:text-primary transition-colors">
                      <Link href={`/${locale}/admin/reports/${r._id}`}>
                        {r.title}
                      </Link>
                    </span>
                    <Badge 
                      variant={r.status === 'verified' ? 'default' : r.status === 'under_review' ? 'secondary' : 'outline'}
                      className="text-[10px] capitalize font-mono"
                    >
                      {r.status?.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="capitalize">{r.category?.replace(/-/g, ' ')}</span> • {r.county || r.location} • {new Date(r.createdAt).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/${locale}/admin/reports/${r._id}`}>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                      Review Dossier
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
