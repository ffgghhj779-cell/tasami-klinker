"use client";

import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { heroImage } from '@/lib/site-config';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { CertificationBadges } from '@/components/CertificationBadges';
import { cn } from '@/lib/utils';

export function Hero() {
  const { lang, dir } = useLanguage();
  const t = content.hero;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const headingId = 'hero-heading';

  const titleParts = t.title[lang].split('–');
  const titleMain = titleParts[0]?.trim();
  const titleAccent = titleParts[1]?.trim();

  return (
    <section
      className="relative min-h-0 sm:min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={heroImage.src}
          alt={heroImage.alt[lang]}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-bg-alt/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-xl sm:max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="status-banner mb-6 sm:mb-8 w-full max-w-md sm:max-w-none sm:w-auto"
            role="status"
          >
            <span className="status-dot" aria-hidden />
            <span>
              {lang === 'ar'
                ? 'متوفر حالياً – جاهز للشحن خلال 24–48 ساعة'
                : 'Currently Available – Ready to ship in 24–48 hours'}
            </span>
          </motion.div>

          <motion.h1
            id={headingId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={cn(
              'text-[1.5rem] leading-[1.25] sm:text-4xl sm:leading-[1.12] lg:text-6xl xl:text-[4.25rem] font-extrabold text-text-main tracking-tight mb-5 sm:mb-6',
              lang === 'en' && 'font-english'
            )}
          >
            {titleMain}
            {titleAccent && (
              <>
                <span className="block sm:inline sm:ms-1 mt-1 sm:mt-0 text-primary">{titleAccent}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-lg lg:text-xl text-text-secondary mb-8 sm:mb-10 max-w-md sm:max-w-2xl leading-relaxed"
          >
            {t.subtitle[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto sm:mx-0"
          >
            <Button href="#how-we-work" variant="primary" size="md" className="w-full sm:w-auto sm:!px-8 sm:!py-4 sm:text-base !py-3">
              {t.btnStart[lang]}
              <Arrow className="w-5 h-5" aria-hidden />
            </Button>
            <DownloadButton
              pdfType="market-report"
              variant="outline"
              size="md"
              className="w-full sm:w-auto sm:!px-8 sm:!py-4 sm:text-base !py-3"
            >
              {t.btnReport[lang]}
            </DownloadButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="pt-10 sm:pt-14 w-full max-w-md mx-auto"
          >
            <p id="certifications-label" className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-bold mb-6">
              {lang === 'ar' ? 'معتمد وموثق عالمياً' : 'Globally Certified & Verified'}
            </p>
            <CertificationBadges />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
