"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { SectionImage } from '@/components/ui/SectionImage';
import { siteImages } from '@/lib/site-images';
import { MapPin, Building2, Shield } from 'lucide-react';

export function About() {
  const { lang } = useLanguage();
  const t = content.about;
  const headingId = 'about-heading';
  const icons = [Building2, MapPin, Shield];

  return (
    <section id="about" className="section-padding bg-white" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeader id={headingId} title={t.title[lang]} />

        <SectionReveal className="mb-8 lg:mb-10">
          <SectionImage
            src={siteImages.about.src}
            alt={siteImages.about.alt[lang]}
            aspect="wide"
            overlay
          />
        </SectionReveal>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {t.paragraphs[lang].map((paragraph, idx) => {
            const Icon = icons[idx] || Building2;
            return (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <article className="h-full p-7 lg:p-8 rounded-xl border border-border-main bg-bg-alt hover:border-text-main/20 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-lg bg-white border border-border-main flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-text-main" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm lg:text-base text-text-secondary leading-relaxed font-medium">
                    {paragraph}
                  </p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
