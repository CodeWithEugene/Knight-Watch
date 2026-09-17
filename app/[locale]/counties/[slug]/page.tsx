'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Coins, 
  Building, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink,
  PlusCircle,
  FileText
} from 'lucide-react';

const COUNTY_METADATA: Record<string, any> = {
  nairobi: {
    name: 'Nairobi',
    code: '047',
    registeredVoters: '2,415,310',
    pollingStations: '3,395',
    subCounties: 17,
    capEstimate: 'KSh 432,700,000',
    maxDonorContribution: 'KSh 86,540,000',
    reportsLogged: 48,
    verifiedReports: 14,
    underReview: 34,
    alacOffice: {
      name: 'Transparency International Kenya - National & Nairobi ALAC',
      address: 'Kindaruma Road, Off Ring Road Kilimani, Nairobi',
      hotline: '0800 720 721 (Toll-Free) / +254 20 2727763',
      email: 'alacnairobi@tikenya.org'
    }
  },
  mombasa: {
    name: 'Mombasa',
    code: '001',
    registeredVoters: '641,913',
    pollingStations: '1,045',
    subCounties: 6,
    capEstimate: 'KSh 190,200,000',
    maxDonorContribution: 'KSh 38,040,000',
    reportsLogged: 31,
    verifiedReports: 9,
    underReview: 22,
    alacOffice: {
      name: 'TI-Kenya Coastal Region ALAC',
      address: '2nd Floor, Pan Africa Insurance Building, Uhuru Highway, Mombasa',
      hotline: '0800 720 721 / +254 41 2220668',
      email: 'alacoast@tikenya.org'
    }
  },
  kisumu: {
    name: 'Kisumu',
    code: '042',
    registeredVoters: '606,754',
    pollingStations: '1,027',
    subCounties: 7,
    capEstimate: 'KSh 162,500,000',
    maxDonorContribution: 'KSh 32,500,000',
    reportsLogged: 26,
    verifiedReports: 8,
    underReview: 18,
    alacOffice: {
      name: 'TI-Kenya Western Region ALAC',
      address: 'Mega City Mall, Mezzanine Wing, Kisumu-Nairobi Highway',
      hotline: '0800 720 721 / +254 57 2023812',
      email: 'alacwestern@tikenya.org'
    }
  },
  nakuru: {
    name: 'Nakuru',
    code: '032',
    registeredVoters: '1,054,856',
    pollingStations: '2,055',
    subCounties: 11,
    capEstimate: 'KSh 258,400,000',
    maxDonorContribution: 'KSh 51,680,000',
    reportsLogged: 22,
    verifiedReports: 6,
    underReview: 16,
    alacOffice: {
      name: 'TI-Kenya Rift Valley Legal Support',
      address: 'Polo Centre, Kenyatta Avenue, Nakuru',
      hotline: '0800 720 721',
      email: 'alacrift@tikenya.org'
    }
  },
  'uasin-gishu': {
    name: 'Uasin Gishu',
    code: '027',
    registeredVoters: '506,138',
    pollingStations: '912',
    subCounties: 6,
    capEstimate: 'KSh 140,000,000',
    maxDonorContribution: 'KSh 28,000,000',
    reportsLogged: 19,
    verifiedReports: 5,
    underReview: 14,
    alacOffice: {
      name: 'TI-Kenya North Rift ALAC (Eldoret)',
      address: 'KVDA Plaza, 7th Floor, Oloo Street, Eldoret',
      hotline: '0800 720 721 / +254 53 2030437',
      email: 'alaceldoret@tikenya.org'
    }
  }
};

export default function CountyDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const slug = (params?.slug as string) || 'nairobi';

  const defaultCounty = {
    name: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    code: '000',
    registeredVoters: '450,000',
    pollingStations: '850',
    subCounties: 6,
    capEstimate: 'KSh 120,000,000',
    maxDonorContribution: 'KSh 24,000,000',
    reportsLogged: 12,
    verifiedReports: 4,
    underReview: 8,
    alacOffice: {
      name: 'National Legal Aid Referral Desk',
      address: 'Nairobi Central Office (Covering All Devolved Units)',
      hotline: '0800 720 721',
      email: 'legaldesk@knightwatch.ke'
    }
  };

  const county = COUNTY_METADATA[slug] || defaultCounty;

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href={`/${locale}/counties`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Counties Directory
          </Link>

          <Link href={`/${locale}/report?county=${county.name}`}>
            <Button size="sm" className="gap-2 text-xs font-semibold">
              <PlusCircle className="w-3.5 h-3.5" /> Report in {county.name}
            </Button>
          </Link>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs font-bold">
              KENYA COUNTY {county.code}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {county.subCounties} Sub-Counties
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            {county.name} County Dossier
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl">
            Electoral financial parameters, reported campaign violations, and independent legal advice resources for {county.name} County.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-1">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Total Reports</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                {county.reportsLogged}
              </div>
              <p className="text-[11px] text-muted-foreground">Logged incidents</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-1">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Verified Cases</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                {county.verifiedReports}
              </div>
              <p className="text-[11px] text-muted-foreground">Corroborated by field observers</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-1">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Registered Voters</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
                {county.registeredVoters}
              </div>
              <p className="text-[11px] text-muted-foreground">{county.pollingStations} polling stations</p>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardContent className="p-5 space-y-1">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Gubernatorial Cap</span>
              <div className="text-lg sm:text-xl font-bold font-mono text-foreground mt-1">
                {county.capEstimate}
              </div>
              <p className="text-[11px] text-muted-foreground">Historical 2017 limit</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  Statutory Expenditure Ceilings & Parameters
                </CardTitle>
                <CardDescription>
                  Under IEBC regulations formulated pursuant to the Election Campaign Financing Act:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Gubernatorial & Senatorial Expenditure Ceiling</span>
                    <span className="font-mono font-bold text-primary">{county.capEstimate}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Calculated using county geographic area in square kilometres and total registered voter density.
                  </p>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Single Donor Maximum Contribution (20% Limit)</span>
                    <span className="font-mono font-bold text-foreground">{county.maxDonorContribution}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    No individual contributor, corporation, or entity can donate more than 20% of the candidate&apos;s statutory ceiling.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Incident Review Status in {county.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Cases Under Active Legal Review:</span>
                  <span className="font-mono font-bold text-amber-600">{county.underReview} dossiers</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Dispatched to EACC / IEBC for statutory inquiry:</span>
                  <span className="font-mono font-bold text-foreground">{county.verifiedReports} dossiers</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Legal Aid & Whistleblower Support */}
          <div className="space-y-6">
            <Card className="shadow-sm border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                  <PhoneCall className="w-4 h-4 text-primary" />
                  Free Legal Aid Centre (ALAC)
                </CardTitle>
                <CardDescription className="text-xs">
                  Partnered non-partisan legal clinic for election whistleblowers:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Regional Office</span>
                  <span className="font-bold text-foreground">{county.alacOffice.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Physical Address</span>
                  <span className="text-foreground">{county.alacOffice.address}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Toll-Free Helpline</span>
                  <span className="font-mono font-bold text-primary">{county.alacOffice.hotline}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Secure Email</span>
                  <span className="font-mono text-muted-foreground">{county.alacOffice.email}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/40">
              <CardContent className="p-5 space-y-3 text-xs text-muted-foreground">
                <div className="font-bold text-foreground">Witness Confidentiality Note</div>
                <p className="leading-relaxed">
                  Citizens lodging reports in {county.name} County are protected by encrypted data routing. Your identity will never be handed to county government officials or political parties.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
