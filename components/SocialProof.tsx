"use client";

import { useLanguage } from './LanguageProvider';
import { motion } from 'motion/react';
import { content } from '@/lib/content';

const markets = [
  { code: 'SY', name: { ar: 'سوريا', en: 'Syria' } },
  { code: 'LB', name: { ar: 'لبنان', en: 'Lebanon' } },
  { code: 'JO', name: { ar: 'الأردن', en: 'Jordan' } },
  { code: 'YE', name: { ar: 'اليمن', en: 'Yemen' } },
  { code: 'LY', name: { ar: 'ليبيا', en: 'Libya' } },
  { code: 'TN', name: { ar: 'تونس', en: 'Tunisia' } },
  { code: 'SD', name: { ar: 'السودان', en: 'Sudan' } },
];

const stats = [
  {
    value: '24–48h',
    label: { ar: 'جاهزية الشحن', en: 'Shipping readiness' },
  },
  {
    value: '7',
    label: { ar: 'أسواق مستهدفة', en: 'Target markets' },
  },
  {
    value: 'LC',
    label: { ar: 'دفع آمن at sight', en: 'Secure LC at sight' },
  },
  {
    value: 'SGS',
    label: { ar: 'توثيق لكل شحنة', en: 'Per-shipment docs' },
  },
];

export function SocialProof() {
  const { lang } = useLanguage();

  return (
    <section
      className="bg-text-main text-white py-12 lg:py-14"
      aria-label={lang === 'ar' ? 'إثبات الثقة والأسواق' : 'Trust and markets proof'}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1fr_auto] gap-10 items-center"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
              {lang === 'ar' ? 'أسواقنا المستهدفة' : 'Markets We Serve'}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-snug">
              {lang === 'ar'
                ? 'توريد موثوق لأسواق الشرق الأوسط وشمال أفريقيا'
                : 'Trusted supply across Middle East & North Africa'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {markets.map((m) => (
                <span
                  key={m.code}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition-colors"
                >
                  <span className="text-primary font-extrabold text-xs">{m.code}</span>
                  {m.name[lang]}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 lg:min-w-[280px]">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="text-center lg:text-start p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-2xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-white/70 font-medium leading-snug">{stat.label[lang]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/50">
          {content.footer.text[lang]}
        </p>
      </div>
    </section>
  );
}
