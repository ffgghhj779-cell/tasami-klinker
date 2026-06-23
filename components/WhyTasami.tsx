"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionImage } from '@/components/ui/SectionImage';
import { siteImages } from '@/lib/site-images';
import { staggerContainer, fadeInUp, cardHover } from '@/lib/motion';

const icons = [CheckCircle2, FileText, ShieldCheck];

export function WhyTasami() {
  const { lang } = useLanguage();
  const t = content.whyTasami;
  const headingId = 'why-tasami-heading';

  return (
    <section id="why-tasami" className="section-padding bg-white" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeader id={headingId} title={t.title[lang]} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-10"
        >
          <SectionImage
            src={siteImages.operationsQuarry.src}
            alt={siteImages.operationsQuarry.alt[lang]}
            aspect="video"
            overlay
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
        >
          {t.metrics[lang].map((metric, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-xl border border-border-main bg-bg-alt"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-primary mb-1">{metric}</div>
              <div className="text-[11px] sm:text-xs text-text-secondary font-semibold leading-snug">
                {t.metricLabels[lang][idx]}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {t.points[lang].map((point, idx) => {
            const Icon = icons[idx];

            return (
              <motion.article
                key={idx}
                variants={fadeInUp}
                whileHover={cardHover}
                className="group relative p-7 lg:p-8 bg-white border border-border-main rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="absolute top-0 end-0 w-28 h-28 bg-primary/[0.03] rounded-full blur-2xl -me-8 -mt-8 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 mb-5 bg-bg-alt border border-border-main rounded-xl flex items-center justify-center group-hover:border-text-main/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  </div>

                  <p className="font-bold text-base lg:text-lg text-text-main leading-relaxed">
                    {point}
                  </p>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-text-main/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
