'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Lock, EyeOff, Server, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Knight Watch
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground border border-border">
            <ShieldCheck className="w-3.5 h-3.5" />
            Kenya Data Protection Act (2019) & Witness Protection Act Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Privacy Policy & Whistleblower Immunity
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Our privacy engineering protocols are intentionally designed to protect Kenyan citizens, civil servants, and grassroots monitors from state surveillance, corporate harassment, and political retaliation.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          
          {/* Section 1: Anonymous Reporting */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-foreground" />
                1. Zero-Knowledge Anonymous Reporting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                When submitting evidence of vote buying, state asset misuse, or dark money donations, you are <strong className="text-foreground">never required to provide your name, national identity card number, email, or telephone number</strong>.
              </p>
              <p>
                All evidence submissions are assigned a randomized cryptographic hash (e.g. <code className="font-bold text-foreground">REF-849201</code>). There is no back-door link connecting your submission token to your IP address or cellular device.
              </p>
            </CardContent>
          </Card>

          {/* Section 2: Metadata Stripping */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                2. Automated Media Sanitization & EXIF Scrubbing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Modern digital cameras and smartphones embed hidden metadata into photos and videos, including exact GPS coordinates, device serial numbers, and camera timestamps.
              </p>
              <p>
                Knight Watch executes real-time serverless EXIF scrubbing on all uploaded media files before saving them to storage buckets. All embedded geolocation tags and device footprints are permanently stripped.
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Cellular Telecom Hashing */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                3. Cellular Gateway (SMS & USSD) Hashing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                When you dial <code className="font-mono font-bold text-foreground">*384*11400#</code> or text <code className="font-mono font-bold text-foreground">38383</code> via Safaricom, Airtel, or Telkom Kenya, incoming MSISDN numbers are transformed into one-way salted SHA-256 hashes at the telecom aggregator boundary.
              </p>
              <p>
                Neither our investigative staff nor external third parties can reverse-engineer your raw phone number from our internal logs.
              </p>
            </CardContent>
          </Card>

          {/* Section 4: Data Minimization & Retention */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                4. Data Minimization & 90-Day Purge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                If you voluntarily choose to provide contact information for follow-up by legal observers, that information is encrypted at rest using AES-256 and automatically purged from our system after 90 days if no formal legal petition is filed.
              </p>
              <p>
                We do not track user browsing behavior across the web and employ zero commercial advertising pixels or analytics trackers.
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
