'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Building2,
  Users,
  ShieldCheck,
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  FileWarning,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function CalculatorPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  // PPF Formula State
  const [votes, setVotes] = useState(7176141);
  const [totalVotes, setTotalVotes] = useState(14213027);
  const [reps, setReps] = useState(177);
  const [totalReps, setTotalReps] = useState(349);
  const [sig, setSig] = useState(14);
  const [totalSig, setTotalSig] = useState(48);
  const [pool, setPool] = useState(1475); // KSh 1.475 Billion statutory fund pool

  // Spending Limit State
  const [seatType, setSeatType] = useState<'presidential' | 'governor' | 'senator' | 'mp' | 'woman_rep' | 'mca'>('governor');
  const [registeredVoters, setRegisteredVoters] = useState(500000);
  const [areaSqKm, setAreaSqKm] = useState(3500);

  // PPF Calculations (Sec 25, Political Parties Act)
  const poolAfterAdmin = pool * 0.95; // 95% distributed, 5% ORPP administrative fee
  const share70 = totalVotes > 0 ? (votes / totalVotes) * 0.7 * poolAfterAdmin : 0;
  const share10 = totalReps > 0 ? (reps / totalReps) * 0.1 * poolAfterAdmin : 0;
  const share15 = totalSig > 0 ? (sig / totalSig) * 0.15 * poolAfterAdmin : 0;
  const estimatedPPF = share70 + share10 + share15;

  // Spending Limit Formula (Election Campaign Financing Act Statutory Guidelines)
  const calculateSpendingLimit = () => {
    switch (seatType) {
      case 'presidential':
        return 4_400_000_000; // National ceiling KSh 4.4B
      case 'governor':
      case 'senator':
      case 'woman_rep':
        // Base allowance + population factor + terrain/area factor
        return Math.min(
          400_000_000,
          Math.max(30_000_000, 35_000_000 + registeredVoters * 120 + areaSqKm * 1500)
        );
      case 'mp':
        return Math.min(
          33_000_000,
          Math.max(10_000_000, 8_000_000 + registeredVoters * 85 + areaSqKm * 2000)
        );
      case 'mca':
        return Math.min(
          10_000_000,
          Math.max(2_500_000, 1_500_000 + registeredVoters * 50 + areaSqKm * 1000)
        );
      default:
        return 50_000_000;
    }
  };

  const spendingLimitKes = calculateSpendingLimit();

  const loadPartyPreset = (p: 'uda' | 'odm' | 'jubilee' | 'wiper') => {
    if (p === 'uda') {
      setVotes(7176141);
      setTotalVotes(14213027);
      setReps(177);
      setTotalReps(349);
      setSig(18);
      setTotalSig(48);
    } else if (p === 'odm') {
      setVotes(6942930);
      setTotalVotes(14213027);
      setReps(106);
      setTotalReps(349);
      setSig(15);
      setTotalSig(48);
    } else if (p === 'jubilee') {
      setVotes(1120000);
      setTotalVotes(14213027);
      setReps(33);
      setTotalReps(349);
      setSig(4);
      setTotalSig(48);
    } else if (p === 'wiper') {
      setVotes(890000);
      setTotalVotes(14213027);
      setReps(29);
      setTotalReps(349);
      setSig(3);
      setTotalSig(48);
    }
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Statutory Calculator
          </Badge>
          <Badge variant="success" className="text-xs">
            Political Parties Act & ECFA 2013
          </Badge>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
          Electoral Financing Statutory Calculators
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Simulate official allocations under the Political Parties Fund (PPF) formula, or compute legal campaign spending caps for elective seats under Kenyan law.
        </p>
      </div>

      <Tabs defaultValue="ppf" className="space-y-8">
        <TabsList className="grid w-full sm:w-[420px] grid-cols-2">
          <TabsTrigger value="ppf" className="gap-2 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>PPF Formula Simulator</span>
          </TabsTrigger>
          <TabsTrigger value="spending" className="gap-2 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Campaign Spending Caps</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: PPF FORMULA */}
        <TabsContent value="ppf" className="space-y-8">
          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Load Verified Election Presets:</span>
            <Button variant="outline" size="sm" onClick={() => loadPartyPreset('uda')} className="h-7 text-xs font-mono">
              UDA 2022 Results
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPartyPreset('odm')} className="h-7 text-xs font-mono">
              ODM 2022 Results
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPartyPreset('jubilee')} className="h-7 text-xs font-mono">
              Jubilee Results
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPartyPreset('wiper')} className="h-7 text-xs font-mono">
              Wiper Results
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Panel */}
            <Card className="lg:col-span-7 p-6 space-y-6">
              <div>
                <CardTitle className="text-lg font-bold">Statutory Formula Inputs</CardTitle>
                <CardDescription className="text-xs">
                  Section 25 parameters established by Parliament & ORPP
                </CardDescription>
              </div>

              <div className="space-y-4 text-xs">
                {/* Votes Share (70%) */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>1. Votes Ratio (70% Weight)</span>
                    <span className="text-primary font-mono">{((votes / (totalVotes || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Party Votes</label>
                      <Input
                        type="number"
                        value={votes}
                        onChange={(e) => setVotes(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Total Valid Votes</label>
                      <Input
                        type="number"
                        value={totalVotes}
                        onChange={(e) => setTotalVotes(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Elected Reps (10%) */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>2. Elected Reps Ratio (10% Weight)</span>
                    <span className="text-primary font-mono">{((reps / (totalReps || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Party Reps (NA + Senate)</label>
                      <Input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Total Elective Seats</label>
                      <Input
                        type="number"
                        value={totalReps}
                        onChange={(e) => setTotalReps(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Interest Groups (15%) */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>3. Special Interest Groups (15% Weight)</span>
                    <span className="text-primary font-mono">{((sig / (totalSig || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Party Women, Youth, PWD</label>
                      <Input
                        type="number"
                        value={sig}
                        onChange={(e) => setSig(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">Total Special Seats</label>
                      <Input
                        type="number"
                        value={totalSig}
                        onChange={(e) => setTotalSig(Number(e.target.value))}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Fund Pool */}
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Total National PPF Pool (KSh Millions)</label>
                  <Input
                    type="number"
                    value={pool}
                    onChange={(e) => setPool(Number(e.target.value))}
                    className="h-10 font-mono font-bold text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Statutory minimum is 0.3% of national revenue. 5% (KSh {(pool * 0.05).toFixed(1)}M) reserved for ORPP administration.
                  </p>
                </div>
              </div>
            </Card>

            {/* Results Panel */}
            <Card className="lg:col-span-5 p-6 flex flex-col justify-between border-border bg-card shadow-md space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-border">
                  <Badge variant="outline" className="font-mono text-xs">Annual Projection</Badge>
                  <CardTitle className="text-xl font-bold mt-1">Simulated Allocation</CardTitle>
                </div>

                <div className="p-4 rounded-xl bg-muted/60 border border-border text-center space-y-1">
                  <p className="text-xs uppercase font-semibold text-muted-foreground">
                    Projected Statutory Entitlement
                  </p>
                  <p className="font-display font-black text-3xl sm:text-4xl text-foreground">
                    KSh {estimatedPPF.toFixed(2)}M
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    KES {(estimatedPPF * 1e6).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>

                {/* Sub-Pillar breakdown */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Votes Share (70%):</span>
                      <span className="font-mono font-bold text-foreground">KSh {share70.toFixed(2)}M</span>
                    </div>
                    <Progress value={(share70 / (estimatedPPF || 1)) * 100} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SIG Representation (15%):</span>
                      <span className="font-mono font-bold text-foreground">KSh {share15.toFixed(2)}M</span>
                    </div>
                    <Progress value={(share15 / (estimatedPPF || 1)) * 100} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Elected Reps Share (10%):</span>
                      <span className="font-mono font-bold text-foreground">KSh {share10.toFixed(2)}M</span>
                    </div>
                    <Progress value={(share10 / (estimatedPPF || 1)) * 100} className="h-1.5" />
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href={`/${locale}/learn/ppf`}>
                  <span>Read Full Statutory Rules & Formula</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: CAMPAIGN SPENDING CAPS */}
        <TabsContent value="spending" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-7 p-6 space-y-6">
              <div>
                <CardTitle className="text-lg font-bold">Election Spending Limit Parameters</CardTitle>
                <CardDescription className="text-xs">
                  Under the Election Campaign Financing Act (2013) guidelines
                </CardDescription>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                    Elective Office
                  </label>
                  <select
                    value={seatType}
                    onChange={(e: any) => setSeatType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="presidential">Presidential Candidate (National)</option>
                    <option value="governor">County Governor</option>
                    <option value="senator">County Senator</option>
                    <option value="woman_rep">County Woman Representative</option>
                    <option value="mp">Member of National Assembly (Constituency)</option>
                    <option value="mca">Member of County Assembly (Ward)</option>
                  </select>
                </div>

                {seatType !== 'presidential' && (
                  <>
                    <div className="space-y-2">
                      <label className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                        Registered Voters in Jurisdiction
                      </label>
                      <Input
                        type="number"
                        value={registeredVoters}
                        onChange={(e) => setRegisteredVoters(Number(e.target.value))}
                        className="h-10 font-mono text-sm"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        IEBC gazetted voter population for the targeted county, constituency, or ward.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                        Geographic Area (Square Kilometers)
                      </label>
                      <Input
                        type="number"
                        value={areaSqKm}
                        onChange={(e) => setAreaSqKm(Number(e.target.value))}
                        className="h-10 font-mono text-sm"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Geographical terrain multiplier authorized under the Act.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card className="lg:col-span-5 p-6 flex flex-col justify-between border-border bg-card shadow-md space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-border">
                  <Badge variant="outline" className="font-mono text-xs">IEBC Ceiling</Badge>
                  <CardTitle className="text-xl font-bold mt-1">Statutory Spending Limit</CardTitle>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center space-y-1">
                  <p className="text-xs uppercase font-semibold text-blue-800 dark:text-blue-300">
                    Maximum Authorized Expenditure
                  </p>
                  <p className="font-display font-black text-3xl sm:text-4xl text-blue-700 dark:text-blue-400">
                    KSh {(spendingLimitKes / 1e6).toFixed(1)}M
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    KES {spendingLimitKes.toLocaleString()}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Scale className="w-4 h-4 text-primary" />
                    <span>Legal Sanctions for Breach</span>
                  </div>
                  <p>
                    Exceeding this spending ceiling constitutes an electoral offence under Section 23 of the Act, punishable by fines up to KSh 2,000,000, imprisonment up to 5 years, or candidate disqualification.
                  </p>
                </div>
              </div>

              <Button asChild variant="default" className="w-full text-xs h-10 font-semibold">
                <Link href={`/${locale}/report`}>
                  <FileWarning className="w-3.5 h-3.5 mr-1.5" />
                  <span>Report An Overspending Candidate</span>
                </Link>
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
