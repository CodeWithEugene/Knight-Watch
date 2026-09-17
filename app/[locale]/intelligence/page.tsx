'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  Users,
  User,
  Clock,
  TrendingUp,
  ExternalLink,
  Database,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { getAllIntelligenceEntities } from '@/lib/intelligenceData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const POPULAR_PARTIES = [
  'ODM',
  'UDA',
  'DCP',
  'PLP',
  'Jubilee',
  'Azimio',
  'Wiper',
  'ANC',
  'FORD-K',
  'KANU',
  'DAP-K',
];

const RECENT_SEARCHES = [
  'William Ruto',
  'DCP',
  "Fred Matiang'i",
  'Edwin Sifuna',
  'UDA',
  'ODM',
  'Kalonzo Musyoka',
  'Martha Karua',
];

const PREFILLED_POLITICIANS = getAllIntelligenceEntities().filter((e) => e.type === 'politician');
const PREFILLED_PARTIES_WITH_PHOTOS = getAllIntelligenceEntities().filter((e) => e.type === 'party');

function EntityAvatar({
  entity,
  type,
}: {
  entity: { id: string; name: string; imageUrl: string };
  type: 'party' | 'politician';
}) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary flex items-center justify-center transition-all shadow-sm ${
      type === 'party' ? 'bg-white' : 'bg-muted'
    }`}>
      {!imgFailed && entity.imageUrl ? (
        <Image
          src={entity.imageUrl}
          alt={entity.name}
          width={64}
          height={64}
          className={
            type === 'party'
              ? 'w-full h-full object-contain p-2'
              : 'w-full h-full object-cover object-top'
          }
          unoptimized
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-muted-foreground">
          {type === 'party' ? <Users className="w-8 h-8" /> : <User className="w-8 h-8" />}
        </span>
      )}
    </div>
  );
}

export default function IntelligencePage() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'en';
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'party' | 'politician'>('party');

  const handleSearch = (e: React.FormEvent, searchValue?: string, explicitType?: 'party' | 'politician') => {
    e.preventDefault();
    const q = (searchValue ?? query).trim();
    if (!q) return;
    const resolvedType = explicitType ?? searchType;
    const params = new URLSearchParams({ q, type: resolvedType });
    router.push(`/${locale}/intelligence/results?${params.toString()}`);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs [&_svg]:size-3.5">
          <Sparkles />
          AI-Powered Public Records Intelligence
        </Badge>
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground">
          Investigate Political Money in Kenya
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Query statutory disclosures, IEBC declarations, and campaign rally intelligence for any Kenyan party or public official.
        </p>
      </div>

      {/* Main Search Command Box */}
      <Card className="p-6 border-border shadow-md">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative flex items-center rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-primary shadow-sm">
            <Search className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search party (e.g. UDA, DCP, PLP) or politician (e.g. Matiang'i, Sifuna, Kalonzo)..."
              className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm sm:text-base"
              aria-label="Search party or politician"
            />
            <Button
              type="submit"
              className="mr-2 font-semibold text-xs h-9 px-4"
            >
              Analyze
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSearchType('party')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                searchType === 'party'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Political Parties</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchType('politician')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                searchType === 'politician'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Politicians & Candidates</span>
            </button>
          </div>
        </form>
      </Card>

      {/* Recent & Trending Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-5 space-y-3">
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Recent Citizen Searches</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={(e) => {
                  const resolvedType = term === 'ODM' || term === 'UDA' || term === 'Azimio' || term === 'DCP' || term === 'PLP' ? 'party' : 'politician';
                  setQuery(term);
                  setSearchType(resolvedType);
                  handleSearch(e, term, resolvedType);
                }}
                className="px-3 py-1 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-medium text-foreground transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-foreground">
            <TrendingUp className="w-4 h-4 text-foreground" />
            <span>Trending Entities</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PARTIES.map((party) => (
              <button
                key={party}
                type="button"
                onClick={(e) => {
                  setQuery(party);
                  setSearchType('party');
                  handleSearch(e, party, 'party');
                }}
                className="px-3 py-1 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-medium text-foreground transition-colors"
              >
                {party}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Prefilled Entities Avatars */}
      {PREFILLED_PARTIES_WITH_PHOTOS.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-display font-bold text-base text-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>Browse Major Parties Dossiers</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PREFILLED_PARTIES_WITH_PHOTOS.map((entity) => (
              <button
                key={entity.id}
                type="button"
                onClick={(e) => {
                  setQuery(entity.name);
                  setSearchType('party');
                  handleSearch(e, entity.name, 'party');
                }}
                className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 flex flex-col items-center gap-2.5 text-center group transition-all"
              >
                <EntityAvatar entity={entity} type="party" />
                <span className="text-xs font-semibold text-foreground group-hover:text-primary truncate w-full">
                  {entity.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Prefilled Politicians Avatars */}
      {PREFILLED_POLITICIANS.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-display font-bold text-base text-foreground">
            <User className="w-4 h-4 text-primary" />
            <span>Browse National Political Figures</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PREFILLED_POLITICIANS.map((entity) => (
              <button
                key={entity.id}
                type="button"
                onClick={(e) => {
                  setQuery(entity.name);
                  setSearchType('politician');
                  handleSearch(e, entity.name, 'politician');
                }}
                className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 flex flex-col items-center gap-2.5 text-center group transition-all"
              >
                <EntityAvatar entity={entity} type="politician" />
                <span className="text-xs font-semibold text-foreground group-hover:text-primary truncate w-full">
                  {entity.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Official Data Sources Card */}
      <Card id="data-sources" className="p-6 space-y-4 bg-muted/20 border-border">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-foreground" />
          <h2 className="font-display font-bold text-lg text-foreground">
            Official Data Sources & Verification Portals
          </h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          All intelligence generated by Knight Watch is cross-referenced against public records. Use these official links to explore original gazettes and statutory filings:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://orpp.or.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-foreground"
          >
            <span>Office of the Registrar of Political Parties (ORPP)</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary ml-2 flex-shrink-0" />
          </a>
          <a
            href="https://www.iebc.or.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-foreground"
          >
            <span>Independent Electoral and Boundaries Commission (IEBC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary ml-2 flex-shrink-0" />
          </a>
          <a
            href="https://eacc.go.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-foreground"
          >
            <span>Ethics and Anti-Corruption Commission (EACC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary ml-2 flex-shrink-0" />
          </a>
          <a
            href="https://tikenya.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-foreground"
          >
            <span>Transparency International Kenya (TI-Kenya)</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary ml-2 flex-shrink-0" />
          </a>
        </div>
      </Card>
    </div>
  );
}
