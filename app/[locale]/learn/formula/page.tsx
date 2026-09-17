'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Scale, 
  Calculator, 
  Percent, 
  Vote, 
  Users, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function FormulaPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const totalFundExample = 1481000000; // KSh 1.481B

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8 flex justify-center">
          <Link
            href={`/${locale}/learn`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Civic Education Hub
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10 text-center flex flex-col items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Scale className="w-3.5 h-3.5" />
            Section 25, Political Parties Act 2011 (Amended 2022)
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            The PPF Mathematical Formula
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            The four-pillar distribution formula governing how hundreds of millions of public revenue are shared among eligible Kenyan political parties.
          </p>
        </div>

        {/* The 4-Way Formula Breakdown */}
        <div className="space-y-6 mb-10">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">The Four Statutory Pillars</CardTitle>
              <CardDescription>
                Under Section 25(1) of the Political Parties Act, the gross fund is divided as follows:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-foreground flex items-center gap-2">
                    <Vote className="w-4 h-4 text-foreground" />
                    1. Vote Share Ratio
                  </span>
                  <Badge variant="default" className="font-mono font-bold text-sm">70%</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Distributed proportionately among qualifying political parties based on the total number of votes secured by each party in the preceding general election across all six ballots (President, Governor, Senator, MP, Woman Rep, and MCA).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-foreground" />
                    2. Special Interest Groups (SIG)
                  </span>
                  <Badge variant="secondary" className="font-mono font-bold text-sm">15%</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Distributed proportionately based on the number of candidates elected from Special Interest Groups: women, youth, and persons with disabilities. Incentivizes parties to nominate and sponsor diverse candidates.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-foreground" />
                    3. Total Elected Representatives
                  </span>
                  <Badge variant="secondary" className="font-mono font-bold text-sm">10%</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Distributed proportionately to the total number of party members elected to the National Assembly, Senate, County Assemblies, and County Gubernatorial seats.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-foreground flex items-center gap-2">
                    <Percent className="w-4 h-4 text-foreground" />
                    4. ORPP Administration & Regulatory Costs
                  </span>
                  <Badge variant="outline" className="font-mono font-bold text-sm">5%</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Retained by the Office of the Registrar of Political Parties for administrative oversight, political party register audits, compliance monitoring, and dispute tribunal operations.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Real Worked Example */}
          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Real-World Allocation Example: KSh 1.481 Billion Fund
                </CardTitle>
                <Badge variant="outline" className="font-mono text-xs">FY 2024/25</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-muted-foreground text-xs">Votes Pool (70%)</div>
                  <div className="font-mono font-bold text-foreground mt-0.5">KSh 1,036.7M</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-muted-foreground text-xs">SIG Pool (15%)</div>
                  <div className="font-mono font-bold text-foreground mt-0.5">KSh 222.1M</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-muted-foreground text-xs">Elected Reps (10%)</div>
                  <div className="font-mono font-bold text-foreground mt-0.5">KSh 148.1M</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-muted-foreground text-xs">ORPP Admin (5%)</div>
                  <div className="font-mono font-bold text-foreground mt-0.5">KSh 74.0M</div>
                </div>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed pt-2">
                Under this distribution, parties with extensive grassroots performance (such as UDA and ODM) receive the largest combined shares, while parties with fewer seats or missed SIG quotas experience significant funding reductions.
              </p>
            </CardContent>
          </Card>

          {/* Calculator Call to Action */}
          <Card className="shadow-md text-center py-6 sm:py-8">
            <CardContent className="space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Simulate Your Own Scenarios
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Adjust national revenue, vote proportions, and seat allocations in real time using our dual-engine interactive calculator.
              </p>
              <Link href={`/${locale}/calculator`} className="inline-block pt-1">
                <Button className="gap-2 font-semibold shadow-sm">
                  Open Interactive Calculator <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
