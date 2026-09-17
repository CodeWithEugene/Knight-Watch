'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Coins, 
  Landmark, 
  Users, 
  Ban, 
  ShieldCheck, 
  ExternalLink,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function FundingOverviewPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/learn`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Civic Education Hub
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Coins className="w-3.5 h-3.5" />
            Political Finance Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Campaign Funding in Kenya: An Overview
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            How money enters and circulates through political campaigns in Kenya: legal funding channels, private donor caps, disclosure rules, and prohibited sources.
          </p>
        </div>

        {/* Core Funding Channels Grid */}
        <div className="space-y-8">
          
          {/* 3 Main Permitted Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card className="shadow-xs border-border/80 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                  <Landmark className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold">1. State Subvention (PPF)</CardTitle>
                <CardDescription className="text-xs">0.3% of audited national revenue</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Disbursed quarterly by the ORPP to eligible parties based on votes cast and elected seats. Aims to institutionalize political parties as public entities.
              </CardContent>
            </Card>

            <Card className="shadow-xs border-border/80 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold">2. Membership Dues</CardTitle>
                <CardDescription className="text-xs">Grassroots subscriptions & levy</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Collected from registered party members and monthly parliamentary caucus levies docked from sitting MPs, Senators, Governors, and MCAs.
              </CardContent>
            </Card>

            <Card className="shadow-xs border-border/80 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                  <Coins className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold">3. Private Donations</CardTitle>
                <CardDescription className="text-xs">Subject to Section 12 5% ceiling</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Contributions from Kenyan citizens and domestic corporate bodies. Under Section 12, a single donor cannot provide more than 5% of total party expenditure.
              </CardContent>
            </Card>

          </div>

          {/* Prohibited Sources */}
          <Card className="border-red-500/30 bg-red-50/20 dark:bg-red-950/10 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-red-900 dark:text-red-200">
                <Ban className="w-5 h-5 text-red-600" />
                Strictly Prohibited Campaign Financing Sources
              </CardTitle>
              <CardDescription className="text-red-800/80 dark:text-red-300/80">
                Any party or candidate accepting funds from the following categories commits an electoral felony:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-red-900 dark:text-red-200">
                <div className="p-3 bg-background/80 rounded-lg border border-red-200 dark:border-red-900 space-y-1">
                  <div className="font-bold">Foreign Governments & State Organs</div>
                  <p className="text-xs text-muted-foreground">Any contribution from foreign states, foreign intelligence organs, or foreign public corporations is treasonous and unlawful.</p>
                </div>
                <div className="p-3 bg-background/80 rounded-lg border border-red-200 dark:border-red-900 space-y-1">
                  <div className="font-bold">Illicit Proceeds & Money Laundering</div>
                  <p className="text-xs text-muted-foreground">Proceeds of corruption, tender kickbacks, drug trafficking, or organized crime under POCAMLA.</p>
                </div>
                <div className="p-3 bg-background/80 rounded-lg border border-red-200 dark:border-red-900 space-y-1">
                  <div className="font-bold">Anonymous / Slush Fund Cash</div>
                  <p className="text-xs text-muted-foreground">Unidentified cash deposits exceeding KSh 100,000 must be surrendered to the Registrar within 14 days.</p>
                </div>
                <div className="p-3 bg-background/80 rounded-lg border border-red-200 dark:border-red-900 space-y-1">
                  <div className="font-bold">Public State Resources</div>
                  <p className="text-xs text-muted-foreground">Use of government vehicles (GK plates), state machinery, civil servants, or state media to advance campaign outcomes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statutory Oversight Triad */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                The Statutory Oversight Architecture
              </CardTitle>
              <CardDescription>
                Three constitutional agencies share regulatory jurisdiction over political campaign funds:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <div className="font-bold text-foreground">1. Office of the Registrar of Political Parties (ORPP)</div>
                <p className="text-muted-foreground">Supervises party registers, disburses the 0.3% PPF, verifies compliance with SIG quotas, and maintains the public register of party assets.</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <div className="font-bold text-foreground">2. Independent Electoral & Boundaries Commission (IEBC)</div>
                <p className="text-muted-foreground">Mandated under Article 88(4)(i) to regulate expenditure limits during elections and sanction candidates who violate spending rules.</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                <div className="font-bold text-foreground">3. Office of the Auditor-General (OAG)</div>
                <p className="text-muted-foreground">Conducts annual post-election financial audits of all political party books, tabling comprehensive audit reports before Parliament.</p>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
