'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { KENYAN_PARTIES, PartyData, getPartyBySlug } from '@/lib/partyData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Coins } from 'lucide-react';

function formatKesM(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  return `${(n / 1e6).toFixed(1)}M`;
}

export function PartyCardsScroll({
  parties,
  totalsByParty,
  onDonate,
  locale = 'en',
}: {
  parties: { slug: string; name: string }[];
  totalsByParty: Record<string, { total: number; count: number }>;
  onDonate: (slug: string) => void;
  locale?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);

  // Use full set of parties from KENYAN_PARTIES if available, otherwise match passed parties
  const partyList: PartyData[] =
    parties && parties.length > 0
      ? parties.map((p) => getPartyBySlug(p.slug) || {
          slug: p.slug,
          name: p.name,
          acronym: p.name.slice(0, 4).toUpperCase(),
          symbol: 'Civic Emblem',
          leader: 'Party Official',
          chairperson: '—',
          secretaryGeneral: '—',
          founded: 2020,
          orppRegNumber: 'ORPP/PP/KE',
          headquarters: 'Nairobi, Kenya',
          ppfAllocationKes: 50_000_000,
          ppfAllocationDisplay: 'KSh 50.0M',
          mchangoGoalKes: 100_000_000,
          mchangoRaisedKes: 10_000_000,
          reportsCount: 10,
          verifiedViolationsCount: 2,
          transparencyScore: 70,
          accentColor: '#15803D',
          secondaryColor: '#0F172A',
          logo: '/images/parties/uda.svg',
          bio: 'Registered political entity in Kenya.',
          parliamentarySeats: { nationalAssembly: 0, senate: 0, governors: 0 },
          breakdown: [],
          ppfHistory: [],
        })
      : KENYAN_PARTIES;

  const cardWidthPx = 300 + 16;
  const singleSetWidth = cardWidthPx * partyList.length;

  useEffect(() => {
    if (paused || !scrollRef.current || partyList.length === 0) return;
    const el = scrollRef.current;
    const step = 1.2;
    let last = 0;
    const tick = (now: number) => {
      if (!last) last = now;
      const delta = Math.min(now - last, 50);
      last = now;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      el.scrollLeft += step * (delta / 16);
      if (el.scrollLeft >= singleSetWidth - 1) {
        el.scrollLeft -= singleSetWidth;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, partyList.length, singleSetWidth]);

  const totalRaised = (slug: string, fallback: number) => {
    return totalsByParty[slug]?.total ?? fallback;
  };

  return (
    <section
      className="relative mb-12 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 max-w-[1720px] mx-auto gap-2">
        <div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-foreground">
            Registered Political Parties (ORPP)
          </h2>
          <p className="text-xs text-muted-foreground">
            Track transparent public campaign donations vs legal election spending caps
          </p>
        </div>
        <div className="flex items-center gap-3">
          {paused && (
            <span className="text-xs font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border">
              Scroll Paused
            </span>
          )}
          <Link
            href={`/${locale}/dashboard/parties`}
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>All Parties Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1"
        style={{ scrollBehavior: 'auto' }}
      >
        {[1, 2].map((copy) =>
          partyList.map((party) => {
            const raised = totalRaised(party.slug, party.mchangoRaisedKes);
            const pct = party.mchangoGoalKes > 0 ? Math.min(100, (raised / party.mchangoGoalKes) * 100) : 0;

            return (
              <div
                key={`${copy}-${party.slug}`}
                className="flex-shrink-0 w-[300px] rounded-xl border border-border bg-card text-card-foreground p-5 flex flex-col justify-between shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-background border border-border p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <img
                          src={party.logo}
                          alt={party.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-black text-lg text-foreground">
                            {party.acronym}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {party.name}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={party.transparencyScore >= 75 ? 'success' : 'warning'}
                      className="font-mono text-[10px]"
                    >
                      {party.transparencyScore}% Index
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">
                    Leader: <span className="font-medium text-foreground">{party.leader}</span> · Symbol: {party.symbol}
                  </p>

                  <div className="p-3 rounded-lg bg-muted/40 border border-border/50 mb-3 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">PPF Allocation</span>
                      <span className="font-mono font-bold text-foreground">{party.ppfAllocationDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Mchango Raised</span>
                      <span className="font-mono font-bold text-foreground">
                        KES {formatKesM(raised)}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground text-[11px]">
                        Target KES {formatKesM(party.mchangoGoalKes)}
                      </span>
                      <span className="font-mono font-bold text-xs">{Math.round(pct)}%</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                </div>

                {/* Donate CTA */}
                <button
                  type="button"
                  onClick={() => onDonate(party.slug)}
                  className="w-full py-2.5 px-4 rounded-full bg-primary text-primary-foreground font-bold text-xs transition-all duration-200 shadow-xs hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Coins className="w-4 h-4" />
                  <span>CONTRIBUTE TRANSPARENTLY</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
