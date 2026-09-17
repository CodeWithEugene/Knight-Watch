'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

const statuses = [
  { id: '', label: 'All Statuses' },
  { id: 'submitted', label: 'New Submissions' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'verified', label: 'Verified & Published' },
  { id: 'unverified', label: 'Unverified / Discredited' },
  { id: 'needs_more_info', label: 'Needs More Info' },
] as const;

export default function AdminReportsListPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  const convexReports = useQuery(
    api.reports.list,
    statusFilter ? { status: statusFilter as any } : {}
  );

  const fallbackReports = [
    {
      _id: 'rep-1',
      title: 'State vehicles deployed at gubernatorial campaign rally',
      category: 'misuse-of-public-resources',
      county: 'Uasin Gishu',
      location: 'Eldoret Sports Club Grounds',
      status: 'verified',
      assignedTo: 'eugene@knightwatch.ke',
      createdAt: Date.now() - 3600000 * 4,
    },
    {
      _id: 'rep-2',
      title: 'Uncapped cash handouts distributed inside polling precinct',
      category: 'vote-buying',
      county: 'Nairobi',
      location: 'Embakasi Central Sub-county',
      status: 'under_review',
      assignedTo: 'triage-officer@tikenya.org',
      createdAt: Date.now() - 3600000 * 12,
    },
    {
      _id: 'rep-3',
      title: 'Undisclosed corporate donation exceeding legal threshold',
      category: 'illegal-donations',
      county: 'Mombasa',
      location: 'Nyali Constituency',
      status: 'verified',
      assignedTo: 'legal@knightwatch.ke',
      createdAt: Date.now() - 3600000 * 24,
    },
    {
      _id: 'rep-4',
      title: 'County sound truck equipment branded with party symbols',
      category: 'misuse-of-public-resources',
      county: 'Nakuru',
      location: 'Naivasha Town',
      status: 'under_review',
      assignedTo: null,
      createdAt: Date.now() - 3600000 * 48,
    },
    {
      _id: 'rep-5',
      title: 'Anonymous cash transfer to local party campaign committee',
      category: 'illegal-donations',
      county: 'Kisumu',
      location: 'Kondele Ward',
      status: 'submitted',
      assignedTo: null,
      createdAt: Date.now() - 3600000 * 72,
    },
  ];

  const rawReports = convexReports || fallbackReports;

  const filtered = rawReports.filter((r: any) => {
    const matchesStatus = !statusFilter || r.status === statusFilter;
    const matchesSearch = !search || 
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.county && r.county.toLowerCase().includes(search.toLowerCase())) ||
      (r.location && r.location.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-display tracking-tight text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Verification Queue
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit evidence submissions, attach legal verification notes, and assign review status.
          </p>
        </div>

        <Link href={`/${locale}/admin`}>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by title or county..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs bg-card"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {statuses.map((s) => (
            <Button
              key={s.id}
              variant={statusFilter === s.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s.id)}
              className="text-xs h-8"
            >
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reports List Card */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No reports match the selected criteria.
              </div>
            ) : (
              filtered.map((r: any) => (
                <div key={r._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge 
                        variant={
                          r.status === 'verified' ? 'default' : 
                          r.status === 'under_review' ? 'secondary' : 
                          r.status === 'unverified' ? 'destructive' : 'outline'
                        }
                        className="text-[10px] capitalize font-mono"
                      >
                        {r.status?.replace(/_/g, ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {r.category?.replace(/-/g, ' ')}
                      </Badge>
                      {r.assignedTo && (
                        <span className="text-[11px] text-muted-foreground font-mono">
                          Assigned: {r.assignedTo}
                        </span>
                      )}
                    </div>

                    <Link href={`/${locale}/admin/reports/${r._id}`} className="block">
                      <h2 className="font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-muted-foreground">
                      {r.county || r.location} • Submitted {new Date(r.createdAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/${locale}/admin/reports/${r._id}`}>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs font-semibold h-8">
                        Audit File <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
