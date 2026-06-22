"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { Anchor, Calculator, Map, Package, Ship, Truck, Factory } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveTable } from '@/components/ui/ResponsiveTable';
import { Button } from '@/components/ui/Button';

const flowIcons = [Factory, Anchor, Ship, Map, Package, Truck];

export function Logistics() {
  const { lang, dir } = useLanguage();
  const t = content.logistics;
  const flowSteps = t.flow[lang].split(' → ');
  const headingId = 'logistics-heading';

  return (
    <section id="logistics" className="section-padding bg-bg-alt" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeader id={headingId} title={t.title[lang]} />

        {/* Mobile: vertical stepper */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:hidden mb-10 bg-white p-6 rounded-xl border border-border-main shadow-sm"
        >
          <ol className="relative space-y-0 list-none p-0 m-0">
            {flowSteps.map((step, idx) => {
              const Icon = flowIcons[idx] || Ship;
              const isLast = idx === flowSteps.length - 1;

              return (
                <li key={idx} className="relative flex gap-4 pb-8 last:pb-0">
                  {!isLast && (
                    <span
                      className="absolute top-11 bottom-0 w-0.5 bg-border-main"
                      style={{ insetInlineStart: '1.375rem' }}
                      aria-hidden
                    />
                  )}
                  <div className="relative z-10 shrink-0 w-11 h-11 rounded-full border-2 border-border-main flex items-center justify-center text-text-secondary bg-white shadow-sm">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="pt-2.5 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1 block">
                      {lang === 'ar' ? `الخطوة ${idx + 1}` : `Step ${idx + 1}`}
                    </span>
                    <span className="font-semibold text-sm text-text-main leading-snug">{step}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden lg:block mb-10 bg-white p-6 lg:p-8 rounded-xl border border-border-main shadow-sm"
        >
          <div className="flex items-center gap-3 justify-between">
            {flowSteps.map((step, idx) => {
              const Icon = flowIcons[idx] || Ship;
              const isLast = idx === flowSteps.length - 1;

              return (
                <div key={idx} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 shrink-0 group">
                    <div className="w-11 h-11 rounded-full border-2 border-border-main flex items-center justify-center text-text-secondary bg-white group-hover:border-text-main/40 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-semibold text-sm text-text-main whitespace-normal">
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <span className="text-border-main font-bold text-base shrink-0 px-1" aria-hidden>
                      {dir === 'rtl' ? '←' : '→'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <ResponsiveTable
          headers={t.tableHeaders[lang]}
          rows={t.tableData[lang]}
          monoColumns={[3, 4]}
          className="mb-10"
        />

        <div className="flex justify-center">
          <Button href="#contact" variant="dark" size="lg">
            <Calculator className="w-5 h-5" />
            {t.btnCustomSchedule[lang]}
          </Button>
        </div>
      </div>
    </section>
  );
}
