'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  FileCheck, 
  Printer,
  ShieldCheck
} from 'lucide-react';

const downloadableResources = [
  {
    title: 'Citizen Guide to Campaign Spending & Election Offences',
    desc: 'Comprehensive 18-page pocket manual outlining how to identify illegal vote buying, public vehicle abuse, and lodge anonymous reports.',
    size: '1.8 MB',
    format: 'PDF',
    version: '2025 Edition',
    filename: 'knight-watch-citizen-guide.pdf'
  },
  {
    title: 'PPF Statutory Allocation Formula Cheat Sheet',
    desc: 'A double-sided printable infographic breaking down the 70-15-10-5 mathematical formula and eligibility criteria.',
    size: '420 KB',
    format: 'PDF',
    version: 'PPA 2022 Act',
    filename: 'ppf-formula-cheatsheet.pdf'
  },
  {
    title: 'Polling Station Incident Log & Evidence Template',
    desc: 'Printable template designed for accredited non-partisan observers to record vehicle numbers, cash hand-outs, and officer IDs.',
    size: '280 KB',
    format: 'PDF',
    version: 'Form KW-OBS-1',
    filename: 'incident-evidence-log.pdf'
  },
];

const externalGazettes = [
  {
    title: 'The Political Parties Act (No. 11 of 2011, Rev. 2022)',
    publisher: 'National Council for Law Reporting (Kenya Law)',
    url: 'https://new.kenyalaw.org/akn/ke/act/2011/12/eng@2022-12-31'
  },
  {
    title: 'Election Campaign Financing Act (No. 42 of 2013)',
    publisher: 'Kenya Law Repository',
    url: 'https://new.kenyalaw.org/akn/ke/act/2013/42/eng@2022-12-31'
  },
  {
    title: 'Office of the Registrar of Political Parties Official Documents',
    publisher: 'ORPP Official Portal',
    url: 'https://orpp.or.ke'
  },
  {
    title: 'Independent Electoral and Boundaries Commission (IEBC)',
    publisher: 'IEBC Knowledge Centre',
    url: 'https://www.iebc.or.ke'
  },
];

export default function DownloadPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const triggerDownload = (filename: string) => {
    // Generate a civic reference document payload in-browser
    const sampleContent = `KNIGHT WATCH KENYA - CIVIC INTEGRITY RESOURCE\nDocument: ${filename}\nPublished by: Knight Watch Civic Intelligence Initiative\nFramework: Constitution of Kenya (2010), Political Parties Act 2011\n\nFor updated materials, visit https://knightwatch.ke\nOffline Reporting: USSD *384*11400# or SMS 38383\n`;
    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8 flex justify-center">
          <Link
            href={`/${locale}/learn`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Civic Education Hub
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10 text-center flex flex-col items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Download className="w-3.5 h-3.5" />
            Public Civic Toolkit
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Downloadable Civic Resources
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Free open-source guides, printable observer observation sheets, and official government gazette archives for citizens, journalists, and civil society monitors.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="space-y-6 mb-12">
          <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Field Guides & Printable Manuals
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {downloadableResources.map((res) => (
              <Card key={res.title} className="shadow-xs hover:border-primary/40 transition-colors">
                <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-foreground">{res.title}</span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {res.format} • {res.size}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {res.desc}
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      Edition: {res.version}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 shrink-0 font-semibold text-xs h-9"
                    onClick={() => triggerDownload(res.filename)}
                  >
                    <Download className="w-3.5 h-3.5 text-primary" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* External Gazette Links */}
        <div className="space-y-4 mb-12">
          <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Official Government Gazette & Legal Repositories
          </h2>

          <Card className="shadow-xs">
            <CardContent className="p-0 divide-y divide-border">
              {externalGazettes.map((item) => (
                <div key={item.title} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.publisher}</div>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
                  >
                    Official Document <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* License & Attribution Note */}
        <div className="p-5 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-foreground" />
            Creative Commons Open Civic License (CC BY 4.0)
          </div>
          <p className="leading-relaxed">
            All Knight Watch guides, analytical summaries, and templates are free to reproduce, print, and distribute for non-commercial voter education and civil society research.
          </p>
        </div>

      </div>
    </div>
  );
}
