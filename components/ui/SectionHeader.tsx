"use client";

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'start' | 'center';
  id?: string;
}

export function SectionHeader({ title, subtitle, className, align = 'start', id }: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-8 sm:mb-10 lg:mb-12 text-center sm:text-start',
      align === 'center' && 'text-center',
      className
    )}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className={cn(
          'flex items-center gap-3 mb-3',
          align === 'center' ? 'justify-center' : 'justify-center sm:justify-start'
        )}>
          <span className="h-px w-8 bg-primary shrink-0" aria-hidden />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            TASAMI
          </span>
        </div>
        <h2 id={id} className="text-lg sm:text-2xl lg:text-4xl font-bold text-text-main leading-snug sm:leading-tight tracking-tight max-w-lg mx-auto sm:mx-0">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed mx-auto sm:mx-0">
            {subtitle}
          </p>
        )}
        <div className={cn(
          'mt-5 h-0.5 w-16 bg-primary rounded-full',
          align === 'center' ? 'mx-auto' : 'mx-auto sm:mx-0'
        )} />
      </motion.div>
    </div>
  );
}
