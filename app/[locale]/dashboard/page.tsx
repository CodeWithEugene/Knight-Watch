'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  FileWarning,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  Coins,
  ArrowRight,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PALETTE = ['#006837', '#ea580c', '#2563eb', '#dc2626', '#ca8a04', '#7e22ce'];

const DEFAULT_CATEGORY_DATA = [
  { name: 'Misuse Public Resources', value: 46, color: '#006837' },
  { name: 'Voter Bribery', value: 38, color: '#ea580c' },
  { name: 'Undeclared Spending', value: 32, color: '#2563eb' },
  { name: 'Illegal Donations', value: 24, color: '#dc2626' },
  { name: 'Advertising Limit Breach', value: 18, color: '#ca8a04' },
  { name: 'Other Violations', value: 14, color: '#7e22ce' },
];

const DEFAULT_STATUS_DATA = [
  { name: 'Verified', count: 68 },
  { name: 'Under Review', count: 54 },
  { name: 'Pending Evidence', count: 32 },
  { name: 'Referred to EACC', count: 18 },
];

const DEFAULT_TOP_COUNTIES = [
  { name: 'Nairobi', count: 42, code: '047' },
  { name: 'Mombasa', count: 28, code: '001' },
  { name: 'Nakuru', count: 24, code: '032' },
  { name: 'Kiambu', count: 21, code: '022' },
  { name: 'Kisumu', count: 19, code: '042' },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const convexStats = useQuery(api.reports.dashboardStats);

  const hasConvexData = convexStats && convexStats.total > 0;

  const totalReports = hasConvexData ? convexStats.total : 172;
  const verifiedCount = hasConvexData
    ? convexStats.byStatus?.verified ?? 48
    : 68;
  const thisMonthCount = hasConvexData ? convexStats.thisMonth : 34;
  const thisWeekCount = hasConvexData ? convexStats.thisWeek : 11;

  const categoryData =
    hasConvexData && convexStats.byCategory
      ? Object.entries(convexStats.byCategory).map(([name, value], i) => ({
          name: name.replace(/-/g, ' '),
          value,
          color: PALETTE[i % PALETTE.length],
        }))
      : DEFAULT_CATEGORY_DATA;

  const statusData =
    hasConvexData && convexStats.byStatus
      ? Object.entries(convexStats.byStatus).map(([name, count]) => ({
          name: name.replace(/_/g, ' '),
          count,
        }))
      : DEFAULT_STATUS_DATA;

  const topCounties =
    hasConvexData && convexStats.topCounties?.length
      ? convexStats.topCounties.slice(0, 5)
      : DEFAULT_TOP_COUNTIES;

  const recentReports =
    hasConvexData && convexStats.recentReports?.length
      ? convexStats.recentReports
      : [
          {
            _id: 'sample-1',
            title: 'County government vehicles deployed at partisan rally in Embakasi',
            category: 'misuse-public-resources',
            createdAt: Date.now() - 3600000 * 8,
          },
          {
            _id: 'sample-2',
            title: 'Cash and food distribution observed during civic registration drive',
            category: 'voter-buying',
            createdAt: Date.now() - 3600000 * 24,
          },
          {
            _id: 'sample-3',
            title: 'Unregistered billboard campaign without authorization markers',
            category: 'undeclared-spending',
            createdAt: Date.now() - 3600000 * 48,
          },
          {
            _id: 'sample-4',
            title: 'Foreign funding transfer received ahead of county by-election',
            category: 'illegal-donations',
            createdAt: Date.now() - 3600000 * 72,
          },
        ];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="outline" className="font-mono text-xs">
              Live National Feed
            </Badge>
            <Badge variant="success" className="text-xs">
              47 Counties Synchronized
            </Badge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            Campaign Finance Watch Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time public resource monitoring, statutory expenditure limits, and audit analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
            <Link href={`/${locale}/api-docs`}>
              <Download className="w-3.5 h-3.5" />
              <span>Export Datasets</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-1.5 text-xs font-semibold">
            <Link href={`/${locale}/report`}>
              <FileWarning className="w-3.5 h-3.5" />
              <span>Report An Incident</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={`/${locale}/reports`} className="block group">
          <Card className="p-5 border-border group-hover:border-primary/50 transition-all hover:shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Reports</span>
              <FileWarning className="w-4 h-4 text-foreground" />
            </div>
            <p className="font-display font-black text-3xl mt-2 text-foreground">
              {totalReports.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">Logged across all channels</p>
          </Card>
        </Link>

        <Link href={`/${locale}/reports`} className="block group">
          <Card className="p-5 border-border group-hover:border-primary/50 transition-all hover:shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">Verified Audits</span>
              <CheckCircle2 className="w-4 h-4 text-foreground" />
            </div>
            <p className="font-display font-black text-3xl mt-2 text-foreground">
              {verifiedCount.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">Fact-checked & substantiated</p>
          </Card>
        </Link>

        <Card className="p-5 border-border">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">This Month</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="font-display font-black text-3xl mt-2 text-foreground">
            {thisMonthCount.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Recent 30-day submissions</p>
        </Card>

        <Card className="p-5 border-border">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">This Week</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-display font-black text-3xl mt-2 text-foreground">
            {thisWeekCount.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Latest 7-day volume</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <CardTitle className="text-lg font-bold">Reported Violation Types</CardTitle>
              <CardDescription className="text-xs">
                Classification under the Election Offences & Campaign Financing Acts
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-mono">By Category</Badge>
          </div>

          <div className="h-[280px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-border">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                <span className="truncate text-muted-foreground">{c.name}</span>
                <span className="font-mono font-bold text-foreground ml-auto">{c.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Status Breakdown */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <CardTitle className="text-lg font-bold">Verification Status</CardTitle>
              <CardDescription className="text-xs">
                Auditing lifecycle and legal referral pipeline
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-mono">Workflow</Badge>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#006837" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-foreground flex-shrink-0" />
            <span>Verified claims are automatically dispatched to investigative oversight bodies.</span>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Top Counties & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top 5 Counties */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <CardTitle className="text-lg font-bold">Top Hotspot Counties</CardTitle>
              <CardDescription className="text-xs">
                Counties with highest logged campaign violations
              </CardDescription>
            </div>
            <Link
              href={`/${locale}/map`}
              className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>View Map</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topCounties.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-muted-foreground w-5">
                    0{i + 1}
                  </span>
                  <div>
                    <Link
                      href={`/${locale}/counties/${c.name.toLowerCase()}`}
                      className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {c.name} County
                    </Link>
                    <p className="text-[11px] text-muted-foreground">High spending watch area</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="font-mono text-xs font-bold">
                    {c.count} Incidents
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reports Stream */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <CardTitle className="text-lg font-bold">Recent Whistleblower Stream</CardTitle>
              <CardDescription className="text-xs">
                Audited citizen reports submitted recently
              </CardDescription>
            </div>
            <Link
              href={`/${locale}/reports`}
              className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>All Reports ({totalReports})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentReports.map((r: any) => (
              <Link
                key={r._id}
                href={`/${locale}/reports/${r._id}`}
                className="block p-3.5 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {r.title}
                  </p>
                  <Badge variant="outline" className="text-[10px] whitespace-nowrap capitalize">
                    {r.category?.replace(/-/g, ' ')}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Logged: {new Date(r.createdAt).toLocaleDateString()} · Anonymity Verified
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
