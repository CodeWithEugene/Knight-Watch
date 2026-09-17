'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  Coins,
  ShieldCheck,
  CreditCard,
  Phone,
  AlertCircle,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PartyCardsScroll } from '@/components/mchango/PartyCardsScroll';
import { MchangoModal } from '@/components/mchango/MchangoModal';
import { KENYAN_PARTIES, getPartyBySlug } from '@/lib/partyData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

function MchangoContent() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyParam = searchParams.get('party');

  const parties = useQuery(api.parties.list);
  const totalsByParty = useQuery(api.contributions.totalsByParty, {}) ?? {};
  const seedParties = useMutation(api.parties.seed);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parties && parties.length === 0) {
      seedParties().catch(() => {});
    }
  }, [parties, seedParties]);

  const [party, setParty] = useState(partyParam || 'uda');
  const [amount, setAmount] = useState(1000);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(Boolean(partyParam));

  useEffect(() => {
    if (partyParam) {
      setParty(partyParam);
      setIsModalOpen(true);
    }
  }, [partyParam]);

  const minAmount = 10;
  const maxAmount = 1000000;

  // Use full list from KENYAN_PARTIES to ensure all 8 parties are selectable
  const partyList =
    (parties ?? []).length > 0
      ? parties!
      : KENYAN_PARTIES.map((p) => ({ slug: p.slug, name: p.name }));

  const selectedPartyData = party ? getPartyBySlug(party) : null;

  const handleDonateFromCard = (slug: string) => {
    setParty(slug);
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!party) {
      setError('Please select a recipient party.');
      return;
    }
    setError('');
    setIsModalOpen(true);
  };

  return (
    <>
      <MchangoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPartySlug={party || 'uda'}
        defaultAmount={amount}
        locale={locale}
      />

      <div className="py-10 lg:py-16 space-y-12">
        {/* Header Title */}
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              M-Pesa & Card Gateway
            </Badge>
            <Badge variant="success" className="text-xs">
              Audited Ledger
            </Badge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
            Mchango — Public Campaign Crowdfunding
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Support democratic political parties and candidates transparently. All contributions are processed through verified Paystack rails and logged on the public campaign finance tracker.
          </p>
        </div>

        {/* Scroll of Parties with Authentic Logos */}
        <div className="max-w-full overflow-hidden">
          <PartyCardsScroll
            parties={partyList}
            totalsByParty={totalsByParty}
            onDonate={handleDonateFromCard}
            locale={locale}
          />
        </div>

        {/* Donation Form Container */}
        <div ref={formSectionRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30 p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-muted text-foreground flex items-center justify-center">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Contribution Details</CardTitle>
                    <CardDescription className="text-xs">
                      M-Pesa, Visa, Mastercard, and Bank Transfer supported
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Lock className="w-3.5 h-3.5 text-foreground" />
                  <span>256-bit TLS</span>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Selected Party */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Select Registered Political Party <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    required
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="">Choose a political party...</option>
                    {partyList.map((p) => {
                      const meta = getPartyBySlug(p.slug);
                      return (
                        <option key={p.slug} value={p.slug}>
                          {p.name} {meta ? `(${meta.acronym})` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {selectedPartyData && (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 text-xs mt-2">
                    <div className="w-8 h-8 rounded-lg bg-background border p-1 flex items-center justify-center flex-shrink-0">
                      <img
                        src={selectedPartyData.logo}
                        alt={selectedPartyData.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedPartyData.name}</p>
                      <p className="text-muted-foreground text-[11px]">
                        Leader: {selectedPartyData.leader} · Symbol: {selectedPartyData.symbol}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Contributor Email Address <span className="text-muted-foreground font-normal text-[11px]">(Optional for receipt)</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. citizen@example.com"
                  className="h-11 text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Your cryptographic transaction receipt and donation hash can be dispatched to this address.
                </p>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Contribution Amount (KES) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-mono text-muted-foreground">
                    Limit: KSh 100 - KSh 1,000,000
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        amount === preset
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted/60 hover:bg-muted text-foreground border border-border'
                      }`}
                    >
                      KES {preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-sm text-muted-foreground">
                    KES
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={minAmount}
                    max={maxAmount}
                    required
                    className="h-11 pl-14 font-mono font-bold text-base"
                  />
                </div>
              </div>

              {/* Statutory Notice */}
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 text-foreground font-semibold">
                  <ShieldCheck className="w-4 h-4 text-foreground" />
                  <span>Statutory Compliance Notice</span>
                </div>
                <p>
                  Pursuant to the Election Campaign Financing Act (2013), foreign donations and anonymous campaign contributions exceeding statutory thresholds are strictly prohibited in Kenya. All funds pass through authorized financial intermediaries.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Payment Notice</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={!party || amount < minAmount}
                className="w-full h-12 font-bold text-sm shadow-sm gap-2"
              >
                <Coins className="w-4 h-4" />
                <span>
                  Proceed to Pay KES {amount.toLocaleString()}
                </span>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default function MchangoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <MchangoContent />
    </Suspense>
  );
}
