"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { content } from '@/lib/content';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/site-config';

export function StickyMobileCta() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const whatsappUrl = getWhatsAppUrl(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن توريد الكلنكر' : 'Hello, I would like to inquire about clinker supply'
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-border-main shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="container flex items-center gap-2">
            <Button href="#contact" variant="primary" size="md" className="flex-1">
              {lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
            </Button>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#25D366] text-white shrink-0 hover:brightness-110 transition-all shadow-md"
                aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
