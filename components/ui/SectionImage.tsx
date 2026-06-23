'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspect?: 'video' | 'wide' | 'square' | 'portrait';
  overlay?: boolean;
}

const aspectClass = {
  video: 'aspect-video',
  wide: 'aspect-[21/9] sm:aspect-[2.4/1]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
} as const;

export function SectionImage({
  src,
  alt,
  className,
  priority = false,
  aspect = 'video',
  overlay = false,
}: SectionImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border-main bg-bg-alt shadow-sm',
        aspectClass[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-text-main/50 via-text-main/10 to-transparent"
          aria-hidden
        />
      )}
    </div>
  );
}
