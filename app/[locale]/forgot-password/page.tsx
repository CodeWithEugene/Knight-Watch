'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { getSafeCallbackUrl } from '@/lib/authRedirect';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

function ForgotPasswordForm() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'), locale);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, callbackUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      if (typeof data.devResetUrl === 'string') setDevResetUrl(data.devResetUrl);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Forgot Password
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your account email and we will send you a one-time reset link.
          </p>
        </div>

        <Card className="shadow-lg border-border/80">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">Password Recovery</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    SECURE SSL
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  The link expires in 1 hour and can only be used once.
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
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                  {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Link
                  href={`/${locale}/login${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
              </CardFooter>
            </form>
          ) : (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold">Check Your Email</CardTitle>
                <CardDescription className="text-xs">
                  If an account exists for this email, a reset link is on its way.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Reset link sent. It expires in 1 hour and works only once. Didn&apos;t get it? Check spam, then try again.</span>
                </div>
                {devResetUrl && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-[11px] text-muted-foreground space-y-1.5">
                    <p className="font-semibold text-foreground">Development mode — no email provider configured:</p>
                    <Link href={devResetUrl} className="text-primary font-semibold hover:underline break-all">
                      Open your reset link
                    </Link>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                <Link
                  href={`/${locale}/login${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
              </CardFooter>
            </>
          )}
        </Card>

      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading password recovery...</div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}
