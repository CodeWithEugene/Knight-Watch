'use client';

import { useState, Suspense, useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { validatePassword } from '@/lib/password';
import { getSafeCallbackUrl } from '@/lib/authRedirect';
import { ShieldCheck, Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

function SignupForm() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'), locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Guard against overlapping submissions (rapid double-click / Enter+click races).
  const submittingRef = useRef(false);

  const pwValidation = validatePassword(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError('');
    if (!pwValidation.valid) {
      setError(pwValidation.error ?? 'Password does not meet requirements.');
      submittingRef.current = false;
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      const signInRes = await signIn('credentials', { email, password, redirect: false });
      if (!signInRes || signInRes.error || signInRes.ok === false) {
        setError('Account created but automatic sign-in failed. Please sign in manually.');
        setLoading(false);
        return;
      }
      await router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
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
            Join Knight Watch
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Create an account to save favorite counties, set alerts, and track reports.
          </p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-lg border-border/80">
          <form onSubmit={handleSubmit}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">New Account Registration</CardTitle>
                <Badge variant="outline" className="text-[10px] font-mono">
                  CITIZEN ACCESS
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Enter your details to create your secure profile.
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
                <label className="text-xs font-semibold text-foreground">Full Name (Optional)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eugene Gabriel"
                    className="pl-9 h-10 text-sm bg-card"
                  />
                </div>
              </div>

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
                <label className="text-xs font-semibold text-foreground">Password</label>
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
                  Must include uppercase, lowercase, numbers, and at least 8 characters.
                </p>
              </div>

              <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-foreground shrink-0" />
                <span>We respect your digital sovereignty. No spam, ever.</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                {loading ? (
                  <><Spinner data-icon="inline-start" /> Creating Account...</>
                ) : (
                  <>Register Account <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground pt-1">
                Already registered?{' '}
                <Link
                  href={`/${locale}/login${callbackUrl !== `/${locale}` ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading registration...</div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
