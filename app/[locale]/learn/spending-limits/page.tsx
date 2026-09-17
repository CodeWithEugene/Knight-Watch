'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Scale, 
  AlertTriangle, 
  ShieldAlert, 
  Calendar, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Gavel,
  Calculator
} from 'lucide-react';

const spendingTimeline = [
  {
    year: '2013',
    status: 'Enacted',
    title: 'Election Campaign Financing Act Passed',
    desc: 'Parliament enacts Act No. 42 of 2013 to operationalize Article 88(4)(i) of the Constitution, empowering IEBC to prescribe spending ceilings.',
    active: false,
  },
  {
    year: '2014',
    status: 'In Force',
    title: 'Statutory Commencement',
    desc: 'The Act formally comes into force on January 10, 2014. IEBC begins formulation of candidate expenditure regulations.',
    active: false,
  },
  {
    year: '2017',
    status: 'Caps Gazetted',
    title: 'First Gazette Spending Ceilings',
    desc: 'IEBC gazettes spending limits: Presidential candidates capped at KSh 4.4 billion; single donor contributions capped at 20% of expenditure limit.',
    active: false,
  },
  {
    year: '2021',
    status: 'Revocation',
    title: 'Parliament Nullifies Regulations',
    desc: 'The National Assembly declines to approve draft regulations. IEBC withdraws the gazetted spending limits just 10 months before the 2022 general election.',
    active: false,
  },
  {
    year: '2022',
    status: 'Judicial Ruling',
    title: 'High Court Mandates IEBC Action',
    desc: 'In Petitions E540/2021 & E546/2021 (Katiba Institute & Transparency International Kenya v IEBC), the High Court holds that Section 29 requirements cannot override the constitutional duty to regulate money in politics.',
    active: false,
  },
  {
    year: 'Present - 2027',
    status: 'Urgent Reform',
    title: 'Constitutional Lacuna & Watchdog Action',
    desc: 'Kenya currently operates without enforceable statutory spending limits. Civic watchdog organizations and citizen audits provide the sole barrier against unchecked oligarchic campaign financing.',
    active: true,
  },
];

const historicalLimits = [
  { office: 'Presidential Candidate', limit: 'KSh 4,435,216,000', donorMax: 'KSh 887,043,200', basis: 'National electorate & 47 counties' },
  { office: 'Nairobi Governor / Senator', limit: 'KSh 432,700,000', donorMax: 'KSh 86,540,000', basis: 'Urban county (approx. 2.4M voters)' },
  { office: 'Kiambu / Nakuru Governor', limit: 'KSh 250,000,000 - 320,000,000', donorMax: 'KSh 50,000,000', basis: 'High-density rural & peri-urban' },
  { office: 'Member of Parliament (Constituency)', limit: 'KSh 33,000,000', donorMax: 'KSh 6,600,000', basis: 'Average constituency size' },
  { office: 'Member of County Assembly (MCA)', limit: 'KSh 10,000,000', donorMax: 'KSh 2,000,000', basis: 'Electoral ward' },
];

export default function SpendingLimitsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground border border-border">
            <AlertTriangle className="w-3.5 h-3.5" />
            Constitutional Lacuna Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Legal Campaign Spending Limits
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            The history, legislative sabotage, judicial landmark rulings, and ongoing struggle to place hard caps on electoral expenditure in Kenya.
          </p>
        </div>

        {/* Status Callout Card */}
        <Card className="border-border bg-card shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="font-bold text-foreground block text-base">
                  Current Legal Status: No Enforced Ceilings
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Despite Article 88(4)(i) mandating IEBC to regulate campaign money, Parliament repeatedly scuttled procedural timelines before the 2017 and 2022 elections. As a result, Kenya remains an un-capped campaign finance environment where political campaigns run with virtually zero statutory limits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          
          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Evolution of Campaign Finance Regulations
              </CardTitle>
              <CardDescription>
                How legislative resistance derailed campaign spending controls over a decade:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-border space-y-8 my-2">
                {spendingTimeline.map((item, i) => (
                  <div key={item.year} className="relative">
                    <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${item.active ? 'bg-primary border-primary ring-4 ring-primary/20' : 'bg-background border-muted-foreground'}`} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-foreground">{item.year}</span>
                        <Badge variant={item.active ? 'default' : 'outline'} className="text-[10px]">
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-sm font-bold text-foreground">{item.title}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historical 2017 Gazetted Limits */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg font-bold">Historical Benchmark Ceilings (2017 Gazette)</CardTitle>
                  <CardDescription>The proposed limits drafted by IEBC before parliamentary annulment:</CardDescription>
                </div>
                <Link href={`/${locale}/calculator`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                    <Calculator className="w-3.5 h-3.5 text-primary" /> Test in Calculator
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border text-xs sm:text-sm">
                {historicalLimits.map((limit) => (
                  <div key={limit.office} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-foreground">{limit.office}</div>
                      <div className="text-xs text-muted-foreground">{limit.basis}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-foreground">{limit.limit}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">Max Single Donor: {limit.donorMax}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Landmark Judicial Precedent */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <Gavel className="w-5 h-5 text-foreground" />
                Judicial Precedent: Katiba Institute & TI-Kenya v IEBC
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                In high court petitions <strong className="text-foreground">E540 of 2021</strong> and <strong className="text-foreground">E546 of 2021</strong>, civil society litigants challenged the withdrawal of spending limits.
              </p>
              <p>
                The High Court reaffirmed that Article 88(4)(i) creates an affirmative, non-derogable constitutional obligation upon IEBC. Parliament cannot circumvent constitutional mandates through bureaucratic refusal to debate statutory instruments.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
