'use client';

import { useEffect, useMemo } from 'react';
import { messages } from '@/lib/i18n';
import { GOOGLE_TRANSLATE_LOCALES, type LocaleCode } from '@/lib/locales';
import { useLocale } from '@/components/i18n/LocaleProvider';

interface PhraseEntry {
  enLower: string;
  translated: string;
  pattern: RegExp;
}

interface TextState {
  /** The English text the app last rendered into this node. */
  orig: string;
  /** What this translator last wrote, used to detect app-driven changes. */
  written: string;
}

const TRANSLATED_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const;
const SKIPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT', 'TEXTAREA']);
/** Marks leaf elements whose text came from the curated dictionary. */
const CURATED_MARK = 'data-kw-translated';
// Latin letters (incl. the diacritics used by Kenyan languages) and digits.
const WORD_CHAR = /[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF]/;

const textStates = new WeakMap<Text, TextState>();
const attrStates = new WeakMap<Element, Map<string, TextState>>();

let domGuardInstalled = false;

/**
 * Google Translate wraps text nodes in <font> elements. When React later
 * removes or reorders those nodes it throws "Failed to execute removeChild",
 * which crashes the page until it is refreshed. Make those calls tolerant.
 */
function installDomGuard() {
  if (domGuardInstalled || typeof Node === 'undefined') return;
  domGuardInstalled = true;
  const proto = Node.prototype as any;
  const originalRemoveChild = proto.removeChild;
  const originalInsertBefore = proto.insertBefore;
  proto.removeChild = function (child: Node) {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child);
  };
  proto.insertBefore = function (newNode: Node, reference: Node | null) {
    if (reference && reference.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, reference);
  };
}

function buildPhraseEntries(locale: LocaleCode): PhraseEntry[] {
  if (locale === 'en') return [];
  const enDict = messages.en ?? {};
  const targetDict = messages[locale] ?? {};
  const entries: PhraseEntry[] = [];
  for (const key of Object.keys(enDict)) {
    const enVal = enDict[key]?.trim();
    const trVal = targetDict[key]?.trim();
    if (!enVal || !trVal || enVal.length < 2 || enVal.toLowerCase() === trVal.toLowerCase()) continue;
    entries.push({
      enLower: enVal.toLowerCase(),
      translated: trVal,
      pattern: new RegExp(enVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    });
  }
  // Longest first so whole sentences win over the short phrases inside them.
  entries.sort((a, b) => b.enLower.length - a.enLower.length);
  return entries;
}

function isSkippedElement(el: Element): boolean {
  if (SKIPPED_TAGS.has(el.tagName)) return true;
  if ((el as HTMLElement).isContentEditable) return true;
  if (el.closest('[data-no-translate]')) return true;
  // Respect author-level translate="no" but not the marks this component adds.
  const noTranslate = el.closest('[translate="no"]');
  return !!noTranslate && !noTranslate.hasAttribute(CURATED_MARK);
}

export function AutoTranslator() {
  const locale = useLocale();
  const googleCode = GOOGLE_TRANSLATE_LOCALES[locale] ?? null;
  const phraseEntries = useMemo(() => buildPhraseEntries(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;

    const translateText = (text: string): string => {
      if (!text.trim() || phraseEntries.length === 0) return text;
      let current = text;
      for (const entry of phraseEntries) {
        if (!current.toLowerCase().includes(entry.enLower)) continue;
        entry.pattern.lastIndex = 0;
        current = current.replace(entry.pattern, (match: string, offset: number, whole: string) => {
          const before = whole[offset - 1];
          const after = whole[offset + match.length];
          if ((before && WORD_CHAR.test(before)) || (after && WORD_CHAR.test(after))) return match;
          return entry.translated;
        });
      }
      return current;
    };

    const markCurated = (node: Text) => {
      // Only leaf elements: marking a mixed parent would hide untranslated
      // English children from the machine engine.
      const parent = node.parentElement;
      if (!googleCode || !parent || parent.childElementCount > 0) return;
      parent.setAttribute(CURATED_MARK, '');
      parent.setAttribute('translate', 'no');
      parent.classList.add('notranslate');
    };

    const translateTextNode = (node: Text) => {
      const value = node.nodeValue ?? '';
      let state = textStates.get(node);
      if (!state || state.written !== value) {
        // First sighting, or the app re-rendered this node with new content.
        state = { orig: value, written: value };
        textStates.set(node, state);
      }
      if (!state.orig.trim()) return;
      const next = locale === 'en' ? state.orig : translateText(state.orig);
      if (next !== value) {
        node.nodeValue = next;
      }
      state.written = next;
      if (next !== state.orig) markCurated(node);
    };

    const translateAttributes = (el: Element) => {
      let states = attrStates.get(el);
      for (const attr of TRANSLATED_ATTRS) {
        const value = el.getAttribute(attr);
        if (value === null || !value.trim()) continue;
        if (!states) {
          states = new Map();
          attrStates.set(el, states);
        }
        let state = states.get(attr);
        if (!state || state.written !== value) {
          state = { orig: value, written: value };
          states.set(attr, state);
        }
        const next = locale === 'en' ? state.orig : translateText(state.orig);
        if (next !== value) el.setAttribute(attr, next);
        state.written = next;
      }
    };

    const walk = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        const parent = (root as Text).parentElement;
        if (parent && !isSkippedElement(parent)) translateTextNode(root as Text);
        return;
      }
      if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

      if (root.nodeType === Node.ELEMENT_NODE) {
        const el = root as Element;
        if (isSkippedElement(el)) return;
        translateAttributes(el);
        el.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach((child) => {
          if (!isSkippedElement(child)) translateAttributes(child);
        });
      }

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const parent = n.parentElement;
          return parent && !isSkippedElement(parent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });
      let current = walker.nextNode();
      while (current) {
        translateTextNode(current as Text);
        current = walker.nextNode();
      }
    };

    // Translate everything that is already on screen before anything else runs.
    walk(document.body);

    // Extra passes catch lazily hydrated client chunks and streamed content.
    const timers = [150, 500, 1200].map((ms) => setTimeout(() => walk(document.body), ms));

    // Anything the app adds or changes afterwards is translated immediately.
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') {
          if (m.target.nodeType === Node.TEXT_NODE) walk(m.target);
        } else {
          m.addedNodes.forEach((node) => walk(node));
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    // Machine-translation engine for the locales the dictionary cannot fully cover.
    // The googtrans cookie is set before the full page load that brings us here,
    // so the engine translates the remaining English on init.
    let googleTimer: ReturnType<typeof setTimeout> | undefined;
    if (googleCode) {
      installDomGuard();
      const w = window as any;
      const syncEngine = () => {
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (select && select.value !== googleCode) {
          select.value = googleCode;
          select.dispatchEvent(new Event('change'));
        }
      };
      if (w.google?.translate?.TranslateElement) {
        googleTimer = setTimeout(syncEngine, 300);
      } else if (!document.getElementById('google-translate-script')) {
        w.googleTranslateElementInit = () => {
          try {
            new w.google.translate.TranslateElement(
              { pageLanguage: 'en', includedLanguages: Object.values(GOOGLE_TRANSLATE_LOCALES).join(','), autoDisplay: false },
              'google_translate_element',
            );
            googleTimer = setTimeout(syncEngine, 300);
          } catch {}
        };
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      try {
        const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = `googtrans=; ${expired}`;
        document.cookie = `googtrans=; domain=${window.location.hostname}; ${expired}`;
      } catch {}
    }

    return () => {
      timers.forEach(clearTimeout);
      if (googleTimer) clearTimeout(googleTimer);
      observer.disconnect();
      document.querySelectorAll(`[${CURATED_MARK}]`).forEach((el) => {
        el.removeAttribute(CURATED_MARK);
        el.removeAttribute('translate');
        el.classList.remove('notranslate');
      });
    };
  }, [locale, googleCode, phraseEntries]);

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      className="hidden"
      style={{ display: 'none' }}
    />
  );
}
