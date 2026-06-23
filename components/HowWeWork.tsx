"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionImage } from '@/components/ui/SectionImage';
import { siteImages } from '@/lib/site-images';
import { Button } from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export function HowWeWork() {
  const { lang, dir } = useLanguage();
  const t = content.howWeWork;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const headingId = 'how-we-work-heading';

  return (
    <section id="how-we-work" className="section-padding bg-white" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeader id={headingId} title={t.title[lang]} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-10"
        >
          <SectionImage
            src={siteImages.operationsConstruction.src}
            alt={siteImages.operationsConstruction.alt[lang]}
            aspect="video"
            overlay
          />
        </motion.div>

        <div className="relative mt-4 mb-14">
          <div className="hidden lg:block absolute top-7 inset-x-[12%] h-px bg-border-main" aria-hidden />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 list-none p-0 m-0"
          >
            {t.steps[lang].map((step, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="w-14 h-14 mb-5 bg-white border-2 border-border-main rounded-full flex items-center justify-center text-lg font-extrabold text-text-main group-hover:border-primary group-hover:text-primary transition-colors duration-300 relative z-10 shadow-sm group-hover:shadow-md"
                  aria-label={`${lang === 'ar' ? 'الخطوة' : 'Step'} ${idx + 1}`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.div>
                <p className="text-sm font-semibold text-text-main leading-relaxed px-2 group-hover:text-primary transition-colors duration-300">
                  {step}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Button href="#contact" variant="primary" size="lg">
            {t.btnStart[lang]}
            <Arrow className="w-5 h-5" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
