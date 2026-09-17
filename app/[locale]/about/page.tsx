'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { 
  ShieldCheck, 
  Eye, 
  Coins, 
  Scale, 
  Building, 
  Users, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="space-y-4 mb-12 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-3">
            <BrandLogo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Independent Civic Watchdog
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Defending Electoral Integrity Through Transparency
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Knight Watch Kenya is a non-partisan civic technology platform built to track campaign financing, liberate public expenditure ledgers, and protect citizens who expose electoral corruption.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <Card className="shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Eye className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">1. Civic Whistleblower Shield</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Zero-knowledge architecture ensuring citizens can report vote buying, state vehicle misuse, and bribery anonymously without risk of state or partisan retaliation.
            </CardContent>
          </Card>

          <Card className="shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Scale className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">2. Data Liberation & Audit</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We extract and index hundreds of pages of PDF statutory gazettes from the ORPP, OAG, and IEBC, making political money searchable, comparable, and transparent.
            </CardContent>
          </Card>

          <Card className="shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Coins className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">3. Transparent Crowdfunding</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our Mchango engine enables clean grassroots micro-donations to registered political parties, strictly enforcing Section 12 donation ceilings and eliminating dark money.
            </CardContent>
          </Card>

          <Card className="shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">4. Offline Universal Access</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Bridging the digital divide with toll-free USSD (<code className="font-bold text-foreground">*384*11400#</code>) and SMS (<code className="font-bold text-foreground">38383</code>) reporting channels for every Kenyan voter.
            </CardContent>
          </Card>
        </div>

        {/* Institutional Heritage & Partners */}
        <div className="space-y-6 mb-12">
          <Card className="shadow-sm border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Institutional Heritage & Hackathon Roots</CardTitle>
              <CardDescription className="text-xs">
                Rooted in non-partisan civil society collaboration:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                The platform was initially developed for the <strong className="text-foreground">Transparency International Kenya (TI-Kenya) Campaign Finance Watch Tool Hackathon</strong> in partnership with Strathmore University’s <strong className="text-foreground">@iLabAfrica</strong>.
              </p>
              <p>
                This initiative operates within the framework of the <strong className="text-foreground">Kenya Institutional Strengthening Program (KISP)</strong>, implemented in consortium with the Electoral Law and Governance Institute for Africa (ELGIA), URAI Trust, and the Centre for Multiparty Democracy (CMD-Kenya), with development cooperation support from the Foreign, Commonwealth & Development Office (FCDO).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Banner */}
        <div className="p-8 rounded-2xl bg-card border border-border shadow-xs text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black font-display text-foreground">
            Stand Up for Kenyan Democracy
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Whether you are a voter in Mandera, a student in Eldoret, or a civil servant in Nairobi, your vigilance protects our constitutional democracy.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/report`}>
              <Button className="font-bold text-xs gap-2">
                Report Malpractice <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href={`/${locale}/learn`}>
              <Button variant="outline" className="font-bold text-xs">
                Explore Civic Education
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
