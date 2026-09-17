'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, ExternalLink, ShieldCheck, FileSpreadsheet, Sparkles, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';

const officialSources = [
  {
    name: 'Office of the Registrar of Political Parties (ORPP)',
    acronym: 'ORPP',
    url: 'https://orpp.or.ke',
    frequency: 'Quarterly disbursements',
    desc: 'Statutory authority administering the Political Parties Fund, party membership registers, and compliance with the 2/3 gender and SIG quotas.',
    dataExtracted: 'Gross PPF allocations, party registration certificates, audited membership registers, and party official lists.'
  },
  {
    name: 'Office of the Auditor-General (OAG)',
    acronym: 'OAG',
    url: 'https://www.oagkenya.go.ke',
    frequency: 'Annual post-election audits',
    desc: 'Constitutional audit institution mandated under Article 229 to inspect political party accounts and statutory election expenditure returns.',
    dataExtracted: 'Post-election campaign expenditure audits, qualified audit opinions, and unvouched payment queries.'
  },
  {
    name: 'Independent Electoral and Boundaries Commission',
    acronym: 'IEBC',
    url: 'https://www.iebc.or.ke',
    frequency: '5-year general election cycles & by-elections',
    desc: 'Constitutional commission responsible for conducting elections, gazetting expenditure limits, and registering authorized campaign bank accounts.',
    dataExtracted: 'Polling station distributions, registered voter tallies per county, candidate declarations, and election results.'
  },
  {
    name: 'The National Treasury & Economic Planning',
    acronym: 'Treasury',
    url: 'https://www.treasury.go.ke',
    frequency: 'Annual Budget Policy Statement',
    desc: 'Publishes the National Budget, printed estimates of development expenditure, and audited national government revenue accounts used for the 0.3% calculation.',
    dataExtracted: 'National revenue collection benchmarks and exchequer release schedules.'
  }
];

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Database className="w-3.5 h-3.5" />
            Provenance & Methodology
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Official Data Sources & Provenance
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Knight Watch synthesizes and validates data from official Kenyan constitutional commissions, statutory gazettes, and parliamentary oversight committees.
          </p>
        </div>

        {/* Data Liberation Pipeline Card */}
        <Card className="shadow-md border-primary/20 bg-primary/5 mb-10 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2 text-foreground">
                <Cpu className="w-5 h-5 text-primary" />
                The Civic Data Liberation Pipeline
              </CardTitle>
              <Badge variant="outline" className="font-mono text-xs">Automated ETL</Badge>
            </div>
            <CardDescription className="text-xs">
              Transforming opaque government PDF gazettes into machine-readable civic intelligence:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-background rounded-lg border space-y-1">
                <div className="font-bold text-foreground">1. Gazette Ingestion</div>
                <p className="text-xs text-muted-foreground">Scrapers monitor Kenya Gazette and ORPP portal for new PDF statutory notices.</p>
              </div>
              <div className="p-3 bg-background rounded-lg border space-y-1">
                <div className="font-bold text-foreground">2. Table OCR & Parsing</div>
                <p className="text-xs text-muted-foreground">Tabular financial allocation matrices are extracted into verified JSON structures.</p>
              </div>
              <div className="p-3 bg-background rounded-lg border space-y-1">
                <div className="font-bold text-foreground">3. Public API & Visuals</div>
                <p className="text-xs text-muted-foreground">Data is mapped to Recharts visualizations and open CSV/JSON endpoints for public access.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Data Sources List */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Official Regulatory Authorities
          </h2>

          <div className="space-y-4">
            {officialSources.map((source) => (
              <Card key={source.name} className="shadow-xs hover:border-primary/40 transition-colors">
                <CardContent className="p-5 sm:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono font-bold text-xs">
                          {source.acronym}
                        </Badge>
                        <h3 className="font-bold text-base text-foreground">{source.name}</h3>
                      </div>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">
                        Cadence: {source.frequency}
                      </span>
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
                    >
                      Visit Official Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {source.desc}
                  </p>

                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Extracted Intelligence: </strong>
                    {source.dataExtracted}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Accuracy & Public Scrutiny Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2">
          <div className="font-bold text-base text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground" />
            Community Verification & Error Reporting
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Spot a discrepancy between our parsed ledgers and an official Kenya Gazette notice? Please contact our civic verification team or submit an issue via our developer channels.
          </p>
        </div>

      </div>
    </div>
  );
}
