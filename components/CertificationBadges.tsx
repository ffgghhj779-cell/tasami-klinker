"use client";

import { useLanguage } from './LanguageProvider';
import { motion } from 'motion/react';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

const badges = [
  {
    id: 'iso9001',
    lines: ['ISO', '9001'],
    color: 'border-[#1e3a5f] text-[#1e3a5f]',
    bg: 'bg-[#f0f4f8]',
    alt: { ar: 'شهادة ISO 9001', en: 'ISO 9001 certification' },
  },
  {
    id: 'sgs',
    lines: ['SGS'],
    sub: 'CERTIFIED',
    color: 'border-[#c41230] text-[#c41230]',
    bg: 'bg-[#fff5f5]',
    alt: { ar: 'شهادة SGS', en: 'SGS certification' },
  },
  {
    id: 'saudi',
    lines: ['SAUDI'],
    sub: 'MADE',
    color: 'border-[#006c35] text-[#006c35]',
    bg: 'bg-[#f0fdf4]',
    alt: { ar: 'صنع في السعودية', en: 'Saudi Made' },
  },
  {
    id: 'iso14001',
    lines: ['ISO', '14001'],
    color: 'border-[#2d6a4f] text-[#2d6a4f]',
    bg: 'bg-[#f1f8f4]',
    alt: { ar: 'شهادة ISO 14001', en: 'ISO 14001 certification' },
  },
] as const;

interface CertificationBadgesProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function CertificationBadges({ className, size = 'md' }: CertificationBadgesProps) {
  const { lang } = useLanguage();
  const dim = size === 'sm' ? 'w-16 h-16 text-[9px]' : 'w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 text-[10px] sm:text-[11px]';

  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('flex flex-wrap justify-center gap-4 sm:gap-6 list-none p-0 m-0', className)}
      aria-label={lang === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications and accreditations'}
    >
      {badges.map((badge) => (
        <motion.li key={badge.id} variants={fadeInUp}>
          <div
            className={cn(
              'group flex flex-col items-center justify-center rounded-full border-2 font-extrabold leading-none text-center shadow-sm transition-all duration-300',
              'hover:shadow-md hover:-translate-y-0.5 hover:scale-105',
              dim,
              badge.color,
              badge.bg
            )}
            role="img"
            aria-label={badge.alt[lang]}
          >
            {badge.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {'sub' in badge && badge.sub && (
              <span className="text-[0.65em] mt-0.5 tracking-wider opacity-90">{badge.sub}</span>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
