'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Building, 
  Scale, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Calculator, 
  FileText,
  Coins
} from 'lucide-react';

export default function PPFPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

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
            <Coins className="w-3.5 h-3.5" />
            Section 24, Political Parties Act (No. 11 of 2011)
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            The 0.3% Political Parties Fund (PPF)
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            A comprehensive guide to Kenya&apos;s multi-billion statutory fund: where the money comes from, who qualifies, how it is divided, and why the Auditor-General audits every shilling.
          </p>
        </div>

        {/* Core Explanations */}
        <div className="space-y-8">
          
          {/* What is PPF Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                What is the Political Parties Fund?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                Established under <strong className="text-foreground">Section 23 of the Political Parties Act, 2011</strong>, the Political Parties Fund is designed to promote democratic governance, institutionalize political parties as public organs, and curb the undue influence of illicit oligarchic wealth and foreign campaign meddling.
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-foreground text-sm">
                <div className="font-bold text-primary mb-1">Statutory Revenue Benchmark</div>
                By law, the National Treasury is required to allocate <strong className="font-mono text-primary font-bold">not less than 0.3%</strong> of national revenue collected by the national government as audited and approved by the National Assembly.
              </div>
              <p>
                The fund is administered directly by the <strong className="text-foreground">Office of the Registrar of Political Parties (ORPP)</strong>, an independent state office charged with registering, regulating, and supervising political parties in Kenya.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility Requirements */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-foreground" />
                Who Qualifies for Public Funding?
              </CardTitle>
              <CardDescription>
                Not every registered party receives funds. Following the 2022 amendments to the Political Parties Act, parties must meet rigorous thresholds:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-lg bg-muted/40 border space-y-1.5">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground"></span>
                    Vote Share Threshold
                  </div>
                  <p className="text-muted-foreground">
                    Must secure at least <strong className="text-foreground">5% of the total national votes</strong> cast across all six electoral positions in the preceding general election.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 border space-y-1.5">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground"></span>
                    Elected Representation
                  </div>
                  <p className="text-muted-foreground">
                    Must have at least <strong className="text-foreground">one elected representative</strong> in Parliament (National Assembly or Senate) or County Assembly.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 border space-y-1.5">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground"></span>
                    Geographic National Spread
                  </div>
                  <p className="text-muted-foreground">
                    Governing body must reflect regional and ethnic diversity, with registered branch offices in at least <strong className="text-foreground">24 of the 47 counties</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 border space-y-1.5">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-foreground"></span>
                    Special Interest Groups (SIG)
                  </div>
                  <p className="text-muted-foreground">
                    Not more than two-thirds of its national leadership can be of the same gender; must actively demonstrate inclusion of youth and persons with disabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allocation Breakdown Summary */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Statutory 4-Way Distribution Formula
              </CardTitle>
              <CardDescription>
                Under Section 25 of the Act, qualifying parties receive funds split across four categories:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="divide-y divide-border">
                <div className="py-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">1. Total Votes Cast in Preceding General Election</span>
                  <Badge variant="default" className="font-mono text-xs font-bold">70%</Badge>
                </div>
                <div className="py-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">2. Special Interest Groups (Women, Youth, PWDs elected)</span>
                  <Badge variant="secondary" className="font-mono text-xs font-bold">15%</Badge>
                </div>
                <div className="py-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">3. Total Number of Elected Representatives</span>
                  <Badge variant="secondary" className="font-mono text-xs font-bold">10%</Badge>
                </div>
                <div className="py-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">4. ORPP Administrative & Monitoring Oversight</span>
                  <Badge variant="outline" className="font-mono text-xs font-bold">5%</Badge>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/calculator`} className="flex-1">
                  <Button className="w-full gap-2 text-xs font-semibold">
                    <Calculator className="w-4 h-4" /> Open Interactive PPF Calculator
                  </Button>
                </Link>
                <Link href={`/${locale}/learn/formula`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2 text-xs font-semibold">
                    <FileText className="w-4 h-4" /> Detailed Mathematical Formula
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Permitted vs Prohibited Use */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-foreground">
                  Permitted Uses (Section 26)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Civic education and voter sensitization</li>
                  <li>Promoting active participation of women, youth, and PWDs (min 30%)</li>
                  <li>Party administrative expenses (capped at max 30%)</li>
                  <li>Drafting policy alternatives and civic research</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-50/20 dark:bg-red-950/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-red-900 dark:text-red-200">
                  Prohibited Expenditures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-red-800 dark:text-red-300 list-disc list-inside">
                  <li>Direct or indirect cash handouts or inducements to voters</li>
                  <li>Remuneration or personal allowances to party leaders</li>
                  <li>Funding commercial private business ventures</li>
                  <li>Defraying election petition legal fees for individual candidates</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* External Verification Links */}
          <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>External regulatory references:</span>
            <div className="flex items-center gap-4">
              <a
                href="https://orpp.or.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
              >
                ORPP Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://new.kenyalaw.org/akn/ke/act/2011/12/eng@2022-12-31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
              >
                Kenya Law Reports <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
