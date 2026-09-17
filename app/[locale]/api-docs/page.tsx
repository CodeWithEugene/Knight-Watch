'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  FileSpreadsheet, 
  Layers, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';

export default function ApiDocsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://knightwatch.ke';
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  const mapEmbedCode = `<iframe src="${base}/${locale}/embed/map" width="100%" height="480" frameborder="0" title="Knight Watch Kenya - Incident Map"></iframe>`;
  const chartEmbedCode = `<iframe src="${base}/${locale}/embed/chart" width="100%" height="380" frameborder="0" title="Knight Watch Kenya - Violation Categories"></iframe>`;

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Code2 className="w-3.5 h-3.5" />
            Open Civic Data API
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            API Documentation & Embeds
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Integrate verified Kenyan campaign finance intelligence into your newsroom CMS, civic dashboards, and academic research pipelines.
          </p>
        </div>

        {/* Endpoints */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Public REST Endpoints
          </h2>

          {/* Endpoint 1 */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-xs">GET</Badge>
                  <code className="text-sm font-bold font-mono text-foreground">/api/export/reports</code>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">No Auth Required</Badge>
              </div>
              <CardDescription className="text-xs">
                Export verified and reviewed incident reports in CSV or JSON format.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-muted rounded-lg font-mono text-xs flex items-center justify-between">
                <span className="truncate">{`${base}/api/export/reports?format=csv`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(`${base}/api/export/reports?format=csv`, 'ep1')}
                  className="h-7 text-[11px] gap-1 shrink-0"
                >
                  {copiedSnippet === 'ep1' ? <Check className="w-3 h-3 text-foreground" /> : <Copy className="w-3 h-3" />}
                  {copiedSnippet === 'ep1' ? 'Copied' : 'Copy'}
                </Button>
              </div>

              <div className="space-y-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Query Parameters:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  <li><code>format</code> — <code>csv</code> or <code>json</code> (default: <code>csv</code>)</li>
                  <li><code>status</code> — <code>verified</code>, <code>under_review</code>, <code>all</code></li>
                  <li><code>county</code> — e.g. <code>Nairobi</code>, <code>Mombasa</code>, <code>Kisumu</code></li>
                  <li><code>category</code> — e.g. <code>misuse-of-public-resources</code>, <code>vote-buying</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Endpoint 2 */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-xs">GET</Badge>
                  <code className="text-sm font-bold font-mono text-foreground">/api/press-kit</code>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">ZIP Archive</Badge>
              </div>
              <CardDescription className="text-xs">
                Download latest platform statistical briefing, high-res SVG brand logos, and sample CSV data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-muted rounded-lg font-mono text-xs flex items-center justify-between">
                <span>{`${base}/api/press-kit`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(`${base}/api/press-kit`, 'ep2')}
                  className="h-7 text-[11px] gap-1 shrink-0"
                >
                  {copiedSnippet === 'ep2' ? <Check className="w-3 h-3 text-foreground" /> : <Copy className="w-3 h-3" />}
                  {copiedSnippet === 'ep2' ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Endpoint 3 */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 hover:bg-blue-600 font-mono text-xs">POST</Badge>
                  <code className="text-sm font-bold font-mono text-foreground">/api/intelligence</code>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">JSON RPC</Badge>
              </div>
              <CardDescription className="text-xs">
                Query synthesized entity intelligence records by politician name or political party slug.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <pre className="p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto text-muted-foreground">
{`// Request Body (JSON)
{
  "q": "United Democratic Alliance",
  "type": "party",
  "campaignPeriod": "2022"
}`}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Embeddable Newsroom Widgets */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Embeddable Newsroom Widgets
          </h2>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">1. National Incident Map Widget</CardTitle>
              <CardDescription className="text-xs">
                Responsive interactive Leaflet map embeddable in news articles and blog posts:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <pre className="p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto text-muted-foreground">
                  {mapEmbedCode}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(mapEmbedCode, 'mapEmbed')}
                  className="absolute right-2 top-2 h-7 text-[11px] gap-1"
                >
                  {copiedSnippet === 'mapEmbed' ? <Check className="w-3 h-3 text-foreground" /> : <Copy className="w-3 h-3" />}
                  {copiedSnippet === 'mapEmbed' ? 'Copied' : 'Copy Iframe'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">2. Violation Category Donut Widget</CardTitle>
              <CardDescription className="text-xs">
                Live categorical distribution chart powered by Recharts:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <pre className="p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto text-muted-foreground">
                  {chartEmbedCode}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(chartEmbedCode, 'chartEmbed')}
                  className="absolute right-2 top-2 h-7 text-[11px] gap-1"
                >
                  {copiedSnippet === 'chartEmbed' ? <Check className="w-3 h-3 text-foreground" /> : <Copy className="w-3 h-3" />}
                  {copiedSnippet === 'chartEmbed' ? 'Copied' : 'Copy Iframe'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* USSD & SMS Gateway Integration Notes */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Smartphone className="w-5 h-5 text-primary" />
              Cellular Gateway Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>
              In addition to REST endpoints, Knight Watch maintains active USSD aggregation bindings (<code className="font-bold text-foreground">*384*11400#</code>) and SMS shortcode integrations (<code className="font-bold text-foreground">38383</code>) powered by Africa&apos;s Talking and Safaricom SDP.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
