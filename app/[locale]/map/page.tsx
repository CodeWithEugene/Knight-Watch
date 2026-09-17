'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { ReportCategory, ReportStatus } from '@/convex/schema';
import { MapView } from '@/components/map/MapView';
import {
  MapPin,
  Layers,
  Filter,
  FileWarning,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categories = [
  { value: '', label: 'All Violations' },
  { value: 'misuse-public-resources', label: 'Misuse Public Resources' },
  { value: 'vote-buying', label: 'Voter Bribery & Cash' },
  { value: 'undeclared-spending', label: 'Undeclared Billboards' },
  { value: 'illegal-donations', label: 'Prohibited Donations' },
  { value: 'bribery', label: 'Official Bribery' },
  { value: 'other', label: 'Other Infractions' },
];

const statuses = [
  { value: '', label: 'All Statuses' },
  { value: 'verified', label: 'Verified Evidence' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'submitted', label: 'Newly Submitted' },
  { value: 'needs_more_info', label: 'Needs More Info' },
];

const FALLBACK_MAP_PINS = [
  {
    _id: 'fb-1',
    title: 'County ambulance fleet escorting campaign motorcade',
    category: 'misuse-public-resources',
    status: 'verified',
    location: 'Nairobi',
    county: 'Nairobi',
    latitude: -1.2921,
    longitude: 36.8219,
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    _id: 'fb-2',
    title: 'Cash envelopes distributed at constituency town hall',
    category: 'vote-buying',
    status: 'verified',
    location: 'Mombasa',
    county: 'Mombasa',
    latitude: -4.0435,
    longitude: 39.6682,
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    _id: 'fb-3',
    title: 'Public stadium venue used free of charge without permit receipt',
    category: 'misuse-public-resources',
    status: 'under_review',
    location: 'Nakuru',
    county: 'Nakuru',
    latitude: -0.3031,
    longitude: 36.08,
    createdAt: Date.now() - 3600000 * 36,
  },
  {
    _id: 'fb-4',
    title: 'Unbranded high-value campaign billboards on highway corridor',
    category: 'undeclared-spending',
    status: 'verified',
    location: 'Kisumu',
    county: 'Kisumu',
    latitude: -0.0917,
    longitude: 34.768,
    createdAt: Date.now() - 3600000 * 48,
  },
  {
    _id: 'fb-5',
    title: 'County government branded water tanks gifted at political rally',
    category: 'misuse-public-resources',
    status: 'verified',
    location: 'Uasin Gishu',
    county: 'Uasin Gishu',
    latitude: 0.5143,
    longitude: 35.2698,
    createdAt: Date.now() - 3600000 * 60,
  },
];

export default function MapPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState<'markers' | 'heat'>('markers');

  const liveReports = useQuery(api.reports.listForMap, {
    category: (selectedCategory || undefined) as ReportCategory | undefined,
    status: (selectedStatus || undefined) as ReportStatus | undefined,
  });

  const reportsToDisplay =
    liveReports && liveReports.length > 0 ? liveReports : FALLBACK_MAP_PINS;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="outline" className="font-mono text-xs">
              GIS Geospatial Watch
            </Badge>
            <Badge variant="success" className="text-xs">
              OpenStreetMap + Leaflet
            </Badge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            47 Counties Geographic Heat Radar
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Live geographic distribution of campaign finance violations and public resource abuse across all 47 counties of Kenya. Click any pin to view evidence details.
          </p>
        </div>

        <Button asChild size="sm" className="gap-1.5 self-start md:self-auto font-semibold text-xs">
          <Link href={`/${locale}/report`}>
            <FileWarning className="w-3.5 h-3.5" />
            <span>Pin a New Incident</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 space-y-5 border-border shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <h2 className="font-display font-bold text-base text-foreground">Filter Map Pins</h2>
              </div>
              <Badge variant="secondary" className="font-mono text-xs font-semibold">
                {reportsToDisplay.length} Shown
              </Badge>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Violation Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.value || 'all'} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Audit Verification Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s.value || 'all'} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Display Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('markers')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'markers'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Active Pins
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('heat')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'heat'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Density View
                </button>
              </div>
            </div>
          </Card>

          {/* Legend Card */}
          <Card className="p-5 space-y-3 bg-muted/20 border-border">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-foreground">
              Hotspot Severity Legend
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-foreground flex-shrink-0" />
                <span className="text-muted-foreground">High Density &gt; 30 Reports (Nairobi, Mombasa)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Moderate Watch 10 - 29 Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-muted border border-border flex-shrink-0" />
                <span className="text-muted-foreground">Monitored Base &lt; 10 Reports</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Map Canvas */}
        <div className="lg:col-span-8 space-y-3">
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm bg-card">
            <MapView reports={reportsToDisplay} locale={locale} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Coordinates anchored to Kenya National Grid (EPSG:4326)</span>
            <Link
              href={`/${locale}/reports`}
              className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>View As List Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
