'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Knight Watch
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Scale className="w-3.5 h-3.5" />
            Civic Platform Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Terms & Civic Use Covenant
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            By accessing Knight Watch Kenya, contributing to Mchango, or submitting evidence, you agree to these non-partisan terms of public service.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">1. Non-Partisan Mission & Purpose</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Knight Watch Kenya exists solely as an independent, non-partisan public watchdog platform. We do not endorse, sponsor, or campaign for any political party, candidate, or coalition. All registered Kenyan political parties and public candidates are evaluated under identical statutory standards.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">2. Good-Faith Evidence & Reporting Integrity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Citizens agree to submit incident reports in good faith, grounded in direct personal observation or verifiable documentary evidence. Fabricating evidence, doctoring media files, or submitting vexatious claims intended to slander political opponents is strictly prohibited.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">3. Mchango Crowdfunding Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Contributions routed through the Mchango gateway are processed under Section 12 of the Political Parties Act. Individual contributions cannot exceed statutory limits. Knight Watch does not retain private donor funds and disburses verified proceeds directly to the designated official party accounts.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">4. Open Data License (CC BY 4.0)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                All aggregate data tables, parsed gazette datasets, and statistical summaries published on Knight Watch are released under the Creative Commons Attribution 4.0 International License (CC BY 4.0). You are free to share and adapt the material for non-commercial or journalistic research provided appropriate attribution is given.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
