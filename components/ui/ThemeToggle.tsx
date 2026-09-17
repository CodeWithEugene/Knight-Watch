'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`size-8 rounded-full border border-border bg-background/50 flex items-center justify-center shrink-0 ${className}`}
      >
        <span className="sr-only">Loading theme</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`size-8 rounded-full border border-input bg-background text-foreground flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-accent hover:text-accent-foreground hover:border-foreground/30 shadow-xs cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="size-4 transition-transform duration-200" aria-hidden />
      ) : (
        <Moon className="size-4 transition-transform duration-200" aria-hidden />
      )}
    </button>
  );
}
