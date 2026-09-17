'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, ArrowRight, ShieldAlert, AlertTriangle, Building } from 'lucide-react';

const KENYAN_COUNTIES = [
  { code: '047', slug: 'nairobi', name: 'Nairobi', reports: 48, topCategory: 'Vote Buying & Handouts', risk: 'High', registeredVoters: '2,415,310', capEstimate: 'KSh 432.7M' },
  { code: '001', slug: 'mombasa', name: 'Mombasa', reports: 31, topCategory: 'State Logistics & Port Misuse', risk: 'High', registeredVoters: '641,913', capEstimate: 'KSh 190.2M' },
  { code: '042', slug: 'kisumu', name: 'Kisumu', reports: 26, topCategory: 'Vote Buying', risk: 'Medium', registeredVoters: '606,754', capEstimate: 'KSh 162.5M' },
  { code: '032', slug: 'nakuru', name: 'Nakuru', reports: 22, topCategory: 'Public Vehicle Abuse', risk: 'High', registeredVoters: '1,054,856', capEstimate: 'KSh 258.4M' },
  { code: '027', slug: 'uasin-gishu', name: 'Uasin Gishu', reports: 19, topCategory: 'State Equipment at Rallies', risk: 'Medium', registeredVoters: '506,138', capEstimate: 'KSh 140.0M' },
  { code: '022', slug: 'kiambu', name: 'Kiambu', reports: 24, topCategory: 'Undeclared Billboards', risk: 'High', registeredVoters: '1,275,008', capEstimate: 'KSh 310.0M' },
  { code: '003', slug: 'kilifi', name: 'Kilifi', reports: 14, topCategory: 'Voter Bribery', risk: 'Medium', registeredVoters: '582,639', capEstimate: 'KSh 145.0M' },
  { code: '037', slug: 'kakamega', name: 'Kakamega', reports: 17, topCategory: 'Civic Official Bribery', risk: 'Medium', registeredVoters: '844,551', capEstimate: 'KSh 228.0M' },
  { code: '012', slug: 'meru', name: 'Meru', reports: 12, topCategory: 'Public Vehicles', risk: 'Low', registeredVoters: '772,139', capEstimate: 'KSh 210.0M' },
  { code: '019', slug: 'nyeri', name: 'Nyeri', reports: 9, topCategory: 'County Hall Misuse', risk: 'Low', registeredVoters: '481,632', capEstimate: 'KSh 135.0M' },
  { code: '034', slug: 'kajiado', name: 'Kajiado', reports: 11, topCategory: 'Land/Asset Inducement', risk: 'Low', registeredVoters: '463,273', capEstimate: 'KSh 130.0M' },
  { code: '043', slug: 'homa-bay', name: 'Homa Bay', reports: 8, topCategory: 'Vote Buying', risk: 'Low', registeredVoters: '551,071', capEstimate: 'KSh 142.0M' },
];

export default function CountiesPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [search, setSearch] = useState('');

  const filtered = KENYAN_COUNTIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search) ||
    c.topCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Building className="w-3.5 h-3.5" />
            Devolved Governance Monitoring
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-foreground">
            County Campaign Finance Directory
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Explore incident tracking, historical campaign spending caps, and civic reporting hot-zones across Kenya&apos;s 47 devolved county governments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by county name or code (e.g. Nairobi, 047)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card text-sm h-10 shadow-xs"
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> monitored devolved regions
          </div>
        </div>

        {/* Counties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((county) => (
            <Card 
              key={county.slug}
              className="hover:border-primary/50 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    COUNTY {county.code}
                  </Badge>
                  <Badge 
                    variant={county.risk === 'High' ? 'destructive' : county.risk === 'Medium' ? 'secondary' : 'outline'}
                    className="text-[10px]"
                  >
                    {county.risk} Alert Level
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold font-display text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {county.name} County
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 pb-4 text-xs">
                <div className="p-3 bg-muted/40 rounded-lg space-y-1 border border-border/60">
                  <div className="text-muted-foreground text-[11px]">Primary Reported Malpractice</div>
                  <div className="font-semibold text-foreground">{county.topCategory}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <span className="block text-[11px]">Reports Logged</span>
                    <span className="font-mono font-bold text-foreground text-sm">{county.reports} cases</span>
                  </div>
                  <div>
                    <span className="block text-[11px]">Gubernatorial Cap</span>
                    <span className="font-mono font-bold text-foreground text-sm">{county.capEstimate}</span>
                  </div>
                </div>
              </CardContent>

              <div className="p-4 border-t border-border/50 bg-muted/20 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">
                  {county.registeredVoters} voters
                </span>
                <Link href={`/${locale}/counties/${county.slug}`}>
                  <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs text-primary font-semibold hover:text-primary">
                    County Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* National Hotspots Warning */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-base text-foreground flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              County Hotspot Geospatial Intelligence
            </div>
            <p className="text-xs text-muted-foreground">
              Prefer an interactive heat map with live incident cluster pins across all 47 counties?
            </p>
          </div>
          <Link href={`/${locale}/map`}>
            <Button className="font-semibold text-xs gap-2">
              Launch National Map <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
