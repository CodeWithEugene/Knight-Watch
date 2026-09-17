'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  Coins,
  FileWarning,
  Users,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { KENYAN_PARTIES } from '@/lib/partyData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PartiesPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParties = KENYAN_PARTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/dashboard`}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <span>Dashboard</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
            <Badge variant="outline" className="text-xs font-mono">
              ORPP Registered
            </Badge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            Political Parties Intelligence Hub
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Audit statutory Political Parties Fund (PPF) receipts, verified campaign contributions, and constitutional transparency scores across Kenya&apos;s political entities.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search party, leader, symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Total Monitored Parties</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">{KENYAN_PARTIES.length} Entities</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Officially gazetted allocations</p>
        </Card>
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Total PPF Tracked</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">KSh 718.6M</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">2023/24 - 2024/25 Financial Year</p>
        </Card>
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Average Transparency</p>
          <p className="font-display font-black text-2xl mt-1 text-foreground">73.1%</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Based on audited filings</p>
        </Card>
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Verified Incidents</p>
          <p className="font-display font-black text-2xl mt-1 text-amber-600 dark:text-amber-400">44 Audited</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Flagged across party activities</p>
        </Card>
      </div>

      {/* Parties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParties.map((party) => (
          <Card
            key={party.slug}
            className="overflow-hidden border-border hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div
              className="h-2 w-full"
              style={{ backgroundColor: party.accentColor }}
            />

            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-background border border-border p-2 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img
                      src={party.logo}
                      alt={`${party.name} official emblem`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xl text-foreground">
                        {party.acronym}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Est. {party.founded}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                      {party.name}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={party.transparencyScore >= 75 ? 'success' : 'warning'}
                  className="font-mono text-xs"
                >
                  {party.transparencyScore}/100
                </Badge>
              </div>

              <div className="pt-3 space-y-1 text-xs text-muted-foreground">
                <p>
                  Party Leader: <span className="font-semibold text-foreground">{party.leader}</span>
                </p>
                <p>
                  Symbol: <span className="font-medium text-foreground">{party.symbol}</span> · Reg: <span className="font-mono text-[11px]">{party.orppRegNumber}</span>
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-4">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {party.bio}
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-muted/40 border border-border/60 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">PPF Fund</p>
                  <p className="font-mono font-bold text-xs text-foreground mt-0.5">
                    {party.ppfAllocationDisplay}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Parliament</p>
                  <p className="font-mono font-bold text-xs text-foreground mt-0.5">
                    {party.parliamentarySeats.nationalAssembly} MPs
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Senate</p>
                  <p className="font-mono font-bold text-xs text-foreground mt-0.5">
                    {party.parliamentarySeats.senate} Seats
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 border-t border-border/60 flex items-center justify-between gap-3 mt-2">
              <Button asChild variant="default" size="sm" className="w-full justify-center gap-1.5 font-semibold text-xs">
                <Link href={`/${locale}/dashboard/parties/${party.slug}`}>
                  <span>Explore Full Audit Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredParties.length === 0 && (
        <div className="text-center py-16 border border-dashed rounded-xl space-y-3">
          <p className="text-muted-foreground text-sm">No political parties matching &quot;{searchTerm}&quot;</p>
          <Button variant="outline" size="sm" onClick={() => setSearchTerm('')}>
            Clear Search Filter
          </Button>
        </div>
      )}
    </div>
  );
}
