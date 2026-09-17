'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPartyBySlug, KENYAN_PARTIES } from '@/lib/partyData';

export default function TransparencyPartyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const partyParam = (params?.party as string) || '';

  const party = getPartyBySlug(partyParam) || KENYAN_PARTIES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      <Link
        href={`/${locale}/transparency`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Transparency Index Rankings</span>
      </Link>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-background border border-border p-2 flex items-center justify-center flex-shrink-0 shadow-sm">
            <img src={party.logo} alt={party.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                {party.name}
              </h1>
              <Badge variant="outline" className="font-mono text-xs">
                {party.acronym}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ORPP Registered · Leader: <span className="font-medium text-foreground">{party.leader}</span>
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs uppercase font-semibold text-muted-foreground">Composite Index</p>
          <p className="font-display font-black text-3xl text-foreground">
            {party.transparencyScore}/100
          </p>
        </div>
      </div>

      {/* Index Components */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Index Evaluation Breakdown
            </h2>
            <p className="text-xs text-muted-foreground">
              Statutory verification results and weights
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            Quarterly Audit
          </Badge>
        </div>

        <div className="space-y-4">
          {party.breakdown.map((c) => (
            <div
              key={c.label}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-muted/20 gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {c.status === 'clean' ? (
                    <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0" />
                  ) : c.status === 'partial' ? (
                    <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <p className="font-semibold text-sm text-foreground">{c.label}</p>
                </div>
                <p className="text-xs text-muted-foreground pl-6">{c.value}</p>
              </div>

              <div className="flex items-center gap-3 pl-6 sm:pl-0">
                <Badge variant={c.status === 'clean' ? 'success' : 'secondary'} className="text-xs capitalize">
                  {c.status}
                </Badge>
                <span className="font-mono font-bold text-xs text-muted-foreground">
                  {c.weight}% Weight
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Methodology */}
      <Card className="p-6 space-y-3">
        <h2 className="font-display font-bold text-xl text-foreground">
          Index Calculation Methodology
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Transparency Index is formulated quarterly by independent civic researchers in alignment with Transparency International Kenya (TI-Kenya) and statutory benchmarks from Section 26 of the Political Parties Act (Cap 7D) and the Election Campaign Financing Act (2013).
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Weights are distributed across timely gazette disclosure of audited financial accounts, PPF compliance certifications by the Kenya National Audit Office (KENAO), transparency of public crowdfunding ledgers, and institutional responsiveness to citizen incident reports.
        </p>
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href={`/${locale}/dashboard/parties/${party.slug}`}>
              <span>View Full Party Dossier</span>
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/${locale}/transparency`}>
              <span>Compare All Parties</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
