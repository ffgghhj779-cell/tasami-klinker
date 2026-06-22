"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResponsiveTable } from '@/components/ui/ResponsiveTable';
import { DownloadButton } from '@/components/ui/DownloadButton';

export function MarketStatus() {
  const { lang } = useLanguage();
  const t = content.marketStatus;
  const headingId = 'market-heading';

  return (
    <section id="market" className="section-padding bg-bg-alt" aria-labelledby={headingId}>
      <div className="container">
        <div className="flex flex-col items-center text-center sm:items-end sm:text-start sm:flex-row sm:justify-between gap-3 sm:gap-4 mb-2">
          <SectionHeader
            id={headingId}
            title={t.title[lang]}
            className="mb-0"
          />
          <span className="text-[11px] text-text-secondary font-bold uppercase tracking-wider shrink-0 pb-0 sm:pb-8 max-w-xs sm:max-w-none leading-relaxed">
            {lang === 'ar' ? 'المصدر: التقارير الاقتصادية المعتمدة' : 'Source: Authorized Economic Reports'}
          </span>
        </div>

        <ResponsiveTable
          headers={t.tableHeaders[lang]}
          rows={t.tableData[lang]}
          highlightColumn={2}
          monoColumns={[1]}
          className="mb-10"
        />

        <div className="text-center">
          <DownloadButton pdfType="market-report" variant="dark" size="lg">
            {t.btnDownload[lang]}
          </DownloadButton>
        </div>
      </div>
    </section>
  );
}
