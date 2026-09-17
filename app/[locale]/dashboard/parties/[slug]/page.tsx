'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  ArrowLeft,
  ShieldCheck,
  Coins,
  FileWarning,
  Users,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { getPartyBySlug, KENYAN_PARTIES } from '@/lib/partyData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function PartyDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = (params?.slug as string) || '';

  const party = getPartyBySlug(slug) || KENYAN_PARTIES[0];

  const pctCrowdfund =
    party.mchangoGoalKes > 0
      ? Math.min(100, Math.round((party.mchangoRaisedKes / party.mchangoGoalKes) * 100))
      : 0;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/${locale}/dashboard/parties`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Political Parties Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
            <Link href={`/${locale}/transparency/${party.slug}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-foreground" />
              <span>Transparency Breakdown</span>
            </Link>
          </Button>

          <Button asChild size="sm" className="gap-1.5 text-xs font-semibold">
            <Link href={`/${locale}/mchango`}>
              <Coins className="w-3.5 h-3.5" />
              <span>Donate via Mchango</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: party.accentColor }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-background border border-border p-3 flex items-center justify-center flex-shrink-0 shadow-md">
              <img
                src={party.logo}
                alt={`${party.name} official emblem`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                  {party.name}
                </h1>
                <Badge variant="outline" className="font-mono text-sm font-bold">
                  {party.acronym}
                </Badge>
                <Badge
                  variant={party.transparencyScore >= 75 ? 'success' : 'warning'}
                  className="font-mono text-xs"
                >
                  {party.transparencyScore}/100 Index
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Official Electoral Symbol: <span className="font-semibold text-foreground">{party.symbol}</span> · Established: <span className="font-semibold text-foreground">{party.founded}</span>
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-foreground" />
                <span>HQ: {party.headquarters}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-border">
            <div className="text-left lg:text-right">
              <p className="text-xs text-muted-foreground uppercase font-semibold">Latest PPF Allocation</p>
              <p className="font-display font-black text-2xl text-foreground">
                {party.ppfAllocationDisplay}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">ORPP Registration: {party.orppRegNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs text-muted-foreground uppercase font-semibold">National Assembly</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">
            {party.parliamentarySeats.nationalAssembly} MPs
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">13th Parliament</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Senate Representation</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">
            {party.parliamentarySeats.senate} Senators
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">47 County Delegations</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-muted-foreground uppercase font-semibold">County Governors</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">
            {party.parliamentarySeats.governors} Governors
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">County Chief Executives</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Flagged Incidents</p>
          <p className="font-display font-black text-2xl mt-1 text-amber-600 dark:text-amber-400">
            {party.reportsCount} Submissions
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{party.verifiedViolationsCount} Verified</p>
        </Card>
      </div>

      {/* Grid: Charts & Leadership */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: PPF History Chart */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Political Parties Fund (PPF) Allocation Trend
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-year state disbursements under Section 25 of the Political Parties Act (in Millions KSh)
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                Audited
              </Badge>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={party.ppfHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="M" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                    formatter={(value: any) => [`KSh ${value}M`, 'Allocation']}
                  />
                  <Bar
                    dataKey="ppfMillions"
                    fill={party.secondaryColor || '#006837'}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Transparency Breakdown Checklist */}
          <Card className="p-6">
            <h2 className="font-display font-bold text-xl text-foreground mb-1">
              Transparency Index Evaluation Breakdown
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Weighted scoring verified against statutory submissions to the Office of the Registrar of Political Parties (ORPP)
            </p>

            <div className="space-y-4">
              {party.breakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-border bg-muted/20 gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {item.status === 'clean' ? (
                        <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0" />
                      ) : item.status === 'partial' ? (
                        <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">{item.value}</p>
                  </div>

                  <div className="flex items-center gap-3 pl-6 sm:pl-0">
                    <Badge variant={item.status === 'clean' ? 'success' : 'secondary'} className="text-[11px] capitalize">
                      {item.status}
                    </Badge>
                    <span className="font-mono font-bold text-xs text-muted-foreground">
                      {item.weight}% weight
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Leadership Roster & Whistleblower CTA */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground">
              Official Leadership Roster
            </h3>
            <div className="divide-y divide-border text-sm">
              <div className="py-2.5">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Party Leader</p>
                <p className="font-semibold text-foreground mt-0.5">{party.leader}</p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-muted-foreground uppercase font-semibold">National Chairperson</p>
                <p className="font-semibold text-foreground mt-0.5">{party.chairperson}</p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Secretary General</p>
                <p className="font-semibold text-foreground mt-0.5">{party.secretaryGeneral}</p>
              </div>
              <div className="py-2.5">
                <p className="text-xs text-muted-foreground uppercase font-semibold">National Headquarters</p>
                <p className="text-xs text-muted-foreground mt-0.5">{party.headquarters}</p>
              </div>
            </div>
          </Card>

          {/* Crowdfunding Card */}
          <Card className="p-6 space-y-4 bg-muted/20">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-base">Public Mchango Tracker</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Voluntary contributions logged on the Knight Watch transparent ledger.
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-foreground">
                  KES {(party.mchangoRaisedKes / 1e6).toFixed(1)}M
                </span>
                <span className="text-muted-foreground">
                  Goal KES {(party.mchangoGoalKes / 1e6).toFixed(1)}M
                </span>
              </div>
              <Progress value={pctCrowdfund} className="h-2" />
            </div>
            <Button asChild className="w-full text-xs h-10 font-bold">
              <Link href={`/${locale}/mchango`}>
                <span>Contribute to {party.acronym}</span>
              </Link>
            </Button>
          </Card>

          {/* Whistleblower CTA Card */}
          <Card className="p-6 border-red-500/20 bg-red-50/20 dark:bg-red-950/10 space-y-3">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <FileWarning className="w-5 h-5" />
              <h3 className="font-display font-bold text-base">Flag a Violation</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Have you witnessed voter bribery or unauthorized use of state vehicles by {party.name} representatives?
            </p>
            <Button asChild variant="outline" className="w-full text-xs h-9 border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10">
              <Link href={`/${locale}/report`}>
                <span>Submit Anonymous Evidence</span>
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
