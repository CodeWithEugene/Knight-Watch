'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Coins, 
  AlertTriangle, 
  Calendar, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight,
  Download
} from 'lucide-react';

const ppfTrendData = [
  { year: '2015/16', gross: 142, uda: 0, odm: 55, jubilee: 0, other: 87, note: 'Pre-2017 cycle' },
  { year: '2016/17', gross: 158, uda: 0, odm: 62, jubilee: 0, other: 96, note: 'Election year' },
  { year: '2017/18', gross: 280, uda: 0, odm: 112, jubilee: 148, other: 20, note: 'Post-2017 split' },
  { year: '2018/19', gross: 295, uda: 0, odm: 118, jubilee: 157, other: 20, note: 'Handshake era' },
  { year: '2019/20', gross: 310, uda: 0, odm: 124, jubilee: 165, other: 21, note: 'Constitutional review' },
  { year: '2020/21', gross: 320, uda: 0, odm: 128, jubilee: 170, other: 22, note: 'COVID adjustments' },
  { year: '2021/22', gross: 335, uda: 0, odm: 134, jubilee: 178, other: 23, note: 'Pre-2022 election' },
  { year: '2022/23', gross: 520, uda: 245, odm: 150, jubilee: 65, other: 60, note: 'New administration' },
  { year: '2023/24', gross: 780, uda: 345, odm: 184, jubilee: 81, other: 170, note: 'Expanded PPF pool' },
  { year: '2024/25', gross: 910, uda: 410, odm: 215, jubilee: 95, other: 190, note: 'Current FY estimate' },
];

const incidentMonthlyData = [
  { month: 'Jan', reports: 42, verified: 28 },
  { month: 'Feb', reports: 38, verified: 26 },
  { month: 'Mar', reports: 55, verified: 37 },
  { month: 'Apr', reports: 68, verified: 44 },
  { month: 'May', reports: 92, verified: 65 },
  { month: 'Jun', reports: 145, verified: 104 },
  { month: 'Jul', reports: 280, verified: 215 },
  { month: 'Aug (Election)', reports: 590, verified: 480 },
  { month: 'Sep', reports: 210, verified: 160 },
  { month: 'Oct', reports: 95, verified: 72 },
  { month: 'Nov', reports: 62, verified: 45 },
  { month: 'Dec', reports: 48, verified: 34 },
];

const violationCategories = [
  { name: 'Public Asset Misuse', count: 485, share: '36%' },
  { name: 'Voter Bribery & Inducement', count: 370, share: '27%' },
  { name: 'Dark / Foreign Donations', count: 215, share: '16%' },
  { name: 'Undeclared Billboards & Choppers', count: 180, share: '13%' },
  { name: 'Official Harassment', count: 110, share: '8%' },
];

export default function TrendsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <TrendingUp className="w-3.5 h-3.5" />
              Longitudinal Civic Finance Analysis
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-foreground">
              Historical Finance & Incident Trends
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Track 10-year disbursements from the Political Parties Fund, correlate campaign expenditure spikes with general election cycles, and monitor civic reporting volume.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="/api/export/reports?format=csv" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                <Download className="w-3.5 h-3.5" /> Export Data Series
              </Button>
            </a>
          </div>
        </div>

        {/* Highlight KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-2">
              <span className="text-xs text-muted-foreground uppercase font-semibold">10-Yr Total PPF</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                KSh 3.97B
              </div>
              <p className="text-[11px] text-muted-foreground">Disbursed to qualifying parties</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-2">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Election Surge Factor</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
                12.3x
              </div>
              <p className="text-[11px] text-muted-foreground">August reporting spike vs baseline</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-2">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Leading Misuse</span>
              <div className="text-xl sm:text-2xl font-black text-foreground truncate">
                State Vehicles
              </div>
              <p className="text-[11px] text-muted-foreground">36% of all verified reports</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-2">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Avg Investigation Time</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                72 hrs
              </div>
              <p className="text-[11px] text-muted-foreground">From intake to verified status</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interactive Trend Visualizations */}
        <Tabs defaultValue="ppf" className="space-y-8 mb-12">
          <TabsList className="bg-muted p-1 rounded-xl">
            <TabsTrigger value="ppf" className="gap-2 text-xs font-semibold">
              <Coins className="w-3.5 h-3.5" /> Political Parties Fund (10-Yr)
            </TabsTrigger>
            <TabsTrigger value="incidents" className="gap-2 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" /> Election Incident Spikes
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5" /> Violation Categories
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: PPF Historical Trend */}
          <TabsContent value="ppf" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg font-bold">Gross Political Parties Fund Allocations (2015 - 2025)</CardTitle>
                    <CardDescription>Values represented in Millions of Kenya Shillings (KSh M)</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">National Treasury Ledgers</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ppfTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <defs>
                        <linearGradient id="ppfColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickLine={false}
                        unit="M"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))',
                          fontSize: '12px',
                        }}
                        formatter={(val: any) => [`KSh ${val} Million`, 'Gross Allocation']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gross" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#ppfColor)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Incident Surges */}
          <TabsContent value="incidents" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg font-bold">Civic Malpractice Reports Velocity by Month</CardTitle>
                    <CardDescription>Illustrating massive surge during the August general election window</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    Election Cycle Correlation
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incidentMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))',
                          fontSize: '12px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="reports" name="Total Logged" fill="hsl(var(--muted-foreground)/0.3)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="verified" name="Independently Corroborated" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Violation Categories */}
          <TabsContent value="categories" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Distribution of Reported Malpractice Types</CardTitle>
                <CardDescription>Frequency breakdown of electoral finance and asset violations across Kenya</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {violationCategories.map((cat) => (
                    <div key={cat.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-foreground">{cat.name}</span>
                        <span className="font-mono text-muted-foreground">{cat.count} cases ({cat.share})</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: cat.share }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Callout */}
        <div className="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="font-bold text-base text-foreground">Need to inspect individual party dossiers?</div>
            <p className="text-xs text-muted-foreground">View complete seat breakdowns, compliance checklists, and historical allocations.</p>
          </div>
          <Link href={`/${locale}/dashboard/parties`}>
            <Button size="sm" className="font-semibold gap-2">
              Browse Parties Directory <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
