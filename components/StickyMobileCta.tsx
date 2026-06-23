"use client";

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppUrl, formatPhoneTel, siteContact } from '@/lib/site-config';

export function StickyMobileCta() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const whatsappUrl = getWhatsAppUrl(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن توريد الكلنكر' : 'Hello, I would like to inquire about clinker supply'
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastScrollY.current;
    const delta = latest - prev;
    lastScrollY.current = latest;

    const contactEl = document.getElementById('contact');
    const contactTop = contactEl?.getBoundingClientRect().top ?? Infinity;
    const nearContact = contactTop < window.innerHeight * 0.85;
    const menuOpen = document.body.classList.contains('mobile-menu-open');

    const shouldShow = latest > 420 && !nearContact && !menuOpen;
    setVisible(shouldShow);

    if (Math.abs(delta) > 8) {
      setHiddenByScroll(delta > 0 && latest > 600);
    }
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('mobile-menu-open')) {
        setVisible(false);
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const showBar = visible && !hiddenByScroll;

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="container">
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/92 backdrop-blur-xl border border-border-main/80 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]">
              <a
                href={`tel:${formatPhoneTel(siteContact.phone)}`}
                className="inline-flex items-center justify-center w-[48px] h-[48px] rounded-xl bg-bg-alt border border-border-main text-text-main shrink-0 active:scale-95 hover:border-primary hover:text-primary transition-all touch-manipulation"
                aria-label={siteContact.phone}
              >
                <Phone className="w-5 h-5" />
              </a>
              <Button href="#contact" variant="primary" size="md" className="flex-1 min-h-[48px] text-[15px]">
                {lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
              </Button>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-[48px] h-[48px] rounded-xl bg-[#25D366] text-white shrink-0 active:scale-95 hover:brightness-110 transition-all shadow-md touch-manipulation"
                  aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
