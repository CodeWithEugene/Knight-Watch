'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Scale, 
  FileText,
  AlertCircle
} from 'lucide-react';

const faqItems = [
  {
    id: 'item-1',
    category: 'Safety & Anonymity',
    q: 'Will my identity be revealed if I submit an evidence report?',
    a: 'No. Knight Watch operates on a zero-knowledge architecture. All IP addresses, GPS coordinates, device fingerprints, and browser metadata are cryptographically stripped before entering our database. You are never required to provide your name, national ID, or phone number to submit a report.'
  },
  {
    id: 'item-2',
    category: 'Safety & Anonymity',
    q: 'What protections exist for whistleblowers under Kenyan law?',
    a: 'The Witness Protection Act (Cap. 79) and the Bribery Act 2016 provide statutory protection against occupational harassment, dismissal, and criminal retaliation for citizens who disclose corrupt electoral practices in good faith.'
  },
  {
    id: 'item-3',
    category: 'Campaign Finance & PPF',
    q: 'Why do political parties receive public taxpayer money?',
    a: 'Under Section 23 of the Political Parties Act, public funding institutionalizes political parties as democratic public organs rather than private fiefdoms. It reduces dependency on oligarchic donors, transnational corporate corruption, and organized crime cartels.'
  },
  {
    id: 'item-4',
    category: 'Campaign Finance & PPF',
    q: 'What can political parties legally spend the Political Parties Fund on?',
    a: 'Permitted expenses include civic and voter education, promoting the representation of special interest groups (minimum 30% of allocation), policy formulation research, and administrative office operations (capped at 30%). It cannot be used for voter handouts or personal remuneration.'
  },
  {
    id: 'item-5',
    category: 'Spending Limits & Penalties',
    q: 'What is the current legal limit on presidential or gubernatorial campaign spending?',
    a: 'Currently, there are no legally enforced spending limits. Although the 2017 draft regulations proposed KSh 4.4 billion for Presidential candidates and KSh 432 million for Nairobi Governor, Parliament scuttled the regulations before the 2022 elections. High Court rulings have directed IEBC to reinstate binding limits.'
  },
  {
    id: 'item-6',
    category: 'Spending Limits & Penalties',
    q: 'What are the penalties for vote buying under the Election Offences Act?',
    a: 'Section 9 of the Election Offences Act (No. 37 of 2016) classifies vote buying and voter bribery as a felony carrying a prison term of up to 5 years, a fine of up to KSh 2,000,000, and disqualification from contesting any public office for up to 5 years.'
  },
  {
    id: 'item-7',
    category: 'Technical & Offline Access',
    q: 'How do I submit an incident report without internet or smartphone access?',
    a: 'You can dial *384*11400# from any mobile phone in Kenya (completely toll-free on Safaricom, Airtel, and Telkom), or send a free SMS formatted as "REPORT [Category] [Details] [Location]" to shortcode 38383.'
  },
  {
    id: 'item-8',
    category: 'Technical & Offline Access',
    q: 'How does Knight Watch verify crowd-sourced incident reports?',
    a: 'Submissions undergo automated AI triage for deduplication, followed by independent field verification by accredited civil society observers, media fact-checking coalitions, and legal analysts.'
  },
];

export default function FAQPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Safety & Anonymity', 'Campaign Finance & PPF', 'Spending Limits & Penalties', 'Technical & Offline Access'];

  const filtered = faqItems.filter(item => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            <HelpCircle className="w-3.5 h-3.5" />
            Citizen Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Everything you need to know about whistleblower protections, political party financing, statutory spending limits, and reporting electoral malpractice.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card text-sm h-11 shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCat === cat ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-8"
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ List */}
        <Card className="shadow-sm border-border/80 mb-12">
          <CardContent className="p-6">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No matching questions found for &quot;{search}&quot;.
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full divide-y divide-border">
                {filtered.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-none py-2">
                    <AccordionTrigger className="text-left font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors py-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span>{item.q}</span>
                        <Badge variant="outline" className="text-[10px] w-fit font-normal">
                          {item.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pt-1 pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Still Have Questions Banner */}
        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-foreground text-base">Still have questions or need legal assistance?</div>
            <p className="text-xs text-muted-foreground">Our civil society partners and legal observers are available to help.</p>
          </div>
          <Link href={`/${locale}/contact`}>
            <Button size="sm" className="font-semibold gap-2">
              <PhoneCall className="w-3.5 h-3.5" /> Contact Legal Desk
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
