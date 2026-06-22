"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveTable } from '@/components/ui/ResponsiveTable';
import { DownloadButton } from '@/components/ui/DownloadButton';

export function ProductSpecs() {
  const { lang } = useLanguage();
  const t = content.product;
  const headingId = 'product-heading';

  return (
    <section id="product" className="section-padding bg-white" aria-labelledby={headingId}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
          <SectionHeader
            id={headingId}
            title={lang === 'ar' ? 'المواصفات الفنية' : 'Technical Data'}
            className="mb-0"
          />
          <span className="text-[11px] text-text-secondary font-bold uppercase tracking-wider shrink-0 pb-2 sm:pb-8">
            {lang === 'ar' ? 'مطابق لمعايير ASTM / EN' : 'Compliant with ASTM / EN'}
          </span>
        </div>

        {/* Availability status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="status-banner mb-8"
        >
          <span className="status-dot" />
          <span>{t.status[lang]}</span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Specifications table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <ResponsiveTable
              headers={t.tableHeaders[lang]}
              rows={t.tableData}
              monoColumns={[1, 2, 3]}
            />
          </motion.div>

          {/* Quality & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
            id="quality"
          >
            <div className="p-6 lg:p-7 bg-bg-alt border border-border-main rounded-xl relative group hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-border-main flex items-center justify-center group-hover:border-primary transition-colors">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-main">
                  {t.quality.title[lang]}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {t.quality.text[lang]}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <DownloadButton pdfType="chemical-analysis" variant="dark" size="md" className="w-full">
                {t.btnChemical[lang]}
              </DownloadButton>
              <DownloadButton pdfType="certificates" variant="outline" size="md" className="w-full">
                {t.btnCertificates[lang]}
              </DownloadButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
