"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

export function FAQ() {
  const { lang } = useLanguage();
  const t = content.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const headingId = 'faq-heading';

  return (
    <section id="faq" className="section-padding bg-bg-alt" aria-labelledby={headingId}>
      <div className="container max-w-3xl">
        <SectionHeader
          id={headingId}
          title={lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          align="center"
        />

        <div role="list">
          {t[lang].map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                role="listitem"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={cn('faq-item', isOpen && 'open')}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-start cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base lg:text-lg text-text-main leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-180 text-primary'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
                        <div className="ps-4 border-s-[3px] border-primary text-text-secondary leading-relaxed text-sm lg:text-base">
                          {item.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
