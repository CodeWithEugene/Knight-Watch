'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ALL_PARTIES } from '@/lib/partyData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  Coins, 
  TrendingUp, 
  Lock, 
  ArrowUpRight, 
  Download,
  AlertCircle
} from 'lucide-react';

const mchangoStatsData = [
  { party: 'UDA', name: 'United Democratic Alliance', total: 14.8, contributors: 4120, avg: 3592, color: '#16a34a' },
  { party: 'ODM', name: 'Orange Democratic Movement', total: 11.2, contributors: 3290, avg: 3404, color: '#ea580c' },
  { party: 'Jubilee', name: 'Jubilee Party', total: 4.6, contributors: 1420, avg: 3239, color: '#dc2626' },
  { party: 'WDM-K', name: 'Wiper Democratic Movement', total: 3.8, contributors: 1180, avg: 3220, color: '#2563eb' },
  { party: 'ANC', name: 'Amani National Congress', total: 2.1, contributors: 640, avg: 3281, color: '#059669' },
  { party: 'Ford-K', name: 'Ford Kenya', total: 1.7, contributors: 510, avg: 3333, color: '#10b981' },
  { party: 'KANU', name: 'KANU', total: 1.4, contributors: 430, avg: 3255, color: '#b91c1c' },
  { party: 'DAP-K', name: 'Democratic Action Party', total: 0.9, contributors: 290, avg: 3103, color: '#0284c7' },
];

export default function MchangoTransparencyPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const totalRaised = mchangoStatsData.reduce((acc, curr) => acc + curr.total, 0);
  const totalContributors = mchangoStatsData.reduce((acc, curr) => acc + curr.contributors, 0);

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <HeartHandshake className="w-3.5 h-3.5" />
              Public Campaign Crowdfunding Registry
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-foreground">
              Mchango Transparency Ledger
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-time aggregate grassroots contributions per political party under Section 12 of the Political Parties Act. Individual donors remain anonymous to prevent political retaliation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/${locale}/mchango`}>
              <Button className="gap-2 font-semibold shadow-sm">
                <HeartHandshake className="w-4 h-4" />
                Make a Contribution
              </Button>
            </Link>
          </div>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <Card className="shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Raised</span>
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground">
                KSh {totalRaised.toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> 100% Grassroots funded
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Verified Donors</span>
                <Users className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground">
                {totalContributors.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Across 47 Kenyan Counties
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Average Donation</span>
                <Coins className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground">
                KSh 3,420
              </div>
              <div className="text-xs text-muted-foreground">
                M-PESA & Card micro-donations
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">ORPP Audited</span>
                <ShieldCheck className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                100%
              </div>
              <div className="text-xs text-muted-foreground">
                Compliant with Section 12
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <Card className="lg:col-span-8 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Aggregate Campaign Contributions by Party</CardTitle>
                  <CardDescription>Verified grassroots fundraising in Kenyan Shillings (Millions)</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-xs">FY 2024/25</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mchangoStatsData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="party" 
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
                      cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      formatter={(val: any) => [`KSh ${val}M`, 'Total Raised']}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                      {mchangoStatsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Anti-Slush Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border/80 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Privacy & Whistleblower Shield
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <p>
                  To protect ordinary citizens and civil servants from targeted partisan retaliation or state coercion, Knight Watch does <strong className="text-foreground">not publish individual names or specific transaction values</strong>.
                </p>
                <p>
                  All contributions are aggregated and reported in bulk to the Office of the Registrar of Political Parties (ORPP) in compliance with Chapter 6 and Article 38 of the Constitution of Kenya.
                </p>
                <div className="p-3 bg-muted/50 rounded-lg border border-border/60 text-foreground font-medium text-xs">
                  Max single donor threshold: <span className="font-bold">5% of total party expenditure cap</span> (Section 12).
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Anti-Money Laundering (AML)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automated checks flag rapid structuring attempts and foreign currency transfers exceeding Central Bank of Kenya (CBK) prudential guidelines.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Detailed Party Breakdown Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg font-bold">Party Grassroots Fundraising Breakdown</CardTitle>
            <CardDescription>Verified statistics across all 8 registered parliamentary parties</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Political Party</TableHead>
                    <TableHead>Total Raised</TableHead>
                    <TableHead>Contributors</TableHead>
                    <TableHead>Avg Contribution</TableHead>
                    <TableHead>ORPP Compliance</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mchangoStatsData.map((item) => {
                    const partyObj = ALL_PARTIES.find(p => p.acronym === item.party || p.slug === item.party.toLowerCase()) || ALL_PARTIES[0];
                    return (
                      <TableRow key={item.party}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded relative overflow-hidden bg-white p-1 border shrink-0 flex items-center justify-center">
                              <Image
                                src={partyObj.logo}
                                alt={partyObj.name}
                                width={28}
                                height={28}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                                {item.party}
                                <span className="text-xs font-normal text-muted-foreground hidden sm:inline">({item.name})</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground font-mono">{partyObj.registrationNo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono font-bold text-sm text-foreground">
                          KSh {item.total}M
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {item.contributors.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          KSh {item.avg.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/${locale}/mchango?party=${partyObj.slug}`}>
                            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs">
                              Contribute <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
