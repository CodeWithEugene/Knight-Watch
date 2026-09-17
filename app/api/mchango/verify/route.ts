import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { notifyMchangoReceipt } from '@/lib/notify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Missing Paystack secret key' }, { status: 500 });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: 'no-store',
    });

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      return NextResponse.json({
        status: 'pending',
        message: 'Awaiting verification response...',
      });
    }

    const data = paystackData.data || {};
    const transactionStatus = data.status; // "success" | "failed" | "abandoned" | "ongoing" | "pending"

    // If successful, ensure Convex contribution record is updated to verified
    if (transactionStatus === 'success') {
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL;
      if (convexUrl) {
        try {
          const convex = new ConvexHttpClient(convexUrl);
          await convex.action(api.webhooks.processPaystackWebhook, {
            paystackReference: reference,
            status: 'success',
          });
        } catch (convErr) {
          console.warn('Convex update from verify route warning:', convErr);
        }
      }
      // One-time Mchango receipt (atomic claim inside; safe under polling).
      const payerEmail = typeof data.customer?.email === 'string' ? data.customer.email : '';
      if (payerEmail && typeof data.amount === 'number') {
        try {
          await notifyMchangoReceipt({
            paystackReference: reference,
            payerEmail,
            amountKes: Math.round(data.amount / 100),
            paidAt: typeof data.paid_at === 'string' ? data.paid_at : undefined,
          });
        } catch (mailErr) {
          console.warn('Mchango receipt email warning:', mailErr);
        }
      }
    }

    return NextResponse.json({
      status: transactionStatus,
      amount: data.amount ? data.amount / 100 : null,
      currency: data.currency || 'KES',
      paidAt: data.paid_at || data.paidAt || null,
      gatewayResponse: data.gateway_response || '',
      reference: data.reference || reference,
      channel: data.channel || 'mobile_money',
    });
  } catch (err: unknown) {
    console.error('Verify error:', err);
    return NextResponse.json({ error: 'Failed to verify transaction' }, { status: 500 });
  }
}
