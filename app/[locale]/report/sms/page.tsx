'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Copy, Check, ShieldCheck, ArrowLeft, Smartphone, Radio, Zap } from 'lucide-react';

export default function ReportSmsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyText = (text: string, type: 'code' | string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedTemplate(type);
        setTimeout(() => setCopiedTemplate(null), 2000);
      }
    }
  };

  const categories = [
    { code: '1', title: 'Vote Buying & Inducement', desc: 'Direct cash, food handouts, airtime or promises in exchange for votes' },
    { code: '2', title: 'Illegal / Dark Donations', desc: 'Foreign financing, anonymous corporate slush funds, kickbacks' },
    { code: '3', title: 'Misuse of Public Resources', desc: 'County or national government vehicles, public halls, civil servants' },
    { code: '4', title: 'Undeclared Campaign Spending', desc: 'Massive unrecorded billboards, chartered aircraft, private jets' },
    { code: '5', title: 'Bribery of Electoral Officials', desc: 'Influencing returning officers, polling clerks, or security personnel' },
    { code: '6', title: 'Intimidation & Electoral Malpractice', desc: 'Harassment of candidates, destruction of promotional material' },
  ];

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/report`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Web Reporting Portal
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground border border-border">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Zero-Rated SMS Gateway
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-foreground">
            Report via Toll-Free SMS
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Report electoral corruption, campaign finance fraud, and public asset misuse instantly from any 2G/3G/4G feature phone or smartphone without internet connectivity.
          </p>
        </div>

        {/* Shortcode Highlight Card */}
        <Card className="border-primary/30 bg-primary/5 shadow-md mb-8 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-primary">Kenyan Dedicated Shortcode</span>
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-foreground">
                  38383
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Toll-free across <strong className="text-foreground">Safaricom</strong>, <strong className="text-foreground">Airtel Kenya</strong>, and <strong className="text-foreground">Telkom Kenya</strong>. No airtime required.
                </p>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => copyText('38383', 'code')}
                className="gap-2 shrink-0 font-semibold"
              >
                {copiedCode ? <Check className="w-4 h-4 text-foreground" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied 38383' : 'Copy Shortcode'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Syntax & Instructions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                SMS Syntax Structure
              </CardTitle>
              <CardDescription>
                Compose your text message using the standardized keyword protocol:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted font-mono text-sm rounded-lg border border-border text-foreground font-semibold flex items-center justify-between">
                <span>REPORT [CODE] [DESCRIPTION] [COUNTY/LOCATION]</span>
                <Badge variant="outline" className="text-xs font-mono">STRICT FORMAT</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-muted/40 rounded-lg border text-xs space-y-1">
                  <div className="font-semibold text-foreground">Example 1: Vote Buying</div>
                  <div className="font-mono text-muted-foreground">
                    REPORT 1 Cash envelopes given at rally Nakuru Town East
                  </div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border text-xs space-y-1">
                  <div className="font-semibold text-foreground">Example 2: State Vehicle</div>
                  <div className="font-mono text-muted-foreground">
                    REPORT 3 County GK lorry ferrying party tents Kisii Market
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Reference Code Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Category Numeric Codes</CardTitle>
              <CardDescription>Insert the corresponding single digit into your message:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {categories.map((cat) => (
                  <div key={cat.code} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {cat.code}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{cat.title}</div>
                        <div className="text-xs text-muted-foreground">{cat.desc}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs shrink-0"
                      onClick={() => copyText(`REPORT ${cat.code} [Describe incident] [Location]`, cat.code)}
                    >
                      {copiedTemplate === cat.code ? (
                        <span className="text-foreground flex items-center gap-1 font-medium"><Check className="w-3.5 h-3.5" /> Copied</span>
                      ) : (
                        <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Template</span>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Whistleblower Security Info */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">
                    Carrier Hash Anonymization
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Incoming SMS numbers are salted and cryptographically hashed at the telco telecom SMSC aggregator before entering the Knight Watch verification database. Your raw phone number is never disclosed to investigators or published in public dossiers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Alternative CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Prefer an interactive dialpad session?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href={`/${locale}/report/ussd`} className="flex-1 sm:flex-initial">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Smartphone className="w-4 h-4" /> Try USSD (*384*11400#)
                </Button>
              </Link>
              <Link href={`/${locale}/report`} className="flex-1 sm:flex-initial">
                <Button size="sm" className="w-full gap-2">
                  <Zap className="w-4 h-4" /> Web Evidence Upload
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
