"use client";

import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { Logo } from '@/components/brand/Logo';
import { PhoneLink } from '@/components/PhoneLink';
import { siteContact } from '@/lib/site-config';
import { Mail } from 'lucide-react';

const footerHrefs = ['/privacy', '/terms', '#quality'];

export function Footer() {
  const { lang } = useLanguage();
  const t = content.footer;

  return (
    <footer className="bg-text-main text-white">
      <div className="container py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-col gap-5 items-start">
            <Logo layout="official-light" variant="light" size="md" />
            <p className="text-white/55 text-sm max-w-xs leading-relaxed">
              {t.tagline[lang]}
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden />
                {siteContact.email}
              </a>
              <PhoneLink variant="footer" />
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {t.links[lang].map((link, i) => (
              <a
                key={i}
                href={footerHrefs[i] ?? '#'}
                className="text-xs font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wide"
              >
                {link}
              </a>
            ))}
          </nav>

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
