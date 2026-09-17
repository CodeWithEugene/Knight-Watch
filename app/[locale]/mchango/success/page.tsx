'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Copy, Check, ShieldCheck, ArrowRight, HeartHandshake, BarChart3, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ALL_PARTIES } from '@/lib/partyData';

function MchangoSuccessContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  
  const amount = searchParams.get('amount') || '2500';
  const partyParam = (searchParams.get('party') || 'uda').toLowerCase();
  const reference = searchParams.get('reference') || 'MCH-' + Math.floor(100000 + Math.random() * 900000);
  
  const [copied, setCopied] = useState(false);

  const matchedParty = ALL_PARTIES.find(p => p.slug === partyParam || p.acronym.toLowerCase() === partyParam) || ALL_PARTIES[0];

  const copyRef = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 lg:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Header Confirmation */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-muted text-foreground flex items-center justify-center mx-auto shadow-sm ring-8 ring-muted/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Contribution Received
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you for powering transparent civic campaign finance. Your contribution has been verified and registered on the public ledger.
          </p>
        </div>

        {/* Contribution Details Card */}
        <Card className="shadow-md border-border/80 overflow-hidden mb-8">
          <div className="bg-muted/60 px-6 py-3 border-b flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground uppercase tracking-wider">
              Contribution Certificate
            </span>
            <Badge variant="secondary" className="text-[11px] font-mono">
              ORPP COMPLIANT
            </Badge>
          </div>

          <CardContent className="p-6 space-y-6">
            
            {/* Amount & Party Display */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/40 border border-border">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground font-medium">Contributed Amount</span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                  KSh {Number(amount).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-background p-2.5 rounded-lg border border-border/80 shadow-xs">
                <div className="w-10 h-10 relative rounded overflow-hidden flex items-center justify-center bg-white p-1">
                  <Image
                    src={matchedParty.logo}
                    alt={matchedParty.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-foreground">{matchedParty.acronym}</div>
                  <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">{matchedParty.name}</div>
                </div>
              </div>
            </div>

            {/* Reference Number */}
            <div className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg text-xs">
              <div>
                <span className="text-muted-foreground block">Transaction Reference</span>
                <span className="font-mono font-bold text-foreground">{reference}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyRef}
                className="h-8 gap-1 text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-foreground" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>

            {/* Statutory Transparency Statement */}
            <div className="space-y-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/40">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Legal Ceiling & Transparency Declaration
              </div>
              <p className="leading-relaxed">
                Under Section 12 of the Political Parties Act, individual contributions cannot exceed 5% of total party expenditure ceiling. Your transaction is logged in public aggregates without disclosing private identification or account numbers.
              </p>
            </div>

          </CardContent>

          <CardFooter className="bg-muted/20 px-6 py-4 border-t flex flex-col sm:flex-row gap-3">
            <Link href={`/${locale}/mchango/transparency`} className="w-full sm:flex-1">
              <Button variant="outline" className="w-full gap-2 text-xs font-semibold">
                <BarChart3 className="w-3.5 h-3.5" /> Aggregate Dashboard
              </Button>
            </Link>
            <Link href={`/${locale}/mchango`} className="w-full sm:flex-1">
              <Button className="w-full gap-2 text-xs font-semibold">
                Contribute Again <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}

export default function MchangoSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading confirmation...</div>
      </div>
    }>
      <MchangoSuccessContent />
    </Suspense>
  );
}
