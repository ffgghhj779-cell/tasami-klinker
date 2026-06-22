'use client';

import Image from 'next/image';
import { brand, type LogoLayout, type LogoVariant } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/LanguageProvider';

interface LogoProps {
  layout?: LogoLayout;
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
  interactive?: boolean;
}

const fullWidths = { sm: 130, md: 160, lg: 190 } as const;

const headerHeights = {
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

/** Top icon crop from official logo file */
function OfficialMarkIcon({
  size = 40,
  priority,
}: {
  size?: number;
  priority?: boolean;
}) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-md bg-transparent"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <OfficialImage
        priority={priority}
        className="absolute top-0 left-1/2 max-w-none -translate-x-1/2 object-cover object-top"
        style={{ width: Math.round(size * 1.35), height: 'auto' }}
      />
    </span>
  );
}

function BrandWordmark({
  variant = 'color',
  compact = false,
}: {
  variant?: LogoVariant;
  compact?: boolean;
}) {
  const { lang } = useLanguage();
  const isLight = variant === 'light';

  return (
    <span className="flex flex-col justify-center min-w-0 leading-none gap-0.5">
      <span
        className={cn(
          'font-bold truncate',
          compact ? 'text-[13px]' : 'text-sm sm:text-[15px]',
          isLight ? 'text-white' : 'text-text-main'
        )}
      >
        {lang === 'ar' ? brand.name.ar : brand.name.en}
      </span>
      {lang === 'ar' && (
        <span
          className={cn(
            'font-english font-semibold uppercase tracking-[0.14em] text-primary',
            compact ? 'text-[7px]' : 'text-[8px]'
          )}
        >
          TASAMI INDUSTRIAL
        </span>
      )}
      <span
        className={cn(
          'font-medium truncate',
          compact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]',
          isLight ? 'text-white/60' : 'text-text-secondary'
        )}
      >
        {brand.slogan[lang]}
      </span>
    </span>
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
    const maxHeight = size === 'lg' ? headerHeights.lg : headerHeights.md;
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

/** Mobile/tablet: icon + name + slogan | Desktop: full official logo */
export function HeaderLogo({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <span
        className={cn(
          'lg:hidden inline-flex items-center gap-2.5 min-w-0 max-w-[calc(100vw-4.5rem)]',
          'transition-all duration-300 ease-out group-hover:scale-[1.02]'
        )}
      >
        <OfficialMarkIcon size={38} priority={priority} />
        <BrandWordmark />
      </span>
      <span className="hidden lg:inline-flex xl:hidden">
        <OfficialHeaderLogo maxHeight={headerHeights.lg} priority={priority} interactive />
      </span>
      <span className="hidden xl:inline-flex">
        <OfficialHeaderLogo maxHeight={headerHeights.xl} priority={priority} interactive />
      </span>
    </>
  );
}
