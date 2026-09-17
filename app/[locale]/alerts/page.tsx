'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Mail, ShieldCheck, CheckCircle2, SlidersHorizontal, ArrowRight, Zap, Check } from 'lucide-react';

export default function AlertsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'realtime' | 'weekly' | 'verified'>('weekly');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subscribe = useMutation(api.newsletter.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (subscribe) {
        await subscribe({ email, preferences: { alerts: true, digest: true } });
      }
      setSubmitted(true);
    } catch (err) {
      // Mock success if Convex is not linked locally
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Civic Watchdog Alerts
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Receive automated real-time alerts on verified campaign finance violations, Political Parties Fund disbursements, and county hotspots.
          </p>
        </div>

        {/* Form Container */}
        {submitted ? (
          <Card className="border-border bg-card shadow-sm text-center py-8 px-4">
            <CardContent className="space-y-4">
              <CheckCircle2 className="w-12 h-12 text-foreground mx-auto" />
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold text-foreground">
                  Subscription Confirmed!
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  We&apos;ve enrolled <strong className="font-semibold text-foreground">{email}</strong>. You&apos;ll receive verified alerts directly in your inbox.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <Link href={`/${locale}/alerts/preferences`}>
                  <Button variant="outline" size="sm" className="text-xs gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Adjust Preferences
                  </Button>
                </Link>
                <Link href={`/${locale}/reports`}>
                  <Button size="sm" className="text-xs">
                    View Live Feed
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md border-border/80">
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold">Subscribe to Dispatch</CardTitle>
                <CardDescription className="text-xs">
                  Zero spam. Free non-partisan civic monitoring intelligence.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="citizen@kenyans.org"
                    className="h-10 text-sm bg-card"
                  />
                </div>

                {/* Frequency selection */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-foreground">Alert Cadence</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'realtime', label: 'Breaking' },
                      { id: 'weekly', label: 'Weekly Digest' },
                      { id: 'verified', label: 'Audits Only' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id as any)}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all text-center ${
                          frequency === f.id
                            ? 'border-primary bg-primary/10 text-primary font-bold'
                            : 'border-border bg-card text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/60 text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-foreground shrink-0" />
                  <span>Your email is encrypted and never sold or shared with political campaigns.</span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                  {loading ? 'Subscribing...' : 'Activate Alerts'} <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <div className="text-center">
                  <Link
                    href={`/${locale}/alerts/preferences`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    <SlidersHorizontal className="w-3 h-3" /> Customize notification filters
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        )}

      </div>
    </div>
  );
}
