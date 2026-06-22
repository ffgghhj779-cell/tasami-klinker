"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { Anchor, Calculator, Map, Package, Ship, Truck, Factory } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveTable } from '@/components/ui/ResponsiveTable';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

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

        {/* Visual flow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 bg-white p-6 lg:p-8 rounded-xl border border-border-main shadow-sm overflow-x-auto hide-scrollbar"
        >
          <div className="flex items-center gap-2 min-w-max lg:min-w-0 lg:justify-between">
            {flowSteps.map((step, idx) => {
              const Icon = flowIcons[idx] || Ship;
              const isLast = idx === flowSteps.length - 1;

              return (
                <div key={idx} className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 shrink-0 group">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border-2 border-border-main flex items-center justify-center text-text-secondary bg-white group-hover:border-primary group-hover:text-primary transition-all duration-300 shadow-sm">
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-semibold text-xs lg:text-sm text-text-main whitespace-nowrap group-hover:text-primary transition-colors max-w-[120px] lg:max-w-none truncate lg:whitespace-normal">
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <span
                      className={cn(
                        'text-border-main font-bold text-sm lg:text-base shrink-0 px-1',
                        'group-hover:text-primary/40 transition-colors'
                      )}
                      aria-hidden
                    >
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
