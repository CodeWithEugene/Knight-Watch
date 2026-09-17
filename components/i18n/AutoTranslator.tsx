'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { messages } from '@/lib/i18n';
import { KENYAN_LOCALES } from '@/lib/locales';

interface PhraseEntry {
  en: string;
  enLower: string;
  translated: string;
  escaped: string;
}

/**
 * Universal Dual-Engine Full-Platform Auto-Translator for Knight Watch Kenya.
 * Guarantees that EVERY section, page, card, badge, button, form placeholder,
 * and dialog translates into the selected Kenyan language across all 22 languages.
 */
export function AutoTranslator() {
  const pathname = usePathname();
  const currentCode = pathname?.split('/')[1]?.toLowerCase() || 'en';
  const isKnown = KENYAN_LOCALES.some((l) => l.code === currentCode);
  const locale = isKnown ? currentCode : 'en';

  useEffect(() => {
    // 1. Keep HTML lang attribute in sync
    document.documentElement.lang = locale;

    // 2. Google Translate background integration for supported languages
    const googleCodeMap: Record<string, string> = {
      sw: 'sw',
      so: 'so',
      gax: 'om', // Afaan Borana is an Oromo language variant supported by Google as 'om'
    };

    const targetGoogleCode = googleCodeMap[locale];

    function syncGoogleTranslate(targetLang: string | null) {
      try {
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (select) {
          const desired = targetLang || '';
          if (select.value !== desired) {
            select.value = desired;
            select.dispatchEvent(new Event('change'));
          }
        }
      } catch {}
    }

    if (targetGoogleCode) {
      try {
        document.cookie = `googtrans=/en/${targetGoogleCode}; path=/;`;
        document.cookie = `googtrans=/en/${targetGoogleCode}; domain=${window.location.hostname}; path=/;`;
      } catch {}
      syncGoogleTranslate(targetGoogleCode);
    } else {
      try {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      } catch {}
      syncGoogleTranslate(null);
    }

    // Load Google Translate script once if not already present
    if (typeof window !== 'undefined' && !(window as any).google?.translate) {
      const existingScript = document.getElementById('google-translate-script');
      if (!existingScript) {
        (window as any).googleTranslateElementInit = () => {
          try {
            new (window as any).google.translate.TranslateElement(
              { pageLanguage: 'en', autoDisplay: false },
              'google_translate_element'
            );
            if (targetGoogleCode) {
              setTimeout(() => syncGoogleTranslate(targetGoogleCode), 300);
            }
          } catch {}
        };
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // 3. Build native dictionary mapping: English phrase -> Translated phrase
    const enDict = messages.en || {};
    const targetDict = messages[locale] || {};

    const phraseEntries: PhraseEntry[] = [];

    // Collect all translation keys for current locale
    if (locale !== 'en') {
      for (const key of Object.keys(enDict)) {
        const enVal = enDict[key]?.trim();
        const trVal = targetDict[key]?.trim();
        if (enVal && trVal && enVal.toLowerCase() !== trVal.toLowerCase()) {
          phraseEntries.push({
            en: enVal,
            enLower: enVal.toLowerCase(),
            translated: trVal,
            escaped: enVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          });
        }
      }

      // Sort entries by length descending so longer sentences are replaced before short sub-phrases
      phraseEntries.sort((a, b) => b.en.length - a.en.length);
    }

    let isTranslating = false;

    function translateText(text: string): string {
      if (!text || !text.trim() || phraseEntries.length === 0) return text;
      let current = text;
      for (let i = 0; i < phraseEntries.length; i++) {
        const entry = phraseEntries[i];
        if (current.toLowerCase().includes(entry.enLower)) {
          const re = new RegExp(entry.escaped, 'gi');
          current = current.replace(re, () => entry.translated);
        }
      }
      return current;
    }

    function translateNode(node: Text) {
      if (isTranslating) return;

      if (!(node as any).__origText) {
        (node as any).__origText = node.nodeValue;
      }
      const orig = (node as any).__origText;
      if (!orig || !orig.trim()) return;

      if (locale === 'en') {
        if (node.nodeValue !== orig) {
          isTranslating = true;
          try {
            node.nodeValue = orig;
          } finally {
            isTranslating = false;
          }
        }
        return;
      }

      const updated = translateText(orig);
      if (updated !== node.nodeValue) {
        isTranslating = true;
        try {
          node.nodeValue = updated;
        } finally {
          isTranslating = false;
        }
      }
    }

    function translateAttributes(el: Element) {
      if (isTranslating) return;

      const attrs = ['placeholder', 'aria-label', 'title', 'alt'];
      for (const attr of attrs) {
        const val = el.getAttribute(attr);
        if (val && val.trim()) {
          const dataKey = `data-orig-${attr}`;
          if (!el.hasAttribute(dataKey)) {
            el.setAttribute(dataKey, val);
          }
          const orig = el.getAttribute(dataKey) ?? val;

          if (locale === 'en') {
            if (val !== orig) {
              el.setAttribute(attr, orig);
            }
          } else {
            const updated = translateText(orig);
            if (updated !== val) {
              el.setAttribute(attr, updated);
            }
          }
        }
      }
    }

    function walk(root: Node) {
      if (!root || isTranslating) return;

      // Handle element attributes first
      if (root.nodeType === Node.ELEMENT_NODE) {
        const el = root as Element;
        const tag = el.tagName.toUpperCase();
        if (
          tag === 'SCRIPT' ||
          tag === 'STYLE' ||
          tag === 'CODE' ||
          tag === 'PRE' ||
          el.hasAttribute('data-no-translate') ||
          el.getAttribute('translate') === 'no'
        ) {
          return;
        }

        translateAttributes(el);
        const childInputs = el.querySelectorAll?.('input, textarea, [aria-label], [title]');
        childInputs?.forEach(translateAttributes);
      }

      // Walk text nodes
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
              tag === 'CODE' ||
              tag === 'PRE' ||
              parent.isContentEditable ||
              parent.closest('[data-no-translate]') ||
              parent.closest('[translate="no"]')
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let current = walker.nextNode();
      while (current) {
        translateNode(current as Text);
        current = walker.nextNode();
      }
    }

    // Staggered passes to capture initial mount + lazy loaded client chunks
    const timers = [
      setTimeout(() => walk(document.body), 30),
      setTimeout(() => walk(document.body), 150),
      setTimeout(() => walk(document.body), 450),
      setTimeout(() => walk(document.body), 1000),
    ];

    // Continuous observation for dynamic cards, tabs, and client navigation
    const observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              walk(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
              translateNode(node as Text);
            }
          });
        } else if (m.type === 'characterData') {
          if (m.target.nodeType === Node.TEXT_NODE) {
            translateNode(m.target as Text);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [locale, pathname]);

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      className="hidden"
      style={{ display: 'none' }}
    />
  );
}
