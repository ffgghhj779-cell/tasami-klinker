"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { staggerContainer, fadeInUp, cardHover } from '@/lib/motion';
import { cn } from '@/lib/utils';

const certifications = [
  { label: 'ISO 9001', alt: { ar: 'شهادة ISO 9001 لنظام إدارة الجودة', en: 'ISO 9001 Quality Management certification' } },
  { label: 'SGS Cert.', alt: { ar: 'شهادة SGS المختبرية', en: 'SGS laboratory certification' } },
  { label: 'SAUDI MADE', alt: { ar: 'علامة صنع في السعودية', en: 'Saudi Made mark certification' } },
  { label: 'ISO 14001', alt: { ar: 'شهادة ISO 14001 للإدارة البيئية', en: 'ISO 14001 Environmental Management certification' } },
];

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
      className="relative min-h-[88vh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 bg-bg-alt overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 end-0 w-[min(800px,90vw)] h-[min(800px,90vw)] bg-primary/[0.04] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 start-0 w-[min(500px,70vw)] h-[min(500px,70vw)] bg-gray-200/40 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322262B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="status-banner mb-8 !inline-flex w-auto"
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
              'text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold text-text-main leading-[1.12] tracking-tight mb-6',
              lang === 'en' && 'font-english'
            )}
          >
            {titleMain}
            {titleAccent && (
              <>
                <br className="hidden sm:block" />
                <span className="text-primary"> {titleAccent}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg lg:text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed"
          >
            {t.subtitle[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button href="#how-we-work" variant="primary" size="lg" className="w-full sm:w-auto">
              {t.btnStart[lang]}
              <Arrow className="w-5 h-5" aria-hidden />
            </Button>
            <DownloadButton
              pdfType="market-report"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.btnReport[lang]}
            </DownloadButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="pt-14 w-full"
          >
            <p id="certifications-label" className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-bold mb-6">
              {lang === 'ar' ? 'معتمد وموثق عالمياً' : 'Globally Certified & Verified'}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-4 sm:gap-8 list-none p-0 m-0"
              aria-labelledby="certifications-label"
            >
              {certifications.map((cert) => (
                <motion.li key={cert.label} variants={fadeInUp}>
                  <motion.div
                    whileHover={cardHover}
                    className="group flex flex-col items-center gap-2"
                    role="img"
                    aria-label={cert.alt[lang]}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 border border-border-main bg-white rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-extrabold text-center leading-tight text-text-secondary group-hover:border-primary group-hover:text-primary transition-colors duration-300 shadow-sm group-hover:shadow-md">
                      {cert.label.includes(' ') ? (
                        <>
                          {cert.label.split(' ')[0]}
                          <br />
                          {cert.label.split(' ').slice(1).join(' ')}
                        </>
                      ) : (
                        cert.label
                      )}
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
