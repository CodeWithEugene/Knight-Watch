'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  FileWarning,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerificationBadge } from '@/components/shared/VerificationBadge';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'misuse-public-resources', label: 'Misuse of Public Resources' },
  { value: 'vote-buying', label: 'Voter Bribery & Handouts' },
  { value: 'undeclared-spending', label: 'Undeclared Campaign Spending' },
  { value: 'illegal-donations', label: 'Prohibited / Foreign Donations' },
  { value: 'bribery', label: 'Bribery of Officials' },
  { value: 'other', label: 'Other Violations' },
];

const FALLBACK_REPORTS = [
  {
    _id: 'fb-rpt-1',
    title: 'County government vehicles & ambulances ferrying supporters to political rally',
    description: 'Multiple government-registered GK vehicles spotted transporting party supporters to a private campaign rally in Embakasi with official fuel vouchers.',
    category: 'misuse-public-resources',
    location: 'Nairobi',
    county: 'Nairobi',
    status: 'verified',
    source: 'web',
    createdAt: Date.now() - 3600000 * 6,
  },
  {
    _id: 'fb-rpt-2',
    title: 'Envelopes with KES 1,000 distributed during civic voter sensitization drive',
    description: 'Party agents observed distributing cash envelopes directly to attendees exiting the community hall before voter registration.',
    category: 'vote-buying',
    location: 'Mombasa Central',
    county: 'Mombasa',
    status: 'verified',
    source: 'ussd',
    createdAt: Date.now() - 3600000 * 18,
  },
  {
    _id: 'fb-rpt-3',
    title: 'Multi-million shilling digital LED billboard blitz without statutory IEBC authorization',
    description: 'High-density digital billboards displaying candidate endorsement without required campaign account disclosure markers.',
    category: 'undeclared-spending',
    location: 'Nakuru Town West',
    county: 'Nakuru',
    status: 'under_review',
    source: 'web',
    createdAt: Date.now() - 3600000 * 32,
  },
  {
    _id: 'fb-rpt-4',
    title: 'Public stadium reserved for private political convention without county fee payment',
    description: 'Official county sports complex cordoned off for four days for party primaries with waived venue fees.',
    category: 'misuse-public-resources',
    location: 'Kisumu Central',
    county: 'Kisumu',
    status: 'verified',
    source: 'sms',
    createdAt: Date.now() - 3600000 * 46,
  },
  {
    _id: 'fb-rpt-5',
    title: 'Foreign foundation grant diverted into parliamentary candidate logistics',
    description: 'Civic governance grant funding rerouted to print partisan branded campaign t-shirts and logistics hire.',
    category: 'illegal-donations',
    location: 'Eldoret, Uasin Gishu',
    county: 'Uasin Gishu',
    status: 'under_review',
    source: 'web',
    createdAt: Date.now() - 3600000 * 64,
  },
  {
    _id: 'fb-rpt-6',
    title: 'Security officers assigned to escort partisan candidate private convoy',
    description: 'Sub-county police vehicles deployed on private candidate motorcade without formal gazetted security entitlement.',
    category: 'bribery',
    location: 'Machakos Town',
    county: 'Machakos',
    status: 'under_review',
    source: 'ussd',
    createdAt: Date.now() - 3600000 * 80,
  },
];

export default function ReportsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const convexReports = useQuery(
    api.reports.list,
    category
      ? {
          category: category as
            | 'vote-buying'
            | 'illegal-donations'
            | 'misuse-public-resources'
            | 'undeclared-spending'
            | 'bribery'
            | 'other',
        }
      : {}
  );

  const rawReports =
    convexReports && convexReports.length > 0 ? convexReports : FALLBACK_REPORTS;

  const filteredReports = rawReports.filter((r) => {
    const matchesCat = !category || r.category === category;
    const matchesQuery =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.location && r.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.county && r.county.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const exportUrl = () => {
    const params = new URLSearchParams({ format: 'csv' });
    if (category) params.set('category', category);
    return `/api/export/reports?${params.toString()}`;
  };

  const displayStatus = (s: string) =>
    s === 'verified' ? 'verified' : s === 'under_review' ? 'under_review' : 'unverified';

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="outline" className="font-mono text-xs">
              Public Whistleblower Feed
            </Badge>
            <Badge variant="success" className="text-xs">
              Cryptographically Timestamped
            </Badge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            Public Incident Reports Feed
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review citizen-submitted evidence of electoral funding irregularities, voter bribery, and state asset diversion across Kenya.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
            <a href={exportUrl()} download aria-label="Export CSV">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>
          </Button>

          <Button asChild size="sm" className="gap-1.5 text-xs font-semibold">
            <Link href={`/${locale}/report`}>
              <FileWarning className="w-3.5 h-3.5" />
              <span>File New Incident</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports by keyword, county, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 text-sm bg-card"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-input bg-card text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            {categoryOptions.map((o) => (
              <option key={o.value || 'all'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Feed — 4 cards per row on wide screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {filteredReports.map((r: any) => (
          <Link key={r._id} href={`/${locale}/reports/${r._id}`} className="block group h-full">
            <Card className="p-5 h-full flex flex-col border-border hover:border-primary/50 transition-all hover:shadow-md">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[11px] font-mono capitalize">
                    {r.category.replace(/-/g, ' ')}
                  </Badge>
                  {r.source && (
                    <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                      Via {r.source}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{r.county || r.location}</span>
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <h2 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-3">
                  {r.title}
                </h2>

                {r.description && (
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                    {r.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 mt-auto">
                  <VerificationBadge status={displayStatus(r.status)} />
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {filteredReports.length === 0 && (
          <div className="col-span-full text-center py-16 border border-dashed rounded-xl space-y-3">
            <p className="text-muted-foreground text-sm">No campaign reports match your filters.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCategory('');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
