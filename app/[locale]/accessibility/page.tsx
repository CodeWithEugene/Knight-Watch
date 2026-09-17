'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Accessibility, 
  Eye, 
  Keyboard, 
  Smartphone, 
  Volume2, 
  ArrowLeft, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AccessibilityPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Accessibility className="w-3.5 h-3.5" />
            Inclusive Civic Access
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Accessibility Standards & Universal Inclusion
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Democratic participation is a universal constitutional right. Knight Watch is engineered to be barrier-free for all citizens regardless of visual, motor, auditory, or device capability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          
          {/* Feature 1: Screen Reader */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Volume2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">Screen Reader Optimization</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Built using semantic HTML5 landmark tags (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>) and comprehensive WAI-ARIA 1.2 compliant roles.
              </p>
              <p>
                All data charts feature hidden screen-reader descriptive tables so visually impaired users have equal access to numerical insights.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2: Keyboard Navigation */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Keyboard className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">100% Keyboard Navigable</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Every interactive element (forms, buttons, modals, and tabs) is fully accessible via <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground border">Tab</kbd> sequencing.
              </p>
              <p>
                Modals and dropdown menus can be dismissed instantly with <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground border">Escape</kbd>, and visible high-contrast focus rings indicate active focus.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3: Visual & Neurodiversity Modes */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Eye className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">Visual & Dyslexia Preferences</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Includes quick-toggle accessibility preferences in the footer: high-contrast monochrome mode, dyslexia-friendly weighted letter-spacing font, and scalable typography up to 200%.
              </p>
              <p>
                Color is never used as the sole conveyor of information—all status badges pair color with text and icons.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4: Cellular Offline Inclusion */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center mb-2">
                <Smartphone className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold">Cellular Offline Inclusion</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                For citizens in rural or low-connectivity zones without smartphones or mobile internet, our toll-free USSD code (<code className="font-bold text-foreground">*384*11400#</code>) and SMS shortcode (<code className="font-bold text-foreground">38383</code>) provide 100% feature parity for incident reporting.
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Feedback Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs text-xs space-y-2">
          <div className="font-bold text-base text-foreground">Notice an Accessibility Barrier?</div>
          <p className="text-muted-foreground">
            We continuously audit our interfaces against WCAG 2.1 Level AA standards. If you encounter any barriers with assistive technology, please notify our team at <strong className="text-foreground">accessibility@knightwatch.ke</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
