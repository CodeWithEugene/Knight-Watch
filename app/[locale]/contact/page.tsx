'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Building2
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSendError('');
    try {
      const res = await fetch('/api/notify/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSendError(data.error || 'Message service is temporarily unavailable. Please try again later.');
        return;
      }
      setSubmitted(true);
    } catch {
      setSendError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 lg:py-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="space-y-4 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Civic & Media Inquiry Desk
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-foreground">
            Contact Knight Watch
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Reach out to our legal analysts, investigative team, or press office. For anonymous malpractice submissions, please use the dedicated reporting form instead.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Card className="shadow-md border-border/80">
              {submitted ? (
                <CardContent className="p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-foreground mx-auto" />
                  <CardTitle className="text-xl font-bold">Message Transmitted</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-foreground">{name || 'Citizen'}</strong>. Your inquiry has been routed to our team. We typically respond within 24 business hours.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setSubmitted(false); setMessage(''); }}
                    className="text-xs mt-2"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-bold">Send an Official Message</CardTitle>
                    <CardDescription className="text-xs">
                      Fill out the form below to connect with our civic liaison team.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-foreground">Full Name</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Jane Doe"
                          className="h-10 text-xs bg-card"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-foreground">Email Address</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="jane@organization.ke"
                          className="h-10 text-xs bg-card"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-foreground">Subject / Department</label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="e.g. Media interview, Data research request, Legal inquiry"
                        className="h-10 text-xs bg-card"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-foreground">Message</label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        placeholder="Detail your inquiry or research scope..."
                        className="text-xs resize-none bg-card"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 flex-col gap-3">
                    {sendError && (
                      <p className="text-xs text-red-700 dark:text-red-300 text-center">{sendError}</p>
                    )}
                    <Button type="submit" disabled={loading} className="w-full font-bold text-xs h-10 gap-2">
                      <Send className="w-3.5 h-3.5" />
                      {loading ? 'Transmitting...' : 'Send Message'}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Physical & Official Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Institutional Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-foreground">Transparency International Kenya</div>
                  <p className="text-muted-foreground">Kindaruma Road, Off Ring Road Kilimani, Nairobi</p>
                  <p className="text-primary font-mono font-medium">Toll-Free Hotline: 0800 720 721</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-border">
                  <div className="font-semibold text-foreground">Strathmore University @iLabAfrica</div>
                  <p className="text-muted-foreground">Student Centre, 4th Floor, Keri Road, Madaraka, Nairobi</p>
                  <p className="text-muted-foreground font-mono">+254 703 034 616</p>
                  <p className="text-muted-foreground font-mono">ilabafrica@strathmore.edu</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 space-y-2 text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Whistleblower Warning
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Do <strong className="text-foreground">not</strong> use this public contact form to submit sensitive corruption evidence. Please use our encrypted reporting portal to guarantee anonymity and metadata stripping.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
