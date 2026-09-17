'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, CheckCircle2, AlertCircle, Loader2, ShieldCheck, ArrowRight, RefreshCw, Lock } from 'lucide-react';
import { KENYAN_PARTIES, getPartyBySlug } from '@/lib/partyData';

interface MchangoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPartySlug?: string;
  defaultAmount?: number;
  locale?: string;
}

type PaymentMethod = 'mpesa' | 'airtel' | 'card';
type ModalStep = 'form' | 'waiting' | 'success' | 'failed';

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

export function MchangoModal({
  isOpen,
  onClose,
  defaultPartySlug = 'uda',
  defaultAmount = 1000,
  locale = 'en',
}: MchangoModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [partySlug, setPartySlug] = useState(defaultPartySlug);
  const [amount, setAmount] = useState(defaultAmount);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState({
    number: '',
    cvv: '',
    expiry_month: '',
    expiry_year: '',
  });

  const [step, setStep] = useState<ModalStep>('form');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [countdown, setCountdown] = useState(60);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    onClose();
  }, [onClose]);

  // Sync props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (defaultPartySlug) setPartySlug(defaultPartySlug);
      if (defaultAmount) setAmount(defaultAmount);
      setStep('form');
      setErrorMessage('');
      setSubmitting(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    }
  }, [isOpen, defaultPartySlug, defaultAmount, handleClose]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const currentParty = getPartyBySlug(partySlug) || KENYAN_PARTIES[0];

  const handleStartCharge = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (amount < 10) {
      setErrorMessage('Minimum contribution is KES 10');
      return;
    }

    if ((paymentMethod === 'mpesa' || paymentMethod === 'airtel') && !phone.trim()) {
      setErrorMessage(`Please enter your ${paymentMethod === 'mpesa' ? 'M-Pesa' : 'Airtel Money'} phone number.`);
      return;
    }

    if (paymentMethod === 'card') {
      if (!card.number || !card.cvv || !card.expiry_month || !card.expiry_year) {
        setErrorMessage('Please fill in complete card details.');
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/mchango/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          partyId: currentParty.slug,
          partyName: currentParty.name,
          paymentMethod,
          phone: phone.trim(),
          email: email.trim(),
          card: paymentMethod === 'card' ? card : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Payment could not be started. Please check details and retry.');
        setSubmitting(false);
        return;
      }

      setReference(data.reference);
      setDisplayText(data.displayText || 'Please authorize the payment prompt on your phone.');

      if (data.status === 'success') {
        setStep('success');
        setSubmitting(false);
        return;
      }

      if (data.redirectUrl) {
        // 3DS redirect if required by card issuer
        window.location.href = data.redirectUrl;
        return;
      }

      // Enter waiting/prompt screen and start polling background status
      setStep('waiting');
      setSubmitting(false);
      setCountdown(60);

      const targetRef = data.reference;
      let remaining = 60;

      pollIntervalRef.current = setInterval(async () => {
        remaining -= 2;
        setCountdown(remaining);

        if (remaining <= 0) {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setErrorMessage('Payment verification timed out. If you entered your PIN, it will appear on the audit ledger shortly.');
          setStep('failed');
          return;
        }

        try {
          const verifyRes = await fetch(`/api/mchango/verify?reference=${encodeURIComponent(targetRef)}`);
          const verifyData = await verifyRes.json();

          if (verifyData.status === 'success') {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setStep('success');
          } else if (verifyData.status === 'failed' || verifyData.status === 'abandoned') {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setErrorMessage(verifyData.gatewayResponse || 'The payment was declined or cancelled on your phone.');
            setStep('failed');
          }
        } catch {
          // Keep polling on minor network glitch
        }
      }, 2000);
    } catch {
      setErrorMessage('Network error connecting to payment engine. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        className="relative w-full max-w-[440px] rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-7 text-card-foreground overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button at top-right */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>

        {/* STEP 1: Main Contribution Form */}
        {step === 'form' && (
          <form onSubmit={handleStartCharge} className="space-y-5">
            {/* Top Emblem / Icon Header */}
            <div className="text-center space-y-2 pt-1">
              <div className="mx-auto size-14 rounded-2xl bg-muted/80 border border-border p-1.5 flex items-center justify-center shadow-inner group">
                {currentParty.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentParty.logo}
                    alt={currentParty.name}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <ShieldCheck className="size-7 text-emerald-500" />
                )}
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-foreground">
                  Contribute to {currentParty.acronym || currentParty.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  Support campaign integrity with M-Pesa 🇰🇪, Airtel Money, or Card
                </p>
              </div>
            </div>

            {/* Payment Method Switcher (Official Logos) */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border">
              {/* M-PESA */}
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa')}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  paymentMethod === 'mpesa'
                    ? 'bg-card text-card-foreground shadow-xs border border-border/80 font-medium'
                    : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-card/50'
                }`}
              >
                <div className="h-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/payments/mpesa.svg" alt="M-Pesa" className="h-5 w-auto object-contain" />
                </div>
                {paymentMethod === 'mpesa' && (
                  <div className="h-1 w-10 bg-[#22c55e] rounded-full shadow-[0_0_12px_#22c55e] mt-1.5 animate-in fade-in" />
                )}
              </button>

              {/* Airtel Money */}
              <button
                type="button"
                onClick={() => setPaymentMethod('airtel')}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  paymentMethod === 'airtel'
                    ? 'bg-card text-card-foreground shadow-xs border border-border/80 font-medium'
                    : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-card/50'
                }`}
              >
                <div className="h-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/payments/airtel-money.svg" alt="Airtel Money" className="h-5 w-auto object-contain" />
                </div>
                {paymentMethod === 'airtel' && (
                  <div className="h-1 w-10 bg-[#ef4444] rounded-full shadow-[0_0_12px_#ef4444] mt-1.5 animate-in fade-in" />
                )}
              </button>

              {/* Mastercard */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-card text-card-foreground shadow-xs border border-border/80 font-medium'
                    : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-card/50'
                }`}
              >
                <div className="h-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-5 w-auto object-contain" />
                </div>
                {paymentMethod === 'card' && (
                  <div className="h-1 w-10 bg-[#f59e0b] rounded-full shadow-[0_0_12px_#f59e0b] mt-1.5 animate-in fade-in" />
                )}
              </button>
            </div>

            {/* Error Banner if any */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Dynamic Input: Phone or Card */}
            {paymentMethod === 'mpesa' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Your M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678 or +254712345678"
                  className="w-full h-12 px-4 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  required
                />
              </div>
            )}

            {paymentMethod === 'airtel' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Your Airtel Money Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0732345678 or +254732345678"
                  className="w-full h-12 px-4 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
                  required
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-2.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full h-12 px-4 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">Month</label>
                    <input
                      type="text"
                      value={card.expiry_month}
                      onChange={(e) => setCard({ ...card, expiry_month: e.target.value })}
                      placeholder="MM"
                      maxLength={2}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-xs text-center focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">Year</label>
                    <input
                      type="text"
                      value={card.expiry_year}
                      onChange={(e) => setCard({ ...card, expiry_year: e.target.value })}
                      placeholder="YY"
                      maxLength={4}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-xs text-center focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">CVV</label>
                    <input
                      type="password"
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground font-mono text-xs text-center focus:border-primary outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Input: Amount (KES) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Amount (KES)
              </label>
              <input
                type="number"
                min={10}
                max={1000000}
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-xl bg-background border border-input text-foreground font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      amount === val
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    KES {val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={submitting}
              className="relative overflow-hidden group w-full py-3.5 px-6 rounded-full font-bold text-sm sm:text-base text-primary-foreground bg-primary hover:opacity-90 shadow-md transition-all duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Connecting to Gateway...</span>
                  </>
                ) : (
                  <span>
                    Pay KES {amount.toLocaleString()} with {paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'airtel' ? 'Airtel Money' : 'Card'}
                  </span>
                )}
              </span>
            </button>

            {/* Bottom Hint Banner */}
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-3.5 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              {paymentMethod === 'card' ? (
                <>
                  <Lock className="size-3.5 text-amber-500 shrink-0" />
                  <span>256-bit SSL encrypted. Audited background transaction.</span>
                </>
              ) : (
                <>
                  <span className="text-sm">💡</span>
                  <span>
                    You will receive an {paymentMethod === 'mpesa' ? 'M-Pesa' : 'Airtel Money'} prompt on your phone. Enter your PIN to complete.
                  </span>
                </>
              )}
            </div>
          </form>
        )}

        {/* STEP 2: Waiting for PIN on Phone (STK Push Screen) */}
        {step === 'waiting' && (
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="relative mx-auto size-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-emerald-500/40 animate-ping opacity-60" />
              <Loader2 className="size-9 text-emerald-500 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black font-display text-foreground">
                Check Your Phone
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                We have sent an authorization request for <span className="font-bold text-foreground">KES {amount.toLocaleString()}</span> to <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{phone}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2 text-left text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Recipient</span>
                <span className="font-semibold text-foreground">{currentParty.name}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Amount</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">KES {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Ref Code</span>
                <span className="font-mono text-[11px] text-foreground">{reference}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <RefreshCw className="size-3.5 animate-spin text-muted-foreground" />
              <span>Awaiting confirmation ({countdown}s)...</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                setStep('form');
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              Cancel or Change Number
            </button>
          </div>
        )}

        {/* STEP 3: Payment Verified & Success */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="mx-auto size-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black font-display text-foreground">
                Contribution Confirmed!
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Your civic contribution has been successfully processed and timestamped onto the public integrity ledger.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2.5 text-left text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Party</span>
                <span className="font-semibold text-foreground">{currentParty.name}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Amount Contributed</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">KES {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Audit Reference</span>
                <span className="font-mono text-[11px] text-foreground truncate max-w-[180px]">{reference}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">VERIFIED</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href={`/${locale}/transparency`}
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-semibold text-xs transition-opacity flex items-center justify-center gap-1.5"
              >
                <span>View Transparency Ledger</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-muted-foreground hover:text-foreground py-1 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Failed State */}
        {step === 'failed' && (
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="mx-auto size-16 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center text-destructive">
              <AlertCircle className="size-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black font-display text-foreground">
                Payment Not Completed
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                {errorMessage || 'The payment prompt timed out or was declined on your phone.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setStep('form');
                }}
                className="w-full py-3 px-4 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs transition-opacity cursor-pointer"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-muted-foreground hover:text-foreground py-1 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
