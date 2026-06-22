"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';

export function Header() {
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = content.header.nav[lang];
  const sectionIds = useMemo(() => navLinks.map((l) => l.href), [navLinks]);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinkClass = (href: string, mobile = false) =>
    cn(
      'relative transition-colors duration-200',
      mobile
        ? 'py-3 px-2 text-base font-semibold border-b border-border-main/50 last:border-0'
        : 'px-3 py-2 text-[13px] font-semibold whitespace-nowrap rounded-md',
      activeId === href
        ? mobile
          ? 'text-primary'
          : 'text-primary bg-primary/5'
        : mobile
          ? 'text-text-main hover:text-text-main'
          : 'text-text-secondary hover:text-text-main'
    );

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/97 backdrop-blur-lg shadow-[0_1px_0_0_#E5E7EB,0_4px_24px_-4px_rgba(0,0,0,0.06)] py-3'
          : 'bg-white border-b border-border-main py-4'
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group shrink-0 min-w-0"
            aria-label={lang === 'ar' ? 'تسامي الصناعية — الصفحة الرئيسية' : 'TASAMI INDUSTRIAL — Home'}
          >
            <Logo layout="horizontal" variant="color" size="md" priority interactive />
          </a>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
                aria-current={activeId === link.href ? 'page' : undefined}
              >
                {link.label}
                {activeId === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div className="lang-switch" role="group" aria-label="Language switcher">
              <button
                type="button"
                className={cn(lang === 'ar' && 'active')}
                onClick={() => setLang('ar')}
                aria-pressed={lang === 'ar'}
              >
                AR
              </button>
              <button
                type="button"
                className={cn(lang === 'en' && 'active')}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
            <Button href="#contact" variant="dark" size="sm">
              {content.header.cta[lang]}
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2.5 -me-2 rounded-lg text-text-main hover:bg-bg-alt transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-border-main bg-white overflow-hidden"
          >
            <div className="container py-5 flex flex-col gap-1">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={navLinkClass(link.href, true)}
                    aria-current={activeId === link.href ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {activeId === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {link.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="flex items-center justify-between pt-4 mt-2 gap-3">
                <div className="lang-switch">
                  <button type="button" className={cn(lang === 'ar' && 'active')} onClick={() => setLang('ar')}>AR</button>
                  <button type="button" className={cn(lang === 'en' && 'active')} onClick={() => setLang('en')}>EN</button>
                </div>
                <Button href="#contact" variant="primary" size="sm" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
                  {content.header.cta[lang]}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
