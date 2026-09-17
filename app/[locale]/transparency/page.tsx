'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Award, ArrowRight, CheckCircle2, Info, ChevronRight, TrendingUp } from 'lucide-react';
import { KENYAN_PARTIES } from '@/lib/partyData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function TransparencyPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  // Sort parties by transparencyScore descending
  const rankedParties = [...KENYAN_PARTIES].sort(
    (a, b) => b.transparencyScore - a.transparencyScore
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Quarterly Index · 2024/2025
          </Badge>
          <Badge variant="success" className="text-xs">
            TI-Kenya Validated
          </Badge>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
          Kenya Political Parties Transparency Index
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Independent composite rankings assessing statutory disclosure of audited accounts, Political Parties Fund (PPF) expenditure compliance, public crowdfunding openness, and responsiveness to citizen violation reports.
        </p>
      </div>

      {/* Index Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-card">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Highest Scored Party</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-display font-black text-xl text-foreground">
              {rankedParties[0]?.name}
            </span>
            <Badge variant="outline" className="font-mono text-xs">{rankedParties[0]?.acronym}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {rankedParties[0]?.transparencyScore}/100 Composite Score
          </p>
        </Card>

        <Card className="p-5 bg-card">
          <p className="text-xs text-muted-foreground uppercase font-semibold">National Average</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">
            73.1%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            +4.2% increase from 2022 general election baseline
          </p>
        </Card>

        <Card className="p-5 bg-card">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Audited Entities</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">
            8 Parties
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Holding parliamentary representation
          </p>
        </Card>
      </div>

      {/* Ranked List */}
      <div className="space-y-4">
        {rankedParties.map((party, index) => {
          const rank = index + 1;
          const isTopThree = rank <= 3;

          return (
            <Link
              key={party.slug}
              href={`/${locale}/transparency/${party.slug}`}
              className="block group"
            >
              <Card className="p-5 border-border hover:border-primary/50 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Rank Indicator */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm flex-shrink-0 ${
                        rank === 1
                          ? 'bg-amber-400 text-amber-950 shadow-sm ring-2 ring-amber-300'
                          : rank === 2
                          ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                          : rank === 3
                          ? 'bg-amber-600/30 text-amber-800 dark:text-amber-200'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      #{rank}
                    </div>

                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-background border border-border p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src={party.logo}
                        alt={party.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Party Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {party.name}
                        </h2>
                        <Badge variant="outline" className="font-mono text-xs font-semibold">
                          {party.acronym}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Leader: <span className="font-medium text-foreground">{party.leader}</span> · Symbol: {party.symbol}
                      </p>
                    </div>
                  </div>

                  {/* Score & Progress */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                    <div className="w-28 hidden md:block space-y-1">
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>Compliance</span>
                        <span className="font-mono font-semibold">{party.transparencyScore}%</span>
                      </div>
                      <Progress value={party.transparencyScore} className="h-2" />
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase font-semibold text-muted-foreground">Index Score</p>
                      <p className="font-display font-black text-2xl text-foreground">
                        {party.transparencyScore}
                        <span className="text-xs font-normal text-muted-foreground">/100</span>
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Methodology Section */}
      <Card className="p-6 space-y-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Evaluation Pillars & Weights</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-border bg-card space-y-1">
            <p className="font-bold text-foreground">30% Audited Accounts</p>
            <p className="text-muted-foreground">Gazette publication of certified financial balance sheets.</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-card space-y-1">
            <p className="font-bold text-foreground">25% PPF Compliance</p>
            <p className="text-muted-foreground">Statutory expenditure allocation (civic education, youth/women).</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-card space-y-1">
            <p className="font-bold text-foreground">20% Crowdfunding Openness</p>
            <p className="text-muted-foreground">Public logging and receipts for private citizen donations.</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-card space-y-1">
            <p className="font-bold text-foreground">25% Whistleblower Action</p>
            <p className="text-muted-foreground">Prompt internal review of flagged election misconduct.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
