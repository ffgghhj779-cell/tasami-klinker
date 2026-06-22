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

const fullWidths = { sm: 130, md: 160, lg: 190 } as const;

/** Full official logo scaled to header height — preserves exact brand file */
const headerHeights = {
  sm: 56,
  md: 64,
  lg: 72,
  xl: 80,
} as const;

function OfficialImage({
  priority,
  className,
  style,
}: {
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={brand.assets.official}
      alt={`${brand.name.en} — ${brand.name.ar}`}
      width={brand.officialDimensions.width}
      height={brand.officialDimensions.height}
      priority={priority}
      className={className}
      style={style}
    />
  );
}

function OfficialHeaderLogo({
  maxHeight,
  priority,
  interactive,
  className,
}: {
  maxHeight: number;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const aspect = brand.officialDimensions.width / brand.officialDimensions.height;
  const width = Math.round(maxHeight * aspect);

  return (
    <span
      className={cn(
        'inline-flex shrink-0',
        interactive &&
          'transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.03]',
        className
      )}
    >
      <OfficialImage
        priority={priority}
        className="h-auto w-auto object-contain object-left"
        style={{ maxHeight, width, height: 'auto' }}
      />
    </span>
  );
}

function OfficialFullLogo({
  width,
  priority,
  interactive,
  className,
  onDark = false,
}: {
  width: number;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
  onDark?: boolean;
}) {
  const img = (
    <OfficialImage
      priority={priority}
      className="h-auto object-contain"
      style={{ width, height: 'auto' }}
    />
  );

  if (onDark) {
    return (
      <span
        className={cn(
          'inline-flex rounded-xl bg-white px-4 py-3 shadow-sm',
          interactive && 'transition-transform duration-300 group-hover:scale-[1.02]',
          className
        )}
      >
        {img}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex',
        interactive && 'transition-transform duration-300 group-hover:scale-[1.02]',
        className
      )}
    >
      {img}
    </span>
  );
}

export function Logo({
  layout = 'official-full',
  variant = 'color',
  size = 'md',
  className,
  priority = false,
  interactive = false,
}: LogoProps) {
  if (layout === 'official-header') {
    const maxHeight = size === 'sm' ? headerHeights.sm : size === 'lg' ? headerHeights.lg : headerHeights.md;
    return (
      <OfficialHeaderLogo
        maxHeight={maxHeight}
        priority={priority}
        interactive={interactive}
        className={className}
      />
    );
  }

  if (layout === 'official-full' || layout === 'official-light') {
    const width = fullWidths[size];
    return (
      <OfficialFullLogo
        width={width}
        priority={priority}
        interactive={interactive}
        className={className}
        onDark={layout === 'official-light' || variant === 'light'}
      />
    );
  }

  if (layout === 'mark') {
    const px = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
    const src = variant === 'light' ? brand.assets.markLight : brand.assets.markColor;
    return (
      <Image
        src={src}
        alt={`${brand.name.en} — ${brand.name.ar}`}
        width={px}
        height={px}
        priority={priority}
        unoptimized
        className={cn('shrink-0 object-contain', className)}
        style={{ width: px, height: px }}
      />
    );
  }

  return null;
}

export function HeaderLogo({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <span className="sm:hidden">
        <OfficialHeaderLogo maxHeight={headerHeights.sm} priority={priority} interactive />
      </span>
      <span className="hidden sm:block lg:hidden">
        <OfficialHeaderLogo maxHeight={headerHeights.md} priority={priority} interactive />
      </span>
      <span className="hidden lg:block xl:hidden">
        <OfficialHeaderLogo maxHeight={headerHeights.lg} priority={priority} interactive />
      </span>
      <span className="hidden xl:block">
        <OfficialHeaderLogo maxHeight={headerHeights.xl} priority={priority} interactive />
      </span>
    </>
  );
}
