'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';

const glossaryTerms = [
  { term: 'ECF Act', full: 'Election Campaign Financing Act (No. 42 of 2013)', def: 'Statutory Act of the Parliament of Kenya passed to implement Article 88(4)(i) of the Constitution, regulating campaign contributions, expenditure limits, and financial disclosure.' },
  { term: 'IEBC', full: 'Independent Electoral and Boundaries Commission', def: 'The constitutional commission established under Article 88 of the Constitution responsible for conducting elections and referenda and regulating campaign spending.' },
  { term: 'MCA', full: 'Member of County Assembly', def: 'An elected or nominated representative representing a ward in one of Kenya’s 47 County Assemblies.' },
  { term: 'OAG', full: 'Office of the Auditor-General', def: 'Constitutional office under Article 229 mandated to audit accounts of the national government, county governments, and state organs including all political parties receiving public funding.' },
  { term: 'ORPP', full: 'Office of the Registrar of Political Parties', def: 'Independent state agency established under the Political Parties Act, 2011 to register, regulate, monitor, and disburse the Political Parties Fund to eligible political organizations.' },
  { term: 'Party List', full: 'Proportional Representation Party List', def: 'Closed lists submitted to IEBC by political parties before elections to fill nominated special seats for women, youth, persons with disabilities, and marginalized workers.' },
  { term: 'POCAMLA', full: 'Proceeds of Crime and Anti-Money Laundering Act', def: 'Kenyan statute that criminalizes money laundering, structuring, and laundering ill-gotten wealth through campaign donations or shell organizations.' },
  { term: 'PPF', full: 'Political Parties Fund', def: 'Public fund drawing at least 0.3% of audited national revenue distributed annually to eligible parties under Section 24 of the Political Parties Act.' },
  { term: 'Returning Officer', full: 'Constituency / County Returning Officer', def: 'IEBC officer gazetted to oversee election administration, receive candidate nominations, tally votes, and declare winners in a designated electoral unit.' },
  { term: 'SIG', full: 'Special Interest Groups', def: 'Demographic categories explicitly protected by Article 100 of the Constitution: women, youth, persons with disabilities, marginalized communities, and ethnic minorities.' },
  { term: 'Tenderpreneurship', full: 'Procurement-Linked Political Financing', def: 'Colloquial and criminological term for public procurement corruption where contractors inflate state tenders to kick back illicit funds into campaign war chests.' },
  { term: 'Vote Buying', full: 'Electoral Bribery under Section 9, Election Offences Act', def: 'The corrupt practice of offering or promising money, gifts, food, or employment to voters to induce them to vote, abstain, or influence others in an election.' },
];

export default function GlossaryPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [search, setSearch] = useState('');

  const filtered = glossaryTerms.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.full.toLowerCase().includes(search.toLowerCase()) ||
    item.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/learn`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Civic Education Hub
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            Civic Terminology Lexicon
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Electoral & Finance Glossary
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Essential legal definitions, regulatory acronyms, and constitutional terminology governing Kenyan elections and political party funding.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search acronyms, statutes, or definitions (e.g. PPF, ORPP, SIG)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card text-sm h-11 shadow-xs"
          />
        </div>

        {/* Glossary Terms List */}
        <div className="space-y-4 mb-12">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No matching terminology found for &quot;{search}&quot;.
            </div>
          ) : (
            filtered.map((item) => (
              <Card key={item.term} className="shadow-xs hover:border-primary/40 transition-colors">
                <CardContent className="p-5 sm:p-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono font-black text-xl text-primary">{item.term}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{item.full}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-1">
                    {item.def}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
