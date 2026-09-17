import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return buildPageMetadata({ locale: params.locale, routeKey: 'admin' });
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();
  const locale = params?.locale || 'en';
  if (!session?.user && !params) return null;
  const pathname = typeof window !== 'undefined' ? null : undefined;
  if (!session?.user) {
    redirect(`/${locale}/admin/login?callbackUrl=/${locale}/admin`);
  }
  const isAdmin = (session.user as { role?: string })?.role === 'admin';
  if (!isAdmin) redirect(`/${locale}`);

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8">
      <nav className="flex gap-4 mb-8 border-b border-[var(--border-color)] pb-4">
        <Link href={`/${locale}/admin`} className="font-bold text-[var(--accent-1)]">
          Dashboard
        </Link>
        <Link href={`/${locale}/admin/reports`} className="font-medium hover:underline">
          Reports
        </Link>
        <span className="text-[var(--text-secondary)] ml-auto">{session.user.email}</span>
      </nav>
      {children}
    </div>
  );
}
