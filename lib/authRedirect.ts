/**
 * Safe callback URL for post-login/signup redirects.
 * Prevents open redirects: only allow relative paths (e.g. /en/dashboard).
 */
export function getSafeCallbackUrl(callbackUrl: string | null, locale: string): string {
  const fallback = `/${locale}`;
  if (!callbackUrl || typeof callbackUrl !== 'string') return fallback;
  const trimmed = callbackUrl.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return fallback;

  // Never redirect back to auth pages (e.g. login, signup, reset-password, forgot-password)
  const normalized = trimmed.replace(/^\/[a-z]{2,3}/, '') || '/';
  if (
    normalized === '/login' ||
    normalized.startsWith('/login/') ||
    normalized === '/signup' ||
    normalized.startsWith('/signup/') ||
    normalized === '/admin/login' ||
    normalized.startsWith('/admin/login/') ||
    normalized === '/forgot-password' ||
    normalized === '/reset-password'
  ) {
    return fallback;
  }

  return trimmed;
}
