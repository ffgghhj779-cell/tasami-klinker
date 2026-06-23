'use client';

import { Phone } from 'lucide-react';
import { siteContact, formatPhoneTel } from '@/lib/site-config';
import { cn } from '@/lib/utils';

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'header' | 'footer' | 'chip';
}

const variantClass = {
  default: 'font-semibold text-sm dir-ltr-field hover:text-primary transition-colors',
  header: 'hidden lg:inline-flex items-center gap-2 text-[13px] font-bold text-text-secondary hover:text-primary transition-colors dir-ltr-field',
  footer: 'inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors dir-ltr-field',
  chip: 'inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 border border-border-main text-sm font-bold text-text-main shadow-sm hover:border-primary hover:text-primary transition-colors dir-ltr-field',
} as const;

export function PhoneLink({ className, showIcon = true, variant = 'default' }: PhoneLinkProps) {
  const phone = siteContact.phone;

  return (
    <a
      href={`tel:${formatPhoneTel(phone)}`}
      className={cn(variantClass[variant], className)}
      aria-label={phone}
    >
      {showIcon && <Phone className={cn('shrink-0', variant === 'chip' ? 'w-4 h-4 text-primary' : 'w-4 h-4')} aria-hidden />}
      {phone}
    </a>
  );
}
