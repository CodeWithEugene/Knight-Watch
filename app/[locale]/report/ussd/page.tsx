'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Copy, Check, ShieldCheck, ShieldAlert, ArrowLeft, MessageSquare, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function ReportUssdPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [copiedCode, setCopiedCode] = useState(false);

  const [simStep, setSimStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const copyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('*384*11400#');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const restartSim = () => {
    setSimStep(1);
    setSelectedLanguage(null);
    setSelectedCategory(null);
  };

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
            <Smartphone className="w-3.5 h-3.5" />
            Offline Cellular Gateway
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-foreground">
            Report via Interactive USSD
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Dial our national civic watchdog code from any GSM mobile phone in Kenya. No data bundle, internet bundle, or smartphone required. 100% zero-rated.
          </p>
        </div>

        {/* Two Column Layout: USSD Code & Interactive Phone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: USSD Code & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Dial Banner */}
            <Card className="border-primary/30 bg-primary/5 shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-primary">Dial on your keypad</span>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-foreground">
                    *384*11400#
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCode}
                    className="gap-2 font-medium"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-foreground" /> : <Copy className="w-4 h-4" />}
                    {copiedCode ? 'Copied' : 'Copy Code'}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground pt-1">
                  Africa&apos;s Talking live USSD service code: <code className="font-mono font-bold text-foreground">*384*11400#</code>
                </div>
              </CardContent>
            </Card>

            {/* Menu Steps */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">5-Step Dialpad Session</CardTitle>
                <CardDescription>What to expect once you dial the code:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono text-xs flex items-center justify-center font-bold">1</span>
                    <span>Dial *384*11400# from any Kenyan SIM</span>
                  </div>
                  <p className="text-muted-foreground pl-7 text-xs">Works on Safaricom, Airtel, and Telkom lines.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono text-xs flex items-center justify-center font-bold">2</span>
                    <span>Select Incident Category</span>
                  </div>
                  <p className="text-muted-foreground pl-7 text-xs">Vote buying, public fund abuse, undeclared spend, or bribery.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono text-xs flex items-center justify-center font-bold">3</span>
                    <span>Enter Short Description</span>
                  </div>
                  <p className="text-muted-foreground pl-7 text-xs">Summarize what you saw (max 160 characters).</p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono text-xs flex items-center justify-center font-bold">4</span>
                    <span>State County or Ward</span>
                  </div>
                  <p className="text-muted-foreground pl-7 text-xs">Where the incident occurred for GIS pinpointing.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-foreground font-mono text-xs flex items-center justify-center font-bold">5</span>
                    <span>Confirm & Receive Tracking ID</span>
                  </div>
                  <p className="text-muted-foreground pl-7 text-xs">An SMS receipt is dispatched with your secret cryptographic tracking hash.</p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Guarantee */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>Zero-Trace Whistleblower Guarantee</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Telecommunications providers route USSD traffic through our stateless endpoint. Your phone number is never logged in unhashed form, preventing any correlation to your identity.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Phone Simulator */}
          <div className="lg:col-span-5">
            <Card className="shadow-lg border-2 border-border/80 bg-card overflow-hidden">
              <div className="bg-muted px-4 py-3 border-b flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5 font-bold text-foreground">
                  <Smartphone className="w-4 h-4 text-primary" /> Interactive USSD Simulator
                </span>
                <span className="text-[10px] bg-background px-2 py-0.5 rounded border">GSM Session</span>
              </div>

              <CardContent className="p-6">
                <div className="bg-neutral-900 text-neutral-100 rounded-xl p-5 font-mono shadow-inner border border-neutral-800 space-y-4 min-h-[300px] flex flex-col justify-between">
                  {simStep === 1 && (
                    <div className="space-y-4">
                      <div className="text-xs text-white font-semibold border-b border-neutral-800 pb-2 flex items-center justify-between">
                        <span>KNIGHT WATCH KENYA</span>
                        <span className="text-[10px]">DIAL: *384*11400#</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>Select Language / Chagua Lugha:</p>
                        <p className="text-neutral-300">1. English</p>
                        <p className="text-neutral-300">2. Kiswahili</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full text-xs font-mono h-8 bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                          onClick={() => { setSelectedLanguage('English'); setSimStep(2); }}
                        >
                          1 (English)
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full text-xs font-mono h-8 bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                          onClick={() => { setSelectedLanguage('Kiswahili'); setSimStep(2); }}
                        >
                          2 (Kiswahili)
                        </Button>
                      </div>
                    </div>
                  )}

                  {simStep === 2 && (
                    <div className="space-y-4">
                      <div className="text-xs text-foreground font-semibold border-b border-neutral-800 pb-2">
                        REPORT CATEGORY
                      </div>
                      <div className="text-xs space-y-1 text-neutral-300">
                        <p>1. Vote Buying / Cash</p>
                        <p>2. State Vehicles / Assets</p>
                        <p>3. Campaign Over-spending</p>
                        <p>4. Other Malpractice</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {['Vote Buying', 'Public Assets', 'Over-spending', 'Other'].map((cat, i) => (
                          <Button
                            key={cat}
                            size="sm"
                            variant="secondary"
                            className="text-[11px] font-mono h-8 bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                            onClick={() => { setSelectedCategory(cat); setSimStep(3); }}
                          >
                            {i + 1}. {cat}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {simStep === 3 && (
                    <div className="space-y-4">
                      <div className="text-xs text-foreground font-semibold border-b border-neutral-800 pb-2">
                        ENTER LOCATION
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Enter County or Sub-county where incident occurred:
                      </p>
                      <div className="p-2 bg-neutral-800 rounded text-xs text-neutral-300 font-mono border border-neutral-700">
                        Nairobi (Lang&apos;ata)
                      </div>
                      <Button
                        size="sm"
                        className="w-full text-xs font-mono h-8 bg-white hover:bg-neutral-200 text-black font-semibold"
                        onClick={() => setSimStep(4)}
                      >
                        Submit &gt;
                      </Button>
                    </div>
                  )}

                  {simStep === 4 && (
                    <div className="space-y-4 text-center py-4">
                      <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                      <div className="text-xs font-bold text-white">
                        REPORT TRANSMITTED!
                      </div>
                      <p className="text-[11px] text-neutral-300">
                        Report ID #KW-9842 lodged. An encrypted confirmation SMS was sent to your phone.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs font-mono h-8 bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200 mt-2"
                        onClick={restartSim}
                      >
                        Restart Simulation
                      </Button>
                    </div>
                  )}

                  <div className="text-[10px] text-neutral-500 flex justify-between pt-2 border-t border-neutral-800">
                    <span>Active Session</span>
                    <span>Toll-Free • 0.00 KSh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
