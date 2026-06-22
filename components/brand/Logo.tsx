'use client';

import Image from 'next/image';
import { useState } from 'react';
import { brand, type LogoLayout, type LogoVariant } from '@/lib/brand';
import { cn } from '@/lib/utils';

interface LogoProps {
  layout?: LogoLayout;
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  interactive?: boolean;
}

const dimensions: Record<LogoLayout, Record<'sm' | 'md' | 'lg', { width: number; height: number }>> = {
  horizontal: {
    sm: { width: 168, height: 40 },
    md: { width: 200, height: 48 },
    lg: { width: 240, height: 56 },
  },
  stacked: {
    sm: { width: 120, height: 100 },
    md: { width: 148, height: 122 },
    lg: { width: 176, height: 146 },
  },
  mark: {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
  },
};

/** Official uploaded PNG is portrait; these heights crop to the header lockup zone. */
const pngHeaderHeights: Record<'sm' | 'md' | 'lg', number> = {
  sm: 88,
  md: 104,
  lg: 120,
};

const pngStackedHeights: Record<'sm' | 'md' | 'lg', number> = {
  sm: 100,
  md: 122,
  lg: 146,
};

function resolveSvgSrc(layout: LogoLayout, variant: LogoVariant): string {
  if (layout === 'mark') {
    return variant === 'light' ? brand.assets.markLight : brand.assets.markColor;
  }
  if (layout === 'stacked') {
    return variant === 'light' ? brand.assets.stackedLight : brand.assets.stackedColor;
  }
  return variant === 'light' ? brand.assets.horizontalLight : brand.assets.horizontalColor;
}

export function Logo({
  layout = 'horizontal',
  variant = 'color',
  size = 'md',
  className,
  imageClassName,
  priority = false,
  interactive = false,
}: LogoProps) {
  const [pngFailed, setPngFailed] = useState(false);
  const dim = dimensions[layout][size];
  const useOfficialPng = variant === 'color' && !pngFailed && layout !== 'mark';
  const svgSrc = resolveSvgSrc(layout, variant);

  if (variant === 'light') {
    return (
      <span
        className={cn(
          'relative inline-flex shrink-0 items-center',
          interactive && 'transition-transform duration-300 ease-out group-hover:scale-[1.03]',
          className
        )}
      >
        <Image
          src={svgSrc}
          alt={`${brand.name.en} — ${brand.name.ar}`}
          width={dim.width}
          height={dim.height}
          priority={priority}
          unoptimized
          className={cn('h-auto w-auto object-contain object-left', imageClassName)}
          style={{ width: dim.width, height: dim.height, maxWidth: '100%' }}
        />
      </span>
    );
  }

  if (useOfficialPng && (layout === 'horizontal' || layout === 'stacked')) {
    const pngHeight = layout === 'horizontal' ? pngHeaderHeights[size] : pngStackedHeights[size];

    return (
      <span
        className={cn(
          'relative inline-flex shrink-0 items-start overflow-hidden',
          layout === 'horizontal' ? 'items-center' : 'items-start',
          interactive && 'transition-transform duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.03]',
          className
        )}
        style={layout === 'horizontal' ? { height: dim.height, maxWidth: dim.width } : undefined}
      >
        <Image
          src={brand.assets.pngOverride}
          alt={`${brand.name.en} — ${brand.name.ar}`}
          width={480}
          height={640}
          priority={priority}
          onError={() => setPngFailed(true)}
          className={cn(
            'w-auto object-contain object-top',
            layout === 'horizontal' && 'max-w-none',
            imageClassName
          )}
          style={{
            height: pngHeight,
            width: 'auto',
            maxWidth: layout === 'horizontal' ? dim.width * 1.6 : dim.width,
            marginTop: layout === 'horizontal' ? -(pngHeight - dim.height) / 2 : 0,
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center',
        interactive && 'transition-transform duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.03]',
        className
      )}
    >
      <Image
        src={svgSrc}
        alt={`${brand.name.en} — ${brand.name.ar}`}
        width={dim.width}
        height={dim.height}
        priority={priority}
        unoptimized
        className={cn('h-auto w-auto object-contain object-left', imageClassName)}
        style={{ width: dim.width, height: dim.height, maxWidth: '100%' }}
      />
    </span>
  );
}
