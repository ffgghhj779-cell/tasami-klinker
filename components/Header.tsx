"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { HeaderLogo } from '@/components/brand/Logo';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';

const drawerVariants = {
  closed: (isRtl: boolean) => ({ x: isRtl ? '-100%' : '100%' }),
  open: { x: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Header() {
  const { lang, setLang, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = dir === 'rtl';

  const navLinks = content.header.nav[lang];
  const sectionIds = useMemo(() => navLinks.map((l) => l.href), [navLinks]);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    document.body.classList.toggle('mobile-menu-open', mobileMenuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinkClass = (href: string, mobile = false) =>
    cn(
      'relative transition-colors duration-200',
      mobile
        ? 'flex items-center min-h-[52px] px-4 text-[15px] font-semibold rounded-xl active:bg-bg-alt'
        : 'px-3 py-2 text-[13px] font-semibold whitespace-nowrap rounded-md',
      activeId === href
        ? mobile
          ? 'text-primary bg-primary/5'
          : 'text-primary bg-primary/5'
        : mobile
          ? 'text-text-main'
          : 'text-text-secondary hover:text-text-main'
    );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/97 backdrop-blur-lg shadow-[0_1px_0_0_#E5E7EB,0_4px_24px_-4px_rgba(0,0,0,0.06)] py-3'
            : 'bg-white border-b border-border-main py-3.5 lg:py-4'
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between gap-3 lg:gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group shrink-0 py-1"
              aria-label={lang === 'ar' ? 'تسامي الصناعية — الصفحة الرئيسية' : 'TASAMI INDUSTRIAL — Home'}
            >
              <HeaderLogo priority />
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
                <button type="button" className={cn(lang === 'ar' && 'active')} onClick={() => setLang('ar')} aria-pressed={lang === 'ar'}>AR</button>
                <button type="button" className={cn(lang === 'en' && 'active')} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
              </div>
              <Button href="#contact" variant="dark" size="sm">
                {content.header.cta[lang]}
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden p-3 -me-1 rounded-xl text-text-main hover:bg-bg-alt active:scale-95 transition-all touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-text-main/40 backdrop-blur-[6px] lg:hidden"
              onClick={closeMenu}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={lang === 'ar' ? 'القائمة الرئيسية' : 'Main menu'}
              custom={isRtl}
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 bottom-0 z-[70] w-[min(100%,340px)] bg-white shadow-2xl lg:hidden flex flex-col"
              style={{ insetInlineEnd: 0 }}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border-main">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group min-w-0 py-1"
                >
                  <HeaderLogo priority />
                </a>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2.5 rounded-xl hover:bg-bg-alt active:scale-95 transition-all touch-manipulation"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={closeMenu}
                    className={navLinkClass(link.href, true)}
                    aria-current={activeId === link.href ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-3 w-full">
                      {activeId === link.href && (
                        <span className="w-1 h-6 rounded-full bg-primary shrink-0" />
                      )}
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="p-5 border-t border-border-main bg-bg-alt/50 space-y-4">
                <div className="lang-switch w-full justify-center">
                  <button type="button" className={cn('flex-1 py-2.5', lang === 'ar' && 'active')} onClick={() => setLang('ar')}>AR</button>
                  <button type="button" className={cn('flex-1 py-2.5', lang === 'en' && 'active')} onClick={() => setLang('en')}>EN</button>
                </div>
                <Button href="#contact" variant="primary" size="lg" className="w-full" onClick={closeMenu}>
                  {content.header.cta[lang]}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
