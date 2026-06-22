'use client';

import Image from 'next/image';
import { brand, type LogoLayout, type LogoVariant } from '@/lib/brand';
import { cn } from '@/lib/utils';

interface LogoProps {
  layout?: LogoLayout;
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
  interactive?: boolean;
}

const markSizes = {
  sm: 36,
  md: 44,
  lg: 52,
  xl: 58,
} as const;

const stackedWidths = {
  sm: 140,
  md: 168,
  lg: 196,
} as const;

function MarkImage({
  variant,
  size,
  priority,
  className,
}: {
  variant: LogoVariant;
  size: number;
  priority?: boolean;
  className?: string;
}) {
  const src = variant === 'light' ? brand.assets.markLight : brand.assets.markColor;
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      priority={priority}
      unoptimized
      aria-hidden
      className={cn('shrink-0 object-contain', className)}
      style={{ width: size, height: size }}
    />
  );
}

function BrandLockup({
  variant,
  size,
  priority,
  interactive,
  className,
}: {
  variant: LogoVariant;
  size: 'sm' | 'md' | 'lg';
  priority?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const isLight = variant === 'light';
  const markPx = size === 'sm' ? markSizes.md : size === 'lg' ? markSizes.xl : markSizes.lg;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 sm:gap-4 min-w-0',
        interactive &&
          'transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.04]',
        className
      )}
    >
      <MarkImage variant={variant} size={markPx} priority={priority} />
      <span className="flex flex-col justify-center min-w-0 leading-none">
        <span
          className={cn(
            'font-english font-extrabold tracking-wide',
            size === 'sm' ? 'text-lg sm:text-xl' : size === 'lg' ? 'text-2xl xl:text-[1.65rem]' : 'text-xl lg:text-2xl',
            isLight ? 'text-white' : 'text-text-main'
          )}
        >
          TASAMI
        </span>
        <span className="flex items-center gap-1.5 sm:gap-2 mt-1">
          <span className="h-px w-3 sm:w-4 bg-primary shrink-0" aria-hidden />
          <span
            className={cn(
              'font-english font-semibold uppercase text-primary tracking-[0.2em] sm:tracking-[0.24em]',
              size === 'sm' ? 'text-[7px] sm:text-[8px]' : 'text-[8px] sm:text-[9px]'
            )}
          >
            INDUSTRIAL
          </span>
          <span className="h-px w-3 sm:w-4 bg-primary shrink-0" aria-hidden />
        </span>
        <span
          className={cn(
            'hidden min-[400px]:block font-bold mt-1.5 sm:mt-2 truncate',
            size === 'sm' ? 'text-xs sm:text-sm' : 'text-sm lg:text-base',
            isLight ? 'text-white' : 'text-text-main'
          )}
        >
          {brand.name.ar}
        </span>
        <span
          className={cn(
            'hidden md:flex items-center gap-2 mt-1.5',
            size === 'sm' ? 'text-[9px]' : 'text-[10px]',
            isLight ? 'text-white/55' : 'text-text-secondary'
          )}
        >
          <span className={cn('h-px w-3', isLight ? 'bg-white/20' : 'bg-border-main')} aria-hidden />
          <span className="font-medium whitespace-nowrap">{brand.slogan.ar}</span>
          <span className={cn('h-px w-3', isLight ? 'bg-white/20' : 'bg-border-main')} aria-hidden />
        </span>
      </span>
    </span>
  );
}

function BrandLockupCompact({
  variant,
  priority,
  interactive,
  className,
}: {
  variant: LogoVariant;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const isLight = variant === 'light';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 min-w-0',
        interactive &&
          'transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.04]',
        className
      )}
    >
      <MarkImage variant={variant} size={markSizes.md} priority={priority} />
      <span
        className={cn(
          'font-english font-extrabold text-lg tracking-wide leading-none',
          isLight ? 'text-white' : 'text-text-main'
        )}
      >
        TASAMI
      </span>
    </span>
  );
}

function StackedLogo({
  variant,
  size,
  priority,
  interactive,
  className,
}: {
  variant: LogoVariant;
  size: 'sm' | 'md' | 'lg';
  priority?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const width = stackedWidths[size];
  const src = variant === 'light' ? brand.assets.stackedLight : brand.assets.stackedColor;

  if (variant === 'color') {
    return (
      <span
        className={cn(
          'relative inline-flex justify-start',
          interactive && 'transition-transform duration-300 group-hover:scale-[1.02]',
          className
        )}
      >
        <Image
          src={brand.assets.pngOverride}
          alt={`${brand.name.en} — ${brand.name.ar}`}
          width={480}
          height={640}
          priority={priority}
          className="h-auto object-contain"
          style={{ width, height: 'auto' }}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'relative inline-flex justify-start',
        interactive && 'transition-transform duration-300 group-hover:scale-[1.02]',
        className
      )}
    >
      <Image
        src={src}
        alt={`${brand.name.en} — ${brand.name.ar}`}
        width={240}
        height={200}
        priority={priority}
        unoptimized
        className="h-auto object-contain"
        style={{ width, height: 'auto' }}
      />
    </span>
  );
}

export function Logo({
  layout = 'lockup',
  variant = 'color',
  size = 'md',
  className,
  priority = false,
  interactive = false,
}: LogoProps) {
  const alt = `${brand.name.en} — ${brand.name.ar}`;

  if (layout === 'lockup-compact') {
    return (
      <BrandLockupCompact
        variant={variant}
        priority={priority}
        interactive={interactive}
        className={className}
      />
    );
  }

  if (layout === 'lockup') {
    return (
      <BrandLockup
        variant={variant}
        size={size}
        priority={priority}
        interactive={interactive}
        className={className}
      />
    );
  }

  if (layout === 'stacked') {
    return (
      <StackedLogo
        variant={variant}
        size={size}
        priority={priority}
        interactive={interactive}
        className={className}
      />
    );
  }

  if (layout === 'mark') {
    const px = size === 'sm' ? markSizes.sm : size === 'lg' ? markSizes.lg : markSizes.md;
    return (
      <span
        className={cn(
          'inline-flex',
          interactive && 'transition-transform duration-300 group-hover:scale-[1.03]',
          className
        )}
        aria-label={alt}
      >
        <MarkImage variant={variant} size={px} priority={priority} />
      </span>
    );
  }

  return null;
}

export function HeaderLogo({
  variant = 'color',
  priority = false,
}: {
  variant?: LogoVariant;
  priority?: boolean;
}) {
  return (
    <>
      <span className="min-[400px]:hidden">
        <Logo layout="lockup-compact" variant={variant} priority={priority} interactive />
      </span>
      <span className="hidden min-[400px]:inline-flex xl:hidden">
        <Logo layout="lockup" variant={variant} size="md" priority={priority} interactive />
      </span>
      <span className="hidden xl:inline-flex">
        <Logo layout="lockup" variant={variant} size="lg" priority={priority} interactive />
      </span>
    </>
  );
}
