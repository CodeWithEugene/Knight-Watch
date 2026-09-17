'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { getSafeCallbackUrl } from '@/lib/authRedirect';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

function getErrorMessage(errorParam: string | null): string {
  if (errorParam === 'Configuration') return 'Sign-in is temporarily unavailable. Please try again later or contact support.';
  if (errorParam === 'SigninFailed') return 'Sign-in failed. Please verify credentials and try again.';
  if (errorParam === 'Credentials') return 'Invalid email or password.';
  return '';
}

function LoginForm() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'), locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Guard against overlapping submissions (rapid double-click / Enter+click races).
  const submittingRef = useRef(false);

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) setError(getErrorMessage(err));
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError('');
    setLoading(true);
    try {
      // NB: no callbackUrl is passed to signIn on purpose — it defaults to the
      // absolute page URL, which keeps the client's response parsing safe.
      // Navigation to the intended page happens explicitly below.
      const res = await signIn('credentials', { email, password, redirect: false });
      // Only navigate on an explicit success — never push an ambiguous
      // response, which would bounce off the login wall and look like a dead click.
      if (!res || res.error || res.ok === false) {
        const isConfigError =
          res?.error === 'Configuration' ||
          res?.error?.toLowerCase().includes('configuration') ||
          res?.url?.includes('error=Configuration');
        setError(
          isConfigError
            ? 'Sign-in is temporarily unavailable. Please try again later or contact support.'
            : 'Invalid email or password.'
        );
        return;
      }
      // Force a full page load so the new session cookie is read server-side.
      // router.push + router.refresh races the RSC cache: the destination can
      // render with the stale (signed-out) session, which looks like a dead
      // click and forces the user to click Sign In a second time.
      window.location.href = callbackUrl;
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo & Headline */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Citizen Sign In
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Log in to monitor reports, participate in Mchango, or manage alert preferences.
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-border/80">
          <form onSubmit={handleSubmit}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Account Credentials</CardTitle>
                <Badge variant="outline" className="text-[10px] font-mono">
                  SECURE SSL
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Enter your verified email and password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@domain.ke"
                    className="pl-9 h-10 text-sm bg-card"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Password</label>
                  <Link
                    href={`/${locale}/forgot-password${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                    className="text-[11px] text-primary font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm bg-card"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-foreground shrink-0" />
                <span>Zero tracking on whistleblower reports even when logged in.</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                {loading ? (
                  <><Spinner data-icon="inline-start" /> Authenticating...</>
                ) : (
                  <>Sign In <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground pt-1">
                Don&apos;t have an account yet?{' '}
                <Link
                  href={`/${locale}/signup${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Create one here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Anonymity note */}
        <p className="text-center text-[11px] text-muted-foreground max-w-xs mx-auto">
          Remember: You do <strong className="text-foreground">not</strong> need to sign in to submit anonymous whistleblower evidence.
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading sign in...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
