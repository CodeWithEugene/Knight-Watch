import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';

export function BrandLogo({
  locale = 'en',
  className = '',
  iconOnly = false,
  size = 'md',
  subtitle,
}: {
  locale?: string;
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
}) {
  const { t } = useTranslation(locale);
  const displaySubtitle = subtitle ?? t('home.heroBadge', 'Civic Campaign Finance Integrity');
  const iconDimensions = {
    sm: { width: 32, height: 32, class: 'w-8 h-8' },
    md: { width: 40, height: 40, class: 'w-10 h-10' },
    lg: { width: 48, height: 48, class: 'w-12 h-12' },
  };

  const textSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-lg sm:text-xl font-black',
  };

  return (
    <Link
      href={`/${locale}`}
      className={`group flex items-center gap-2.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg ${className}`}
      aria-label="Knight Watch Kenya - Home"
    >
      <div
        className={`relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${iconDimensions[size].class}`}
      >
        {/* In light mode: Pure Black icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icon/icon-black.png"
          alt="Knight Watch Logo"
          width={iconDimensions[size].width}
          height={iconDimensions[size].height}
          className="w-full h-full object-contain dark:hidden"
          loading="eager"
          decoding="async"
        />
        {/* In dark mode: Pure White icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icon/icon-white.png"
          alt="Knight Watch Logo"
          width={iconDimensions[size].width}
          height={iconDimensions[size].height}
          className="w-full h-full object-contain hidden dark:block"
          loading="eager"
          decoding="async"
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col min-w-0">
          <span className={`font-display tracking-tight text-foreground leading-none ${textSizes[size]}`}>
            Knight Watch
          </span>
          <span className="text-[10px] font-medium tracking-wide text-muted-foreground leading-tight mt-1 max-w-[150px] sm:max-w-[170px] truncate">
            {displaySubtitle}
          </span>
        </div>
      )}
    </Link>
  );
}
