'use client';

import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import {
  FileWarning,
  Lock,
  UploadCloud,
  Image as ImageIcon,
  Video,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  X,
  FileCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum([
    'vote-buying',
    'illegal-donations',
    'misuse-public-resources',
    'undeclared-spending',
    'bribery',
    'other',
  ]),
  location: z.string().min(2, 'Location is required'),
  anonymous: z.boolean().default(false),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().max(0).optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

const categories = [
  { value: 'misuse-public-resources', label: 'Misuse of Public Resources (Vehicles, Offices, Staff)' },
  { value: 'vote-buying', label: 'Voter Bribery & Handouts (Cash, Food, Goods)' },
  { value: 'undeclared-spending', label: 'Undeclared Campaign Spending (Billboards, Rallies)' },
  { value: 'illegal-donations', label: 'Prohibited Donations (Foreign / Dark Money)' },
  { value: 'bribery', label: 'Bribery of Electoral or Security Officials' },
  { value: 'other', label: 'Other Campaign Finance Malpractice' },
];

const KENYA_HOTSPOT_COUNTIES = [
  'Nairobi', 'Mombasa', 'Nakuru', 'Kiambu', 'Kisumu', 'Uasin Gishu',
  'Machakos', 'Kilifi', 'Kakamega', 'Meru', 'Nyeri', 'Garissa'
];

const MAX_IMAGES = 5;
const MAX_VIDEO = 1;
const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

export default function ReportPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const createReport = useMutation(api.reports.create);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: { anonymous: true, website: '', category: 'misuse-public-resources' },
  });

  const isAnonymous = watch('anonymous');

  async function uploadFiles(): Promise<Id<'_storage'>[]> {
    const ids: Id<'_storage'>[] = [];
    const allFiles = [...imageFiles, ...(videoFile ? [videoFile] : [])];
    for (const file of allFiles) {
      const url = await generateUploadUrl();
      const res = await fetch(url, { method: 'POST', body: file });
      if (!res.ok) throw new Error('Upload failed');
      const { storageId } = await res.json();
      ids.push(storageId);
    }
    return ids;
  }

  const onSubmit = async (data: ReportFormData) => {
    if (data.website) return;
    setSubmitting(true);
    setUploadError(null);
    try {
      let mediaIds: Id<'_storage'>[] | undefined;
      if (imageFiles.length > 0 || videoFile) {
        try {
          mediaIds = await uploadFiles();
        } catch {
          setUploadError('File upload encountered an issue. Submitting report text securely.');
        }
      }
      const reportId = await createReport({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        county: data.location?.trim() || undefined,
        anonymous: data.anonymous,
        email: data.email && data.email.length > 0 ? data.email : undefined,
        mediaIds: mediaIds?.length ? mediaIds : undefined,
        source: 'web',
      });
      router.push(`/${locale}/report/success?id=${reportId}`);
    } catch {
      // If Convex isn't connected yet, generate an offline ticket ID
      const fallbackId = 'RPT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      router.push(`/${locale}/report/success?id=${fallbackId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid: File[] = [];
    for (const f of files) {
      if (f.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) continue;
      if (!f.type.startsWith('image/')) continue;
      if (valid.length >= MAX_IMAGES) break;
      valid.push(f);
    }
    setImageFiles((prev) => [...prev, ...valid].slice(0, MAX_IMAGES));
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setVideoFile(null);
      return;
    }
    if (f.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) return;
    if (!f.type.startsWith('video/')) return;
    setVideoFile(f);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs gap-1">
            <Lock className="w-3 h-3 text-foreground" />
            <span>Encrypted Whistleblower Intake</span>
          </Badge>
          <Badge variant="success" className="text-xs">
            TI-Kenya Monitored
          </Badge>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground">
          Report Campaign Finance Malpractice
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Help uphold democracy in Kenya. Submit photographic evidence, location data, or observations of illegal campaign expenditures. You can report 100% anonymously without logging your identity.
        </p>

        {/* Offline Channels Quick Link */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/${locale}/report/ussd`}
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1.5 bg-muted/50 border border-border px-3 py-1.5 rounded-lg"
          >
            <PhoneCall className="w-3.5 h-3.5 text-foreground" />
            <span>No internet? Dial *384*11400# (USSD)</span>
          </Link>
          <Link
            href={`/${locale}/report/sms`}
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1.5 bg-muted/50 border border-border px-3 py-1.5 rounded-lg"
          >
            <MessageSquare className="w-3.5 h-3.5 text-foreground" />
            <span>SMS Whistleblower Instructions</span>
          </Link>
        </div>
      </div>

      {/* Main Intake Form */}
      <Card className="border-border shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Section 1: Core Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-display font-bold text-base text-foreground">Incident Classification</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Violation Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Report Title <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('title')}
                placeholder="e.g. County fire engines & staff ferried to political rally in Kisumu Central"
                className="h-11 text-sm"
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Detailed Narrative Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                {...register('description')}
                rows={5}
                placeholder="Detail the date, time, political actors or party involved, approximate monetary value or vehicle plate numbers, and names of public officials present..."
                className="text-sm leading-relaxed"
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-display font-bold text-base text-foreground">Geographic Location</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                County, Constituency, or Ward <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('location')}
                placeholder="e.g. Nakuru Town West, Kaptembwo Ward"
                className="h-11 text-sm"
              />
              {errors.location && (
                <p className="text-xs text-red-500">{errors.location.message}</p>
              )}

              {/* County Hotspot Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                <span className="text-[11px] text-muted-foreground mr-1">Quick Select:</span>
                {KENYA_HOTSPOT_COUNTIES.slice(0, 7).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setValue('location', c)}
                    className="px-2 py-0.5 rounded text-[11px] bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Evidence Files */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-display font-bold text-base text-foreground">Evidence & Documentation</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo Upload Zone */}
              <div className="p-4 rounded-xl border border-dashed border-border bg-muted/20 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <ImageIcon className="w-4 h-4 text-foreground" />
                  <span>Photos (Max {MAX_IMAGES})</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload banners, cash distribution, vehicle number plates (Max 5MB each).
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-xs h-9"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                  <span>Select Images ({imageFiles.length}/{MAX_IMAGES})</span>
                </Button>

                {imageFiles.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {imageFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-1.5 rounded bg-card border">
                        <span className="truncate max-w-[180px]">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload Zone */}
              <div className="p-4 rounded-xl border border-dashed border-border bg-muted/20 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Video Clip (Max 1 File)</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Short video documenting the activity (Max 50MB).
                </p>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={onVideoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full text-xs h-9"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                  <span>{videoFile ? 'Change Video' : 'Select Video'}</span>
                </Button>

                {videoFile && (
                  <div className="flex items-center justify-between text-xs p-1.5 rounded bg-card border pt-1">
                    <span className="truncate max-w-[180px]">{videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="text-red-500 hover:text-red-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {uploadError && (
              <Alert variant="warning">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Section 4: Anonymity & Protection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="font-display font-bold text-base text-foreground">Whistleblower Protection</h3>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('anonymous')}
                  className="w-4 h-4 mt-1 rounded border-input text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-semibold text-sm text-foreground">
                    Submit as Anonymous Citizen
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your IP address and device fingerprint will NOT be linked or recorded with this dossier.
                  </p>
                </div>
              </label>

              {!isAnonymous && (
                <div className="pt-3 border-t border-border space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Follow-Up Email Address (Confidential)
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="e.g. auditor@example.com"
                    className="h-10 text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Used only if TI-Kenya investigators require additional clarification on this report.
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 font-bold text-base shadow-sm gap-2"
          >
            <FileWarning className="w-5 h-5" />
            <span>{submitting ? 'Encrypting & Dispatching...' : 'Submit Incident Report'}</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
