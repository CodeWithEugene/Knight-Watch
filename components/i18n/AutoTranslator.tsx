'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getMessage } from '@/lib/i18n';
import { KENYAN_LOCALES } from '@/lib/locales';

/**
 * Common English UI phrases mapped to translation keys in lib/i18n.ts.
 * This guarantees that components and sub-pages across the entire platform
 * get automatically translated when any of the 22 Kenyan languages is active.
 */
const COMMON_PHRASE_MAPPINGS: Array<{ pattern: RegExp | string; key: string }> = [
  // Navigation
  { pattern: /^home$/i, key: 'nav.home' },
  { pattern: /^learn$/i, key: 'nav.learn' },
  { pattern: /^intelligence$/i, key: 'nav.intelligence' },
  { pattern: /^report$/i, key: 'nav.report' },
  { pattern: /^mchango$/i, key: 'nav.mchango' },
  { pattern: /^map$/i, key: 'nav.map' },
  { pattern: /^dashboard$/i, key: 'nav.dashboard' },
  { pattern: /^reports$/i, key: 'nav.reports' },
  { pattern: /^transparency$/i, key: 'nav.transparency' },
  { pattern: /^calculator$/i, key: 'nav.calculator' },
  { pattern: /^sign in$/i, key: 'nav.signIn' },
  { pattern: /^sign out$/i, key: 'nav.signOut' },
  { pattern: /^search reports\.\.\.$/i, key: 'nav.searchPlaceholder' },
  { pattern: /^select language$/i, key: 'nav.selectLang' },
  { pattern: /^lang$/i, key: 'nav.lang' },

  // Hero & CTAs
  { pattern: /^civic campaign finance integrity watchdog$/i, key: 'home.heroBadge' },
  { pattern: /^track political campaign money & safeguard public funds in kenya$/i, key: 'home.title' },
  { pattern: /^report misuse \/ whistleblow$/i, key: 'home.reportBtn' },
  { pattern: /^explore live dashboard$/i, key: 'home.dashboardBtn' },
  { pattern: /^file an incident report$/i, key: 'home.reportBtn' },
  { pattern: /^launch interactive map$/i, key: 'footer.viewMap' },
  { pattern: /^ask intelligence engine$/i, key: 'footer.aiEngine' },
  { pattern: /^explore mchango$/i, key: 'home.quickMchango' },
  { pattern: /^calculate spending caps$/i, key: 'home.quickCalculator' },
  { pattern: /^visit education hub$/i, key: 'footer.educationHub' },

  // Stats
  { pattern: /^verified malpractice reports$/i, key: 'home.statReports' },
  { pattern: /^audited & geo-located$/i, key: 'home.statReportsDesc' },
  { pattern: /^counties monitored$/i, key: 'home.statCounties' },
  { pattern: /^counties active$/i, key: 'home.statCounties' },
  { pattern: /^all 47 devolved units$/i, key: 'home.statCountiesDesc' },
  { pattern: /^national coverage$/i, key: 'home.statCountiesDesc' },
  { pattern: /^tracked political spending$/i, key: 'home.statTracked' },
  { pattern: /^mchango tracked$/i, key: 'home.statTracked' },
  { pattern: /^disbursements & declarations$/i, key: 'home.statTrackedDesc' },
  { pattern: /^transparent donations$/i, key: 'home.statTrackedDesc' },
  { pattern: /^active political parties$/i, key: 'home.statParties' },
  { pattern: /^ppf monitored$/i, key: 'home.statParties' },
  { pattern: /^public ppf records$/i, key: 'home.statPartiesDesc' },
  { pattern: /^8 parties audited$/i, key: 'home.statPartiesDesc' },
  { pattern: /^verified audits$/i, key: 'home.statReports' },
  { pattern: /^fact-checked & mapped$/i, key: 'home.statReportsDesc' },

  // User Journeys
  { pattern: /^user action journeys$/i, key: 'home.actionJourneys' },
  { pattern: /^how citizens & observers take action$/i, key: 'home.actionTitle' },
  { pattern: /^report campaign misuse$/i, key: 'home.quickReport' },
  { pattern: /^transparent mchango$/i, key: 'home.quickMchango' },
  { pattern: /^electoral finance guide$/i, key: 'home.quickLearn' },
  { pattern: /^47 counties heat map$/i, key: 'home.quickMap' },
  { pattern: /^47 counties geographic radar$/i, key: 'home.quickMap' },
  { pattern: /^ai intelligence engine$/i, key: 'home.quickIntelligence' },
  { pattern: /^spending ceilings calculator$/i, key: 'home.quickCalculator' },
  { pattern: /^spending limit calculator$/i, key: 'home.quickCalculator' },
  { pattern: /^citizen education & law$/i, key: 'home.quickLearn' },
  { pattern: /^mchango crowdfunding hub$/i, key: 'home.quickMchango' },

  // Whistleblower Trust & Protection
  { pattern: /^zero knowledge anonymity$/i, key: 'home.trustBadge' },
  { pattern: /^how your whistleblower report is protected & verified$/i, key: 'home.trustTitle' },
  { pattern: /^anonymous intake$/i, key: 'home.step1Title' },
  { pattern: /^evidence hashing$/i, key: 'home.step2Title' },
  { pattern: /^independent fact-check$/i, key: 'home.step3Title' },
  { pattern: /^oversight referral$/i, key: 'home.step4Title' },
  { pattern: /^start anonymous report$/i, key: 'home.startAnonymous' },
  { pattern: /^read privacy protocol$/i, key: 'home.privacyProtocol' },

  // Offline Channels
  { pattern: /^offline whistleblower channel$/i, key: 'home.offlineTitle' },
  { pattern: /^civic watchdog alerts$/i, key: 'home.alertsTitle' },
  { pattern: /^real-time alerts & updates$/i, key: 'footer.alertsTitle' },

  // Footer Sections & Links
  { pattern: /^civic education$/i, key: 'footer.civicEducation' },
  { pattern: /^citizen action$/i, key: 'footer.citizenAction' },
  { pattern: /^data & tracking$/i, key: 'footer.dataTracking' },
  { pattern: /^tools & intelligence$/i, key: 'footer.toolsIntelligence' },
  { pattern: /^governance & legal$/i, key: 'footer.governanceLegal' },
  { pattern: /^verified independent watchdog$/i, key: 'footer.verifiedWatchdog' },
  { pattern: /^iebc & orpp public records$/i, key: 'footer.publicRecords' },
  { pattern: /^political parties fund$/i, key: 'footer.ppf' },
  { pattern: /^legal spending limits$/i, key: 'footer.spendingLimits' },
  { pattern: /^civic glossary$/i, key: 'footer.glossary' },
  { pattern: /^frequently asked questions$/i, key: 'footer.faq' },
  { pattern: /^sms whistleblower line$/i, key: 'footer.sms' },
  { pattern: /^mchango crowdfunding$/i, key: 'footer.mchango' },
  { pattern: /^verified contributions$/i, key: 'footer.verifiedContributions' },
  { pattern: /^national dashboard$/i, key: 'footer.dashboard' },
  { pattern: /^political parties hub$/i, key: 'footer.partiesHub' },
  { pattern: /^public audit feed$/i, key: 'footer.reports' },
  { pattern: /^transparency index$/i, key: 'footer.transparencyIndex' },
  { pattern: /^historical trends$/i, key: 'footer.trends' },
  { pattern: /^official data sources$/i, key: 'footer.dataSources' },
  { pattern: /^developer api$/i, key: 'footer.apiDocs' },
  { pattern: /^press kit & releases$/i, key: 'footer.pressKit' },
  { pattern: /^about knight watch$/i, key: 'footer.about' },
  { pattern: /^terms & data privacy$/i, key: 'footer.terms' },
  { pattern: /^whistleblower protection$/i, key: 'footer.privacy' },
  { pattern: /^accessibility statement$/i, key: 'footer.accessibility' },
  { pattern: /^contact integrity desk$/i, key: 'footer.contact' },

  // Common UI Actions & Labels
  { pattern: /^verified$/i, key: 'common.verified' },
  { pattern: /^under review$/i, key: 'common.underReview' },
  { pattern: /^view more$/i, key: 'common.viewMore' },
  { pattern: /^loading\.\.\.$/i, key: 'common.loading' },
  { pattern: /^back$/i, key: 'common.back' },
  { pattern: /^close$/i, key: 'common.close' },
  { pattern: /^cancel$/i, key: 'common.cancel' },
  { pattern: /^submit$/i, key: 'common.submit' },
  { pattern: /^search$/i, key: 'common.search' },
  { pattern: /^filter$/i, key: 'common.filter' },
  { pattern: /^political parties$/i, key: 'common.parties' },
  { pattern: /^counties$/i, key: 'common.counties' },
  { pattern: /^all counties$/i, key: 'common.allCounties' },
  { pattern: /^all parties$/i, key: 'common.allParties' },
  { pattern: /^status$/i, key: 'common.status' },
  { pattern: /^amount$/i, key: 'common.amount' },
  { pattern: /^date$/i, key: 'common.date' },
  { pattern: /^category$/i, key: 'common.category' },
  { pattern: /^description$/i, key: 'common.description' },
  { pattern: /^location$/i, key: 'common.location' },
  { pattern: /^details$/i, key: 'common.details' },
  { pattern: /^submit report$/i, key: 'common.submitReport' },
  { pattern: /^overview$/i, key: 'common.overview' },
  { pattern: /^statistics$/i, key: 'common.statistics' },
  { pattern: /^learn more$/i, key: 'common.learnMore' },
  { pattern: /^anonymous$/i, key: 'common.anonymous' },
  { pattern: /^evidence$/i, key: 'common.evidence' },
  { pattern: /^download$/i, key: 'common.download' },
  { pattern: /^export$/i, key: 'common.export' },
];

export function AutoTranslator() {
  const pathname = usePathname();
  const currentCode = pathname?.split('/')[1]?.toLowerCase() || 'en';
  const isKnown = KENYAN_LOCALES.some((l) => l.code === currentCode);
  const locale = isKnown ? currentCode : 'en';

  useEffect(() => {
    // Keep document.documentElement.lang synced with active locale
    document.documentElement.lang = locale;

    if (locale === 'en') return;

    const translatedSet = new WeakSet<Node>();

    function translateTextNode(node: Text) {
      if (translatedSet.has(node)) return;

      const original = node.nodeValue;
      if (!original) return;
      const text = original.trim();
      if (!text || text.length > 250) return;

      for (const mapping of COMMON_PHRASE_MAPPINGS) {
        let matches = false;
        if (typeof mapping.pattern === 'string') {
          matches = text.toLowerCase() === mapping.pattern.toLowerCase();
        } else {
          matches = mapping.pattern.test(text);
        }

        if (matches) {
          const translated = getMessage(locale, mapping.key);
          if (translated && translated !== text && translated !== mapping.key) {
            translatedSet.add(node);
            if (typeof mapping.pattern === 'string') {
              node.nodeValue = original.replace(text, translated);
            } else {
              node.nodeValue = original.replace(mapping.pattern, translated);
            }
            break;
          }
        }
      }
    }

    function walk(root: Node) {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(n) {
            const parent = n.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toUpperCase();
            if (
              tag === 'SCRIPT' ||
              tag === 'STYLE' ||
              tag === 'TEXTAREA' ||
              tag === 'INPUT' ||
              tag === 'CODE' ||
              tag === 'PRE' ||
              parent.isContentEditable ||
              parent.closest('[data-no-translate]')
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let current = walker.nextNode();
      while (current) {
        translateTextNode(current as Text);
        current = walker.nextNode();
      }
    }

    // Run initial pass after DOM is ready
    const timer = setTimeout(() => {
      walk(document.body);
    }, 50);

    // Observe client-side route transitions and interactive components
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              walk(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
              translateTextNode(node as Text);
            }
          });
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [locale, pathname]);

  return null;
}
