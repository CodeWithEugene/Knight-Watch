'use client';

import Link from 'next/link';
import { ShieldCheck, PhoneCall, Mail, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AccessibilityToggles } from '@/components/ui/AccessibilityToggles';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/useTranslation';
import { useLocale } from '@/components/i18n/LocaleProvider';

export function Footer() {
  const locale = useLocale();
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('footer.civicEducation'),
      links: [
        { href: '/learn', label: t('footer.educationHub') },
        { href: '/learn/ppf', label: t('footer.ppf') },
        { href: '/learn/spending-limits', label: t('footer.spendingLimits') },
        { href: '/learn/glossary', label: t('footer.glossary') },
        { href: '/learn/faq', label: t('footer.faq') },
      ],
    },
    {
      title: t('footer.citizenAction'),
      links: [
        { href: '/report', label: t('footer.reportMisuse') },
        { href: '/report/ussd', label: t('footer.ussd') },
        { href: '/report/sms', label: t('footer.sms') },
        { href: '/mchango', label: t('footer.mchango') },
        { href: '/mchango/transparency', label: t('footer.verifiedContributions') },
      ],
    },
    {
      title: t('footer.dataTracking'),
      links: [
        { href: '/dashboard', label: t('footer.dashboard') },
        { href: '/map', label: t('footer.viewMap') },
        { href: '/dashboard/parties', label: t('footer.partiesHub') },
        { href: '/reports', label: t('footer.reports') },
        { href: '/transparency', label: t('footer.transparencyIndex') },
        { href: '/trends', label: t('footer.trends') },
      ],
    },
    {
      title: t('footer.toolsIntelligence'),
      links: [
        { href: '/intelligence', label: t('footer.aiEngine') },
        { href: '/calculator', label: t('footer.calculator') },
        { href: '/data-sources', label: t('footer.dataSources') },
        { href: '/api-docs', label: t('footer.apiDocs') },
        { href: '/press', label: t('footer.pressKit') },
      ],
    },
    {
      title: t('footer.governanceLegal'),
      links: [
        { href: '/about', label: t('footer.about') },
        { href: '/terms', label: t('footer.terms') },
        { href: '/privacy', label: t('footer.privacy') },
        { href: '/accessibility', label: t('footer.accessibility') },
        { href: '/contact', label: t('footer.contact') },
      ],
    },
  ];

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
              {t('footer.mission')}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="secondary" className="gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('footer.verifiedWatchdog')}</span>
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {t('footer.publicRecords')}
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <PhoneCall className="w-4 h-4 text-muted-foreground" />
                <span>{t('footer.offlineTitle')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('footer.offlineDial')}
              </p>
              <Link
                href={`/${locale}/report/ussd`}
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>{t('footer.offlineLink')}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{t('footer.alertsTitle')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('footer.alertsDesc')}
              </p>
              <Link
                href={`/${locale}/alerts`}
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>{t('footer.alertsLink')}</span>
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
              &copy; {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center md:justify-end gap-1.5">
              <span>{t('footer.dedicated')}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
