'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  FileWarning,
  MapPin,
  GraduationCap,
  BarChart3,
  ShieldCheck,
  Coins,
  Sparkles,
  Calculator,
  ArrowRight,
  TrendingUp,
  Building2,
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMessage } from '@/lib/i18n';

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground fade-in-up stagger-1 leading-[1.1]">
            Track Political Campaign Money & Safeguard Public Funds in Kenya
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2">
            Knight Watch is Kenya&apos;s independent civic-tech watchdog. Monitor party funding allocations, uncover undeclared campaign expenditures, and blow the whistle safely.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 fade-in-up stagger-3">
            <Button
              asChild
              variant="default"
              size="lg"
              className="font-bold px-7 h-12 shadow-sm gap-2 text-base"
            >
              <Link href={`/${locale}/report`}>
                <FileWarning className="w-5 h-5" />
                <span>Report Misuse / Whistleblow</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-6 border-border font-semibold gap-2 text-base"
            >
              <Link href={`/${locale}/dashboard`}>
                <BarChart3 className="w-5 h-5 shrink-0" />
                <span>Explore Live Dashboard</span>
              </Link>
            </Button>
          </div>

          {/* Quick Offline Channel Pill */}
          <div className="pt-2 fade-in-up stagger-4">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground border border-border px-4 py-2 rounded-full shadow-xs text-xs font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-foreground shrink-0" />
              <span>Offline in the field? Dial</span>
              <span className="font-mono font-bold text-foreground bg-background/80 px-2 py-0.5 rounded-full border border-border/80">*384*11400#</span>
              <span>on any phone to submit without internet</span>
            </div>
          </div>
        </div>

        {/* 2. STATS PULSE BAR */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 fade-in-up stagger-4">
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-default">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">PPF Monitored</p>
                <p className="font-display font-black text-2xl text-foreground mt-0.5">KSh 703.6M</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">8 parties audited</p>
              </div>
              <Building2 className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
            </CardContent>
          </Card>

          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-default">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Counties Active</p>
                <p className="font-display font-black text-2xl text-foreground mt-0.5">47 / 47</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">National coverage</p>
              </div>
              <MapPin className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
            </CardContent>
          </Card>

          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-default">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mchango Tracked</p>
                <p className="font-display font-black text-2xl text-foreground mt-0.5">KSh 370.4M</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Transparent donations</p>
              </div>
              <Coins className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
            </CardContent>
          </Card>

          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-default">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified Audits</p>
                <p className="font-display font-black text-2xl text-foreground mt-0.5">184 Incidents</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Fact-checked & mapped</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. CORE CIVIC WORKFLOWS (REWIRED USER JOURNEY) */}
      <section className="py-20 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="font-mono text-xs">
            User Action Journeys
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            How Citizens & Observers Take Action
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive tools designed to take you from anonymous whistleblower reporting to constitutional legal reference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Whistleblower Reporting */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">1. Report Campaign Misuse</h3>
                <FileWarning className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Submit evidence of voter bribery, misuse of state resources (government vehicles, public venues), or undeclared private donations. 100% anonymous option.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">Photo Uploads</Badge>
                <Badge variant="secondary" className="text-[11px]">USSD *384*11400#</Badge>
                <Badge variant="secondary" className="text-[11px]">SMS Gateway</Badge>
              </div>
            </div>
            <Button asChild variant="default" className="w-full mt-4">
              <Link href={`/${locale}/report`}>
                <span>File an Incident Report</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Card 2: Interactive GIS Map */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">2. 47 Counties Geographic Radar</h3>
                <MapPin className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore an interactive map plotting verified campaign finance anomalies, public resource diversions, and county spending caps across the Republic of Kenya.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">County Heatmap</Badge>
                <Badge variant="secondary" className="text-[11px]">Incident Pins</Badge>
                <Badge variant="secondary" className="text-[11px]">Filter by Party</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-border">
              <Link href={`/${locale}/map`}>
                <span>Launch Interactive Map</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Card 3: AI Intelligence Engine */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">3. AI Intelligence Engine</h3>
                <Sparkles className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Query election spending records, politician disclosures, and party financial filings using our specialized Gemini-powered investigative search.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">Gemini 1.5</Badge>
                <Badge variant="secondary" className="text-[11px]">Fact Checking</Badge>
                <Badge variant="secondary" className="text-[11px]">Public Records</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-border">
              <Link href={`/${locale}/intelligence`}>
                <span>Ask Intelligence Engine</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Card 4: Transparent Mchango */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">4. Mchango Crowdfunding Hub</h3>
                <Coins className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Support democratic candidates and political parties through verifiable, audited digital contributions powered by Paystack with instant receipt hashes.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">Paystack API</Badge>
                <Badge variant="secondary" className="text-[11px]">Public Ledger</Badge>
                <Badge variant="secondary" className="text-[11px]">Statutory Caps</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-border">
              <Link href={`/${locale}/mchango`}>
                <span>Explore Mchango</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Card 5: Spending Limit Calculator */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">5. Spending Limit Calculator</h3>
                <Calculator className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Calculate legal election spending caps under the Election Campaign Financing Act for President, Governor, Senator, MP, Woman Representative, and MCA.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">Statutory Formula</Badge>
                <Badge variant="secondary" className="text-[11px]">County Multipliers</Badge>
                <Badge variant="secondary" className="text-[11px]">IEBC Ceilings</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-border">
              <Link href={`/${locale}/calculator`}>
                <span>Calculate Spending Caps</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Card 6: Citizen Education Hub */}
          <Card className="group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 p-6 space-y-4 flex flex-col justify-between hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-foreground">6. Citizen Education & Law</h3>
                <GraduationCap className="w-8 h-8 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn your constitutional rights, election spending thresholds, Political Parties Fund distribution formulas, and download civic oversight toolkits.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[11px]">PPF Formula</Badge>
                <Badge variant="secondary" className="text-[11px]">Download Kit</Badge>
                <Badge variant="secondary" className="text-[11px]">FAQs</Badge>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-border">
              <Link href={`/${locale}/learn`}>
                <span>Visit Education Hub</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* 5. WHISTLEBLOWER TRUST & AUDIT WORKFLOW */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3 flex flex-col items-center">
              <Badge variant="secondary" className="font-mono text-xs gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Zero Knowledge Anonymity</span>
              </Badge>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-foreground">
                How Your Whistleblower Report is Protected & Verified
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                We believe in fearless civic monitoring. Every report submitted undergoes a strict cryptographic verification workflow before publication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="space-y-2 border-l-2 border-primary pl-4">
                <p className="font-mono text-xs font-bold text-primary">STEP 01</p>
                <h4 className="font-display font-bold text-base">Anonymous Intake</h4>
                <p className="text-xs text-muted-foreground">
                  No IP addresses or personal identifiers are stored. Works via web form, offline USSD, or encrypted SMS.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-primary pl-4">
                <p className="font-mono text-xs font-bold text-primary">STEP 02</p>
                <h4 className="font-display font-bold text-base">Evidence Hashing</h4>
                <p className="text-xs text-muted-foreground">
                  Photos, video timestamps, and geolocation tags are cryptographically hashed to prevent tampering.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-primary pl-4">
                <p className="font-mono text-xs font-bold text-primary">STEP 03</p>
                <h4 className="font-display font-bold text-base">Independent Fact-Check</h4>
                <p className="text-xs text-muted-foreground">
                  Civic monitors cross-verify claims against official gazettes, rally schedules, and procurement records.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-primary pl-4">
                <p className="font-mono text-xs font-bold text-primary">STEP 04</p>
                <h4 className="font-display font-bold text-base">Oversight Referral</h4>
                <p className="text-xs text-muted-foreground">
                  Verified dossiers are published to the public dashboard and dispatched to TI-Kenya, IEBC, and EACC.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                Have critical evidence of campaign violation right now?
              </p>
              <div className="flex items-center gap-3">
                <Button asChild variant="default" size="sm" className="text-xs h-9">
                  <Link href={`/${locale}/report`}>Start Anonymous Report</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-xs h-9 border-border">
                  <Link href={`/${locale}/privacy`}>Read Privacy Protocol</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
