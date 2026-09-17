'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Hourglass,
  Scale,
  FileCheck2
} from 'lucide-react';

const electionCycles = [
  {
    year: '2013',
    date: 'March 4, 2013',
    milestone: 'Inaugural Constitution 2010 Election',
    detail: 'First general election under the devolved governance architecture, establishing 47 County Governments.',
    status: 'Concluded',
  },
  {
    year: '2017',
    date: 'August 8, 2017 & Oct 26, 2017',
    milestone: 'Supreme Court Annulment & Fresh Election',
    detail: 'IEBC issued first gazette notice on campaign financing expenditure windows six months prior to the vote.',
    status: 'Concluded',
  },
  {
    year: '2022',
    date: 'August 9, 2022',
    milestone: '5th General Election',
    detail: 'Electoral expenditure limits revoked by Parliament; record private campaign expenditure documented by civil society.',
    status: 'Concluded',
  },
  {
    year: '2027',
    date: 'August 10, 2027 (Scheduled)',
    milestone: 'Upcoming 6th General Election',
    detail: 'Citizen advocacy targeting gazettement of binding spending limits at least 12 months prior to the poll.',
    status: 'Upcoming',
  },
];

export default function ExpenditurePeriodPage() {
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
            <Calendar className="w-3.5 h-3.5" />
            Section 15, Election Campaign Financing Act
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Expenditure Periods & Election Calendar
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            The statutory timeline governing when campaign spending triggers take effect, when books open, and when audited disclosures must be filed.
          </p>
        </div>

        {/* Core Explanations */}
        <div className="space-y-8">
          
          {/* Statutory 6-Month Window */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                The 6-Month Expenditure Window
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Under <strong className="text-foreground">Section 15 of the Election Campaign Financing Act</strong>, the statutory campaign expenditure period commences precisely <strong className="text-foreground">six months prior to the date of a general election</strong> and terminates immediately on election day.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Hourglass className="w-4 h-4 text-amber-600" />
                    During the 6-Month Window
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li>Mandatory campaign expenditure committee appointment</li>
                    <li>Designation of authorized signatories for dedicated bank accounts</li>
                    <li>Real-time logging of billboard, airtime, and rally logistics costs</li>
                    <li>Ban on anonymous and untraceable cash donations</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-foreground" />
                    Post-Election 90-Day Audit
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside text-xs">
                    <li>All candidates & parties must submit audited returns within 3 months</li>
                    <li>Surplus funds must be surrendered to the Political Parties Fund</li>
                    <li>Debts and liabilities undergo formal statutory scrutiny</li>
                    <li>Failure to file constitutes an electoral felony</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chronological Calendar of Elections */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Kenyan 5-Year General Election Cycles
              </CardTitle>
              <CardDescription>
                Article 101 & 136 of the Constitution of Kenya: elections take place on the second Tuesday of August every fifth year.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {electionCycles.map((cycle) => (
                  <div key={cycle.year} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-base text-foreground">{cycle.year}</span>
                        <span className="text-xs text-muted-foreground">• {cycle.date}</span>
                        <Badge variant={cycle.status === 'Upcoming' ? 'default' : 'outline'} className="text-[10px]">
                          {cycle.status}
                        </Badge>
                      </div>
                      <div className="font-bold text-sm text-foreground">{cycle.milestone}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{cycle.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Road to 2027 Action Alert */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-foreground">
                <Scale className="w-5 h-5 text-primary" />
                The Road to August 2027
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                By law, IEBC regulations on campaign financing must be tabled in Parliament <strong className="text-foreground">at least 12 months before the election</strong>. Civil society and civic watchdogs are mounting early litigation to ensure Parliament does not repeat the procedural sabotage of 2017 and 2021.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
