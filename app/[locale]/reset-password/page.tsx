'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { validatePassword } from '@/lib/password';
import { getSafeCallbackUrl } from '@/lib/authRedirect';
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

function ResetPasswordForm() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'), locale);

  const [checking, setChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      setTokenValid(false);
      return;
    }
    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
      .then((res) => res.json().catch(() => ({ valid: false })))
      .then((data) => setTokenValid(Boolean(data.valid)))
      .catch(() => setTokenValid(false))
      .finally(() => setChecking(false));
  }, [token]);

  const pwValidation = validatePassword(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!pwValidation.valid) {
      setError(pwValidation.error ?? 'Password does not meet requirements.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Reset failed. Please request a new link.');
        if (res.status === 400) setTokenValid(false);
        return;
      }
      setDone(true);
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const loginHref = `/${locale}/login${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`;
  const forgotHref = `/${locale}/forgot-password${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground">
            Set New Password
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose a strong password for your Knight Watch account.
          </p>
        </div>

        <Card className="shadow-lg border-border/80">
          {checking ? (
            <CardContent className="py-12 text-center">
              <div className="animate-pulse text-muted-foreground text-sm">Verifying reset link...</div>
            </CardContent>
          ) : done ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">Password Updated</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    SECURE SSL
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Your password has been reset. Sign in with your new password to continue.</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Link href={loginHref} className="w-full">
                  <Button className="w-full font-bold text-xs h-10 gap-2">
                    Continue to Sign In <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </>
          ) : !tokenValid ? (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold">Link Invalid or Expired</CardTitle>
                <CardDescription className="text-xs">
                  Reset links expire after 1 hour and work only once.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>This reset link is invalid or has expired. Please request a new one.</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Link href={forgotHref} className="w-full">
                  <Button variant="outline" className="w-full font-bold text-xs h-10">
                    Request New Link
                  </Button>
                </Link>
              </CardFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">New Password</CardTitle>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    SECURE SSL
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="pl-9 h-10 text-sm bg-card"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-0.5">
                    Must include uppercase, lowercase, number, and special character.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      placeholder="Repeat your new password"
                      className="pl-9 h-10 text-sm bg-card"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                  {loading ? 'Updating...' : 'Update Password'} <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>

      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading password reset...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
