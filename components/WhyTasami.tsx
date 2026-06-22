"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
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
                className="group relative p-7 lg:p-8 bg-white border border-border-main rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="absolute top-0 end-0 w-28 h-28 bg-primary/[0.04] rounded-full blur-2xl -me-8 -mt-8 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 mb-5 bg-bg-alt border border-border-main rounded-xl flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  </div>

                  <p className="font-bold text-base lg:text-lg text-text-main leading-relaxed group-hover:text-primary transition-colors duration-300">
                    {point}
                  </p>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
