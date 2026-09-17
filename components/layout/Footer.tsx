'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, PhoneCall, Mail, ExternalLink, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AccessibilityToggles } from '@/components/ui/AccessibilityToggles';
import { Badge } from '@/components/ui/badge';
import { getMessage } from '@/lib/i18n';

const footerSections = [
  {
    title: 'Civic Education',
    links: [
      { href: '/learn', label: 'Electoral Finance Guide' },
      { href: '/learn/ppf', label: 'Political Parties Fund' },
      { href: '/learn/spending-limits', label: 'Legal Spending Limits' },
      { href: '/learn/glossary', label: 'Civic Glossary' },
      { href: '/learn/faq', label: 'Frequently Asked Questions' },
    ],
  },
  {
    title: 'Citizen Action',
    links: [
      { href: '/report', label: 'Report Campaign Misuse' },
      { href: '/report/ussd', label: 'USSD Reporting (*384*11400#)' },
      { href: '/report/sms', label: 'SMS Whistleblower Line' },
      { href: '/mchango', label: 'Mchango Crowdfunding' },
      { href: '/mchango/transparency', label: 'Verified Contributions' },
    ],
  },
  {
    title: 'Data & Tracking',
    links: [
      { href: '/dashboard', label: 'National Dashboard' },
      { href: '/map', label: '47 Counties Heat Map' },
      { href: '/dashboard/parties', label: 'Political Parties Hub' },
      { href: '/reports', label: 'Public Audit Feed' },
      { href: '/transparency', label: 'Transparency Index' },
      { href: '/trends', label: 'Historical Trends' },
    ],
  },
  {
    title: 'Tools & Intelligence',
    links: [
      { href: '/intelligence', label: 'AI Intelligence Engine' },
      { href: '/calculator', label: 'Spending Limit Calculator' },
      { href: '/data-sources', label: 'Official Data Sources' },
      { href: '/api-docs', label: 'Developer API' },
      { href: '/press', label: 'Press Kit & Releases' },
    ],
  },
  {
    title: 'Governance & Legal',
    links: [
      { href: '/about', label: 'About Knight Watch' },
      { href: '/terms', label: 'Terms & Data Privacy' },
      { href: '/privacy', label: 'Whistleblower Protection' },
      { href: '/accessibility', label: 'Accessibility Statement' },
      { href: '/contact', label: 'Contact Integrity Desk' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <footer
      className="border-t border-border/80 bg-background mt-auto transition-colors"
      role="contentinfo"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 pb-12">
        {/* Top Brand & Mission Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-border">
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo locale={locale} />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Knight Watch Kenya is an open-source civic integrity and transparency platform empowering citizens, journalists, and oversight institutions to monitor political campaign spending and combat the misuse of public resources.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="secondary" className="gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Independent Watchdog</span>
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                IEBC & ORPP Public Records
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <PhoneCall className="w-4 h-4 text-muted-foreground" />
                <span>Offline Whistleblower Channel</span>
              </div>
              <p className="text-xs text-muted-foreground">
                No internet needed. Dial <span className="font-mono font-bold text-foreground">*384*11400#</span> on any mobile phone in Kenya to file an anonymous incident report.
              </p>
              <Link
                href={`/${locale}/report/ussd`}
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Learn how USSD reporting works</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>Real-Time Alerts & Updates</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Subscribe to verified campaign finance violation digests and county expenditure updates.
              </p>
              <Link
                href={`/${locale}/alerts`}
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Manage alert subscriptions</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Accessibility, Creator Attribution & Copyright */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <AccessibilityToggles />
          </div>

          <div className="text-center py-1">
            <p className="text-xs text-muted-foreground font-medium">
              A{' '}
              <a
                href="https://codewitheugene.top/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground hover:text-foreground transition-colors"
              >
                CodeWithEugene
              </a>{' '}
              Creation.
            </p>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Knight Watch Kenya. Open data initiative in partnership with TI-Kenya.
            </p>
            <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center md:justify-end gap-1.5">
              <span>Dedicated to a transparent, fair, and accountable Kenya</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
