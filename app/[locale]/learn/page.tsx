'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Calendar, 
  HelpCircle, 
  Download, 
  Calculator, 
  ArrowRight,
  ShieldAlert,
  Coins,
  Search,
  ExternalLink,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const learnModules = [
  {
    href: '/learn/funding-overview',
    title: 'Campaign Funding Overview',
    desc: 'How Kenyan political parties and candidates generate revenue: state subventions, membership dues, and private donations.',
    icon: Coins,
    tag: 'Foundation',
    badgeVariant: 'secondary' as const,
    readTime: '4 min read'
  },
  {
    href: '/learn/ppf',
    title: 'The 0.3% Political Parties Fund',
    desc: 'Deep dive into Kenya’s statutory funding pool established under Section 24 of the Political Parties Act.',
    icon: FileText,
    tag: 'Statutory Fund',
    badgeVariant: 'default' as const,
    readTime: '6 min read'
  },
  {
    href: '/learn/formula',
    title: 'PPF Allocation Formula',
    desc: 'The mathematical breakdown: 70% vote share, 15% special interest groups, 10% elected reps, and 5% ORPP admin.',
    icon: Scale,
    tag: 'Mathematical Model',
    badgeVariant: 'secondary' as const,
    readTime: '5 min read'
  },
  {
    href: '/learn/spending-limits',
    title: 'Legal Campaign Spending Limits',
    desc: 'History of the Election Campaign Financing Act 2013, the 2021 Parliament revocation, and ongoing High Court petitions.',
    icon: ShieldAlert,
    tag: 'Legal Precedent',
    badgeVariant: 'outline' as const,
    readTime: '7 min read'
  },
  {
    href: '/learn/expenditure-period',
    title: 'Expenditure Periods & Election Calendar',
    desc: 'Statutory 6-month pre-election expenditure windows and post-election audit disclosure requirements leading to 2027.',
    icon: Calendar,
    tag: 'Election Timeline',
    badgeVariant: 'secondary' as const,
    readTime: '4 min read'
  },
  {
    href: '/learn/faq',
    title: 'Frequently Asked Questions',
    desc: 'Answers to citizen queries on whistleblower anonymity, reporting procedures, vote-buying penalties, and legal definitions.',
    icon: HelpCircle,
    tag: 'Citizen Q&A',
    badgeVariant: 'secondary' as const,
    readTime: '5 min read'
  },
  {
    href: '/learn/glossary',
    title: 'Civic & Electoral Glossary',
    desc: 'Comprehensive glossary explaining acronyms and terminology: ORPP, IEBC, SIG, PPF, ECF Act, and more.',
    icon: BookOpen,
    tag: 'Reference',
    badgeVariant: 'secondary' as const,
    readTime: '3 min read'
  },
  {
    href: '/learn/download',
    title: 'Downloadable Civic Resources',
    desc: 'Access printable cheat sheets, citizen reporting guidebooks, and official Kenya Gazette notice repositories.',
    icon: Download,
    tag: 'Toolkit',
    badgeVariant: 'secondary' as const,
    readTime: 'Free PDF Downloads'
  },
];

export default function LearnPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [search, setSearch] = useState('');

  const filtered = learnModules.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.desc.toLowerCase().includes(search.toLowerCase()) ||
    m.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <GraduationCap className="w-3.5 h-3.5" />
            Civic Education & Electoral Law Academy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Demystifying Political Money in Kenya
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Understand how billions of taxpayer shillings flow to political parties, the legal mechanisms governing campaign spending, and the constitutional rights that empower you as an engaged citizen.
          </p>
        </div>

        {/* Interactive Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search guides, laws, formulas, or acronyms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card text-sm h-10 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href={`/${locale}/calculator`} className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold w-full">
                <Calculator className="w-3.5 h-3.5 text-primary" />
                Interactive PPF Calculator
              </Button>
            </Link>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.href}
                className="relative group border-border bg-card hover:bg-secondary/70 dark:hover:bg-secondary/40 hover:border-foreground/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={module.badgeVariant} className="text-[10px] font-semibold tracking-wide">
                      {module.tag}
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/${locale}${module.href}`} className="after:absolute after:inset-0">
                        {module.title}
                      </Link>
                    </CardTitle>
                    <Icon className="w-7 h-7 text-foreground shrink-0 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1" />
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {module.desc}
                  </CardDescription>
                </CardContent>

                <CardFooter className="pt-0 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-3">
                  <span>{module.readTime}</span>
                  <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Statutory Anchors Section */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-2 mb-6">
            <h2 className="text-lg sm:text-xl font-bold font-display text-foreground">
              Primary Kenyan Legal Foundations
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              All intelligence and educational materials on Knight Watch are grounded in constitutional provisions and statutory acts of Parliament:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
              <div className="font-bold text-foreground flex items-center justify-between">
                <span>Article 88(4)(i)</span>
                <span className="text-[10px] font-mono text-muted-foreground">CONST. 2010</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mandates the Independent Electoral and Boundaries Commission (IEBC) to regulate the amount of money spent by or on behalf of a candidate or party in any election.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
              <div className="font-bold text-foreground flex items-center justify-between">
                <span>Political Parties Act</span>
                <span className="text-[10px] font-mono text-muted-foreground">NO. 11 OF 2011</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Establishes the Political Parties Fund, specifying 0.3% of national revenue, allocation rules, financial accountability, and auditing by the Auditor-General.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
              <div className="font-bold text-foreground flex items-center justify-between">
                <span>Election Offences Act</span>
                <span className="text-[10px] font-mono text-muted-foreground">NO. 37 OF 2016</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Criminalizes vote buying, state vehicle and equipment abuse, undue influence, bribery of electoral officers, and improper campaign financing inducements.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
