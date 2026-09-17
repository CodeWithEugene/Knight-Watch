'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, SlidersHorizontal, BellRing, Save } from 'lucide-react';

export default function AlertsPreferencesPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  
  const [freq, setFreq] = useState('weekly');
  const [minAmount, setMinAmount] = useState('any');
  const [onlyVerified, setOnlyVerified] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/alerts`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Alerts
          </Link>
        </div>

        <div className="space-y-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-primary" />
            Alert Preferences
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Configure how and when Knight Watch delivers civic alerts to your inbox.
          </p>
        </div>

        <Card className="shadow-md border-border/80">
          <form onSubmit={handleSave}>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold">Delivery Cadence & Filters</CardTitle>
              <CardDescription className="text-xs">
                Fine-tune your notification thresholds.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Frequency Radios */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Dispatch Frequency
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'daily', title: 'Daily Digest', desc: 'Summary of all reports lodged in the past 24 hours' },
                    { id: 'weekly', title: 'Weekly Watchdog Brief', desc: 'Comprehensive weekend breakdown with data charts' },
                    { id: 'realtime', title: 'Real-Time Breaking Alerts', desc: 'Instant alerts when high-risk verified reports are published' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        freq === option.id
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="freq"
                        value={option.id}
                        checked={freq === option.id}
                        onChange={() => setFreq(option.id)}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="font-semibold text-foreground block">{option.title}</span>
                        <span className="text-muted-foreground">{option.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Threshold Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Financial Impact Floor
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'any', label: 'All Incidents' },
                    { id: '1m', label: '> KSh 1,000,000' },
                    { id: '10m', label: '> KSh 10,000,000' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setMinAmount(tier.id)}
                      className={`p-2.5 rounded-lg border font-medium text-center transition-all ${
                        minAmount === tier.id
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only Checkbox */}
              <div className="p-3 bg-muted/40 rounded-lg border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-foreground block">Only Verified Incidents</span>
                  <span className="text-[11px] text-muted-foreground">Skip pending or uncorroborated submissions</span>
                </div>
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded cursor-pointer"
                />
              </div>
            </CardContent>

            <CardFooter className="pt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {saved && <span className="text-foreground font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Preferences Saved!</span>}
              </span>
              <Button type="submit" className="text-xs font-bold gap-1.5 h-9">
                <Save className="w-3.5 h-3.5" /> Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>

      </div>
    </div>
  );
}
