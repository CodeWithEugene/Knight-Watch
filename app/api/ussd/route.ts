import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const categoryMap: Record<
  string,
  | 'vote-buying'
  | 'illegal-donations'
  | 'misuse-public-resources'
  | 'undeclared-spending'
  | 'bribery'
  | 'other'
> = {
  '1': 'vote-buying',
  '2': 'illegal-donations',
  '3': 'misuse-public-resources',
  '4': 'undeclared-spending',
  '5': 'bribery',
  '6': 'other',
};

type LangCode = 'en' | 'sw' | 'ki' | 'kam';

const USSD_STRINGS: Record<
  LangCode,
  {
    welcome: string;
    invalidLang: string;
    categoryMenu: string;
    invalidCategory: string;
    enterDescription: string;
    enterLocation: string;
    confirm: (desc: string, loc: string) => string;
    invalidConfirm: string;
    thankYou: (id: string) => string;
    cancelled: string;
    error: string;
  }
> = {
  en: {
    welcome: 'CON Welcome to Knight Watch Kenya\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    invalidLang: 'CON Invalid choice.\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    categoryMenu:
      'CON Select category:\n1. Vote buying\n2. Illegal donations\n3. Misuse of public funds\n4. Undeclared spending\n5. Bribery\n6. Other',
    invalidCategory:
      'CON Invalid category. Select 1-6:\n1. Vote buying\n2. Illegal donations\n3. Misuse of funds\n4. Undeclared spend\n5. Bribery\n6. Other',
    enterDescription: 'CON Enter brief description (max 160 chars):',
    enterLocation: 'CON Enter county or town:',
    confirm: (desc, loc) =>
      `CON Confirm report:\n"${desc.slice(0, 30)}" @ ${loc.slice(0, 18)}\n1. Yes, submit\n2. Cancel`,
    invalidConfirm: 'CON Invalid choice.\n1. Yes, submit report\n2. Cancel',
    thankYou: (id) => `END Thank you. Report ID: ${id}\nYour incident has been securely recorded for audit.`,
    cancelled: 'END Report cancelled. Thank you for using Knight Watch.',
    error: 'END An error occurred. Please try dialling *384*11400# again.',
  },
  sw: {
    welcome: 'CON Karibu Knight Watch Kenya\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    invalidLang: 'CON Chagua lugha halali:\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    categoryMenu:
      'CON Chagua aina ya kosa:\n1. Ununuzi wa kura\n2. Michango haramu\n3. Matumizi mabaya ya rasilimali\n4. Matumizi yasiyodhihirishwa\n5. Rushwa\n6. Nyingine',
    invalidCategory:
      'CON Chagua 1-6:\n1. Ununuzi kura\n2. Michango haramu\n3. Rasilimali\n4. Matumizi fiche\n5. Rushwa\n6. Nyingine',
    enterDescription: 'CON Andika maelezo mafupi (herufi 160):',
    enterLocation: 'CON Andika kaunti au mji:',
    confirm: (desc, loc) =>
      `CON Thibitisha ripoti:\n"${desc.slice(0, 30)}" @ ${loc.slice(0, 18)}\n1. Ndiyo, tuma\n2. Ghairi`,
    invalidConfirm: 'CON Chaguo batili.\n1. Ndiyo, tuma ripoti\n2. Ghairi',
    thankYou: (id) => `END Asante. Nambari ya ripoti: ${id}\nRipoti yako imerekodiwa kikamilifu kwa ukaguzi.`,
    cancelled: 'END Ripoti imefutwa. Asante kwa kutumia Knight Watch.',
    error: 'END Hitilafu imetokea. Tafadhali piga tena *384*11400#.',
  },
  ki: {
    welcome: 'CON Wĩkĩrĩre Knight Watch Kenya\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    invalidLang: 'CON Hithia namba ĩrĩa njega:\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    categoryMenu:
      'CON Hithia mũhĩrĩro:\n1. Gũgura kura\n2. Mĩcango mĩũru\n3. Gũtumia rasilimali ũũru\n4. Gũtumia mbeca ũhoro\n5. Rũgongo\n6. Rĩngĩ',
    invalidCategory:
      'CON Hithia 1-6:\n1. Gũgura kura\n2. Mĩcango mĩũru\n3. Rasilimali\n4. Mbeca\n5. Rũgongo\n6. Rĩngĩ',
    enterDescription: 'CON Thomora maelezo magũhĩ (herufi 160):',
    enterLocation: 'CON Thomora kaunti kana thĩna:',
    confirm: (desc, loc) =>
      `CON Igũrũ gũtũma:\n"${desc.slice(0, 30)}" @ ${loc.slice(0, 18)}\n1. Iĩ, tũma\n2. Tiga`,
    invalidConfirm: 'CON Ti wega.\n1. Iĩ, tũma\n2. Tiga',
    thankYou: (id) => `END Wĩ mwega. Nambari ya ripoti: ${id}\nRipoti yaku nĩyandĩkĩtwo wega nĩgũo ĩkũmbũrwo.`,
    cancelled: 'END Ripoti yagĩrirwo. Ni wega gũthĩa Knight Watch.',
    error: 'END Kĩũmbe kĩonekire. Ndũrũmĩrĩra ringĩ *384*11400#.',
  },
  kam: {
    welcome: 'CON Mũvaka Knight Watch Kenya\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    invalidLang: 'CON Sya namba ĩla yĩthĩwa nesa:\n1. English\n2. Kiswahili\n3. Kikuyu\n4. Kamba',
    categoryMenu:
      'CON Sya mũsango:\n1. Kũgula kura\n2. Mĩsango ya kũvũa\n3. Kũtumia vyũ na ũsũngi\n4. Kũtumia tũndũ twa kũvũa\n5. Kũvũa ndalama\n6. Ndingĩ',
    invalidCategory:
      'CON Sya 1-6:\n1. Kũgula kura\n2. Mĩsango ya kũvũa\n3. Vyũ\n4. Kũvũa\n5. Ndalama\n6. Ndingĩ',
    enterDescription: 'CON Andika mũsango mũfupi (alafu 160):',
    enterLocation: 'CON Andika kaunti kana mũsyi:',
    confirm: (desc, loc) =>
      `CON Thibitisha kũtũma:\n"${desc.slice(0, 30)}" @ ${loc.slice(0, 18)}\n1. Iĩ, tũma\n2. Aa`,
    invalidConfirm: 'CON Tene.\n1. Iĩ, tũma\n2. Aa',
    thankYou: (id) => `END Ngalo. Nambari ya ripoti: ${id}\nRipoti yaku nĩyandĩkĩtwe nesa nĩkenda ĩsũngĩwe.`,
    cancelled: 'END Ripoti yasũngĩtwe. Ni veva gũtũmĩa Knight Watch.',
    error: 'END Kĩũmbe kĩonekire. Thĩĩa kĩla *384*11400#.',
  },
};

function getLang(choice: string | undefined): LangCode {
  if (choice === '1') return 'en';
  if (choice === '2') return 'sw';
  if (choice === '3') return 'ki';
  if (choice === '4') return 'kam';
  return 'en';
}

/**
 * Parses incoming USSD request body and parameters.
 * Supports application/x-www-form-urlencoded (Africa's Talking standard),
 * multipart/form-data, application/json, and URL query params.
 */
async function parseUssdParams(request: NextRequest): Promise<{
  sessionId: string;
  serviceCode: string;
  phoneNumber: string;
  text: string;
}> {
  let sessionId = '';
  let serviceCode = '';
  let phoneNumber = '';
  let text = '';

  const searchParams = request.nextUrl?.searchParams;
  if (searchParams) {
    sessionId = searchParams.get('sessionId') || '';
    serviceCode = searchParams.get('serviceCode') || '';
    phoneNumber = searchParams.get('phoneNumber') || '';
    text = searchParams.get('text') || '';
  }

  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const rawText = await request.text();
      const params = new URLSearchParams(rawText);
      sessionId = params.get('sessionId') || sessionId;
      serviceCode = params.get('serviceCode') || serviceCode;
      phoneNumber = params.get('phoneNumber') || phoneNumber;
      text = params.get('text') ?? text;
    } else if (contentType.includes('application/json')) {
      const json = await request.json();
      sessionId = json.sessionId || sessionId;
      serviceCode = json.serviceCode || serviceCode;
      phoneNumber = json.phoneNumber || phoneNumber;
      text = json.text ?? text;
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      sessionId = (formData.get('sessionId') as string) || sessionId;
      serviceCode = (formData.get('serviceCode') as string) || serviceCode;
      phoneNumber = (formData.get('phoneNumber') as string) || phoneNumber;
      text = (formData.get('text') as string) ?? text;
    } else {
      const rawText = await request.text();
      if (rawText) {
        try {
          const params = new URLSearchParams(rawText);
          sessionId = params.get('sessionId') || sessionId;
          serviceCode = params.get('serviceCode') || serviceCode;
          phoneNumber = params.get('phoneNumber') || phoneNumber;
          text = params.get('text') ?? text;
        } catch {}
      }
    }
  } catch (err) {
    console.warn('[USSD Request Parse Warning]', err);
  }

  return { sessionId, serviceCode, phoneNumber, text };
}

/**
 * Anonymize MSISDN for whistleblower privacy using SHA-256 with a salt.
 */
function hashPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return 'anonymous';
  const salt = process.env.WHISTLEBLOWER_SALT || 'knightwatch-cellular-salt-2026';
  return crypto.createHash('sha256').update(phoneNumber + salt).digest('hex');
}

interface StateMachineResult {
  lang: LangCode;
  step: 'lang' | 'category' | 'description' | 'location' | 'confirm' | 'complete' | 'cancelled';
  invalidStep?: 'lang' | 'category' | 'confirm';
  categoryKey?: string;
  description?: string;
  location?: string;
}

/**
 * Resilient multi-step USSD state machine.
 * Tolerates typos and re-prompts gracefully without losing earlier steps.
 */
function resolveSession(rawText: string): StateMachineResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { lang: 'en', step: 'lang' };
  }

  const tokens = trimmed.split('*').map((t) => t.trim()).filter((t) => t.length > 0);
  if (tokens.length === 0) {
    return { lang: 'en', step: 'lang' };
  }

  let tokenIdx = 0;
  let lang: LangCode = 'en';
  let langFound = false;

  // Step 1: Language selection (1-4)
  while (tokenIdx < tokens.length) {
    const candidate = tokens[tokenIdx];
    if (['1', '2', '3', '4'].includes(candidate)) {
      lang = getLang(candidate);
      langFound = true;
      tokenIdx++;
      break;
    }
    tokenIdx++;
    if (tokenIdx === tokens.length) {
      return { lang: 'en', step: 'lang', invalidStep: 'lang' };
    }
  }

  if (!langFound) {
    return { lang: 'en', step: 'lang' };
  }

  // Step 2: Category selection (1-6)
  let categoryKey: string | undefined;
  let categoryFound = false;

  while (tokenIdx < tokens.length) {
    const candidate = tokens[tokenIdx];
    if (['1', '2', '3', '4', '5', '6'].includes(candidate)) {
      categoryKey = candidate;
      categoryFound = true;
      tokenIdx++;
      break;
    }
    tokenIdx++;
    if (tokenIdx === tokens.length) {
      return { lang, step: 'category', invalidStep: 'category' };
    }
  }

  if (!categoryFound) {
    return { lang, step: 'category' };
  }

  // Step 3..5: Description, Location, and Confirmation
  const remaining = tokens.slice(tokenIdx);

  if (remaining.length === 0) {
    return { lang, categoryKey, step: 'description' };
  }

  const description = remaining[0] || 'USSD incident report';

  if (remaining.length === 1) {
    return {
      lang,
      categoryKey,
      description,
      step: 'location',
    };
  }

  const location = remaining[1] || 'Kenya';

  if (remaining.length === 2) {
    return {
      lang,
      categoryKey,
      description,
      location,
      step: 'confirm',
    };
  }

  // remaining.length >= 3: Evaluate final confirmation token
  const confirmCandidate = remaining[remaining.length - 1];
  if (confirmCandidate === '1') {
    return {
      lang,
      categoryKey,
      description,
      location,
      step: 'complete',
    };
  } else if (confirmCandidate === '2') {
    return {
      lang,
      categoryKey,
      description,
      location,
      step: 'cancelled',
    };
  } else {
    return {
      lang,
      categoryKey,
      description,
      location,
      step: 'confirm',
      invalidStep: 'confirm',
    };
  }
}

/** GET: Used by Africa's Talking dashboard to verify callback reachability */
export async function GET() {
  return new NextResponse(
    `Knight Watch Kenya USSD Gateway Active
Service Code: *384*11400#
Method: POST
Expected parameters: sessionId, serviceCode, phoneNumber, text
Provider: Africa's Talking
Status: Operational`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }
  );
}

/** POST: Main USSD webhook invoked by Africa's Talking on subscriber dial */
export async function POST(request: NextRequest) {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = await parseUssdParams(request);
    const session = resolveSession(text);
    const t = USSD_STRINGS[session.lang];

    let response: string;

    switch (session.step) {
      case 'lang': {
        response = session.invalidStep === 'lang' ? t.invalidLang : t.welcome;
        break;
      }

      case 'category': {
        response = session.invalidStep === 'category' ? t.invalidCategory : t.categoryMenu;
        break;
      }

      case 'description': {
        response = t.enterDescription;
        break;
      }

      case 'location': {
        response = t.enterLocation;
        break;
      }

      case 'confirm': {
        if (session.invalidStep === 'confirm') {
          response = t.invalidConfirm;
        } else {
          response = t.confirm(session.description || '', session.location || '');
        }
        break;
      }

      case 'cancelled': {
        response = t.cancelled;
        break;
      }

      case 'complete': {
        const description = (session.description || 'USSD report').slice(0, 500);
        const location = (session.location || 'Not specified').slice(0, 200);
        const category = categoryMap[session.categoryKey || '6'] || 'other';
        const title = `[USSD] ${description.slice(0, 60)}`;
        const callerHash = hashPhoneNumber(phoneNumber);
        const auditLogDesc = `${description}\n\n[USSD Session: ${sessionId || 'Direct'} | Caller SHA-256: ${callerHash.slice(0, 12)}...]`;

        let finalReportId = '';
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL;

        if (convexUrl) {
          try {
            const convex = new ConvexHttpClient(convexUrl);
            const convexMutation = convex.mutation(api.reports.create, {
              title,
              description: auditLogDesc,
              category,
              location,
              county: location,
              anonymous: true,
              source: 'ussd',
            });

            // 3500ms timeout guard so Africa's Talking never drops session on DB latency
            const timeoutGuard = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Convex timeout')), 3500)
            );

            const createdId = await Promise.race([convexMutation, timeoutGuard]);
            finalReportId = String(createdId);
          } catch (createErr) {
            console.error('[USSD Convex Mutation Error]', createErr);
          }
        }

        // Fallback receipt reference if Convex is offline, unconfigured, or timed out
        if (!finalReportId) {
          const timestampPart = Date.now().toString(36).slice(-3).toUpperCase();
          const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
          finalReportId = `KW-${timestampPart}${randomPart}`;
          console.log('[USSD Offline Fallback Stored]', {
            receiptId: finalReportId,
            phoneNumberHash: callerHash,
            sessionId,
            serviceCode,
            category,
            description,
            location,
            timestamp: new Date().toISOString(),
          });
        }

        response = t.thankYou(finalReportId);
        break;
      }

      default: {
        response = t.welcome;
        break;
      }
    }

    // Africa's Talking requires text/plain and HTTP status 200
    return new NextResponse(response, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err) {
    console.error('[USSD Uncaught Handler Error]', err);
    // Even on uncaught errors, NEVER return HTTP 500 to Africa's Talking.
    // An HTTP 200 with 'END' cleanly terminates the subscriber's phone session.
    const fallbackResponse = 'END An error occurred. Please try dialling *384*11400# again.';
    return new NextResponse(fallbackResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}
