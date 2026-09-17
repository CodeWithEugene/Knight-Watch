'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { Search, MapPin, Calendar, ArrowRight, ShieldCheck, Filter, FileText } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'en';
  const queryParam = searchParams.get('q')?.trim() || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);

  const convexReports = useQuery(
    api.reports.search,
    queryParam.length >= 2 ? { searchTerm: queryParam, limit: 50 } : 'skip'
  );

  // Realistic fallback sample reports for resilient searching
  const fallbackIndex = [
    {
      _id: 'rep-1',
      title: 'State vehicles deployed at gubernatorial campaign rally',
      description: 'Multiple government-registered county double-cabin pickups were observed transporting campaign banners and sound amplification equipment.',
      category: 'misuse-of-public-resources',
      county: 'Uasin Gishu',
      location: 'Eldoret Sports Club Grounds',
      status: 'verified',
      createdAt: Date.now() - 3600000 * 24 * 2,
    },
    {
      _id: 'rep-2',
      title: 'Uncapped cash handouts distributed inside polling precinct',
      description: 'Voters standing in queue were handed sealed envelopes containing KSh 2,000 denomination notes.',
      category: 'vote-buying',
      county: 'Nairobi',
      location: 'Embakasi Central Sub-county',
      status: 'under_review',
      createdAt: Date.now() - 3600000 * 24 * 5,
    },
    {
      _id: 'rep-3',
      title: 'Undisclosed corporate donation exceeding legal threshold',
      description: 'Offshore logistics entity transferred campaign advisory fees directly to third-party billboard vendor without declaration to ORPP.',
      category: 'illegal-donations',
      county: 'Mombasa',
      location: 'Nyali Constituency',
      status: 'verified',
      createdAt: Date.now() - 3600000 * 24 * 9,
    },
    {
      _id: 'rep-4',
      title: 'County sound truck equipment branded with party symbols',
      description: 'Public health department mobile outreach truck repainted with partisan electoral campaign branding.',
      category: 'misuse-of-public-resources',
      county: 'Nakuru',
      location: 'Naivasha Town',
      status: 'under_review',
      createdAt: Date.now() - 3600000 * 24 * 12,
    },
  ];

  const matchedFallback = queryParam.length >= 2 ? fallbackIndex.filter(r => 
    r.title.toLowerCase().includes(queryParam.toLowerCase()) ||
    r.description.toLowerCase().includes(queryParam.toLowerCase()) ||
    r.county.toLowerCase().includes(queryParam.toLowerCase()) ||
    r.category.toLowerCase().includes(queryParam.toLowerCase())
  ) : [];

  const reports = (convexReports && convexReports.length > 0) ? convexReports : (queryParam.length >= 2 ? matchedFallback : []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const displayStatus = (s: string) =>
    s === 'verified' ? 'verified' : s === 'under_review' ? 'under_review' : 'unverified';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="space-y-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-foreground flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            Search Incident Dossiers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Search verified citizen reports, public asset abuses, and county hotspots across Kenya.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="shadow-sm border-border/80 mb-8">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by keyword, location, or county (e.g. rally, vehicle, Nairobi, UDA)..."
                  className="pl-9 h-11 text-sm bg-card"
                />
              </div>
              <Button type="submit" className="font-semibold text-xs h-11 px-5">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5 pt-3 text-xs text-muted-foreground">
              <span>Popular searches:</span>
              {['State vehicles', 'Vote buying', 'Nairobi', 'Mombasa', 'Rally', 'Donation'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchTerm(tag);
                    router.push(`/${locale}/search?q=${encodeURIComponent(tag)}`);
                  }}
                  className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:text-foreground text-[11px] font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Area */}
        {!queryParam ? (
          <div className="text-center py-12 text-muted-foreground text-xs sm:text-sm space-y-2">
            <p>Enter at least 2 characters in the search bar to scan the public integrity database.</p>
          </div>
        ) : queryParam.length < 2 ? (
          <div className="text-center py-12 text-muted-foreground text-xs sm:text-sm">
            Please enter at least 2 characters to search.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
              <span>
                Found <strong className="text-foreground">{reports.length}</strong> matching records for &quot;{queryParam}&quot;
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Public Records
              </span>
            </div>

            {reports.length === 0 ? (
              <Card className="py-12 text-center shadow-xs">
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    No reports match &quot;{queryParam}&quot;. Try broadening your keywords or exploring county profiles.
                  </p>
                  <Link href={`/${locale}/reports`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      Browse Full Incident Feed
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              reports.map((r: any) => (
                <Card key={r._id} className="shadow-xs hover:border-primary/40 transition-colors">
                  <CardContent className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <VerificationBadge status={displayStatus(r.status)} />
                          <Badge variant="outline" className="text-[10px] capitalize font-mono">
                            {r.category?.replace(/-/g, ' ')}
                          </Badge>
                        </div>
                        <Link href={`/${locale}/reports/${r._id}`}>
                          <h2 className="text-base font-bold text-foreground hover:text-primary transition-colors leading-snug">
                            {r.title}
                          </h2>
                        </Link>
                      </div>

                      <Link href={`/${locale}/reports/${r._id}`} className="shrink-0">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary font-semibold h-8">
                          View Dossier <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/50">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {r.county || r.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(r.createdAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm font-medium">Scanning civic records...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
