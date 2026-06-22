"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { Factory } from 'lucide-react';

export function Footer() {
  const { lang } = useLanguage();
  const t = content.footer;

  return (
    <footer className="bg-text-main text-white">
      <div className="container py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-bold text-sm font-english tracking-wide">
                TASAMI INDUSTRIAL
              </div>
              <div className="text-white/60 text-xs mt-0.5">
                {t.tagline[lang]}
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {t.links[lang].map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-xs font-semibold text-white/70 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md text-[10px] font-extrabold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.badge[lang]}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[11px] text-white/50 leading-relaxed text-center lg:text-start">
            {t.text[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
