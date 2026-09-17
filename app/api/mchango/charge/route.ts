import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

function formatKenyanPhone(phone: string): string {
  // Remove spaces, hyphens, and parentheses
  let cleaned = phone.replace(/[\s\-()]/g, '');

  // Handle +254...
  if (cleaned.startsWith('+254')) {
    return cleaned;
  }
  // Handle 254...
  if (cleaned.startsWith('254')) {
    return `+${cleaned}`;
  }
  // Handle 07... or 01...
  if (cleaned.startsWith('0')) {
    return `+254${cleaned.slice(1)}`;
  }
  // Handle 7... or 1...
  if (/^[17]/.test(cleaned) && cleaned.length === 9) {
    return `+254${cleaned}`;
  }

  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Payment gateway is not configured (missing secret key)' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      amount,
      partyId,
      partyName,
      paymentMethod = 'mpesa',
      phone = '',
      email = '',
      card,
    } = body as {
      amount: number;
      partyId: string;
      partyName: string;
      paymentMethod: 'mpesa' | 'airtel' | 'card';
      phone?: string;
      email?: string;
      card?: {
        number: string;
        cvv: string;
        expiry_month: string;
        expiry_year: string;
      };
    };

    if (!amount || amount < 10 || !partyId || !partyName) {
      return NextResponse.json(
        { error: 'Invalid contribution amount or missing recipient details.' },
        { status: 400 }
      );
    }

    const formattedPhone = phone ? formatKenyanPhone(phone) : '';

    if ((paymentMethod === 'mpesa' || paymentMethod === 'airtel') && (!formattedPhone || formattedPhone.length < 12)) {
      return NextResponse.json(
        { error: 'Please enter a valid Kenyan phone number (e.g. 0712345678 or +254712345678).' },
        { status: 400 }
      );
    }

    if (paymentMethod === 'card') {
      if (!card || !card.number || !card.cvv || !card.expiry_month || !card.expiry_year) {
        return NextResponse.json(
          { error: 'Please fill in all card details (card number, expiration, and CVV).' },
          { status: 400 }
        );
      }
    }

    // Reference identifier for Knight Watch Mchango
    const reference = `mchango-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const donorEmail =
      email && email.includes('@')
        ? email.trim()
        : `donor-${(formattedPhone || reference).replace(/\D/g, '').slice(-9) || 'anon'}@knightwatch.ke`;

    // Record pending contribution in Convex
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL;
    if (convexUrl) {
      try {
        const convex = new ConvexHttpClient(convexUrl);
        await convex.mutation(api.contributions.create, {
          amount,
          partyId,
          partyName,
          paystackReference: reference,
          email: donorEmail,
        });
      } catch (convErr) {
        console.warn('Convex initial insert warning:', convErr);
      }
    }

    // Build Paystack Charge payload
    let paystackPayload: Record<string, unknown> = {
      email: donorEmail,
      amount: Math.round(amount * 100), // in cents
      currency: 'KES',
      reference,
      metadata: {
        partyId,
        partyName,
        phone: formattedPhone,
        paymentMethod,
      },
    };

    if (paymentMethod === 'mpesa' || paymentMethod === 'airtel') {
      paystackPayload = {
        ...paystackPayload,
        mobile_money: {
          phone: formattedPhone,
          provider: 'mpesa', // Safaricom & CBK interoperable mobile money channel in Kenya
        },
      };
    } else if (paymentMethod === 'card' && card) {
      paystackPayload = {
        ...paystackPayload,
        card: {
          number: card.number.replace(/\s+/g, ''),
          cvv: card.cvv.trim(),
          expiry_month: card.expiry_month.padStart(2, '0'),
          expiry_year: card.expiry_year.length === 2 ? `20${card.expiry_year}` : card.expiry_year,
        },
      };
    }

    // Execute background charge against Paystack API
    const paystackRes = await fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paystackPayload),
    });

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      const errorMsg =
        paystackData.message ||
        paystackData.data?.message ||
        'Failed to initiate background payment. Please verify phone number or card details.';
      return NextResponse.json({ error: errorMsg, details: paystackData }, { status: 400 });
    }

    const data = paystackData.data || {};

    return NextResponse.json({
      success: true,
      reference: data.reference || reference,
      status: data.status, // e.g. "pay_offline", "send_pin", "send_otp", "open_url", "success"
      displayText:
        data.display_text ||
        (paymentMethod === 'card'
          ? 'Processing card authorization...'
          : 'Please enter your PIN on your mobile device to complete payment.'),
      redirectUrl: data.url || null,
      phone: formattedPhone,
      amount,
      partyName,
      partyId,
    });
  } catch (err: unknown) {
    console.error('Mchango background charge error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while contacting the payment processor.' },
      { status: 500 }
    );
  }
}
