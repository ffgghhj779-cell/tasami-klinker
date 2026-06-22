"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, FileDown, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { scaleIn } from '@/lib/motion';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  referenceId?: string;
  pdfLabel: string;
  resetLabel: string;
  onDownloadPdf: () => void;
  onReset: () => void;
  pdfLoading?: boolean;
}

export function SuccessModal({
  open,
  onClose,
  title,
  description,
  referenceId,
  pdfLabel,
  resetLabel,
  onDownloadPdf,
  onReset,
  pdfLoading = false,
}: SuccessModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-text-main/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-desc"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border-main overflow-hidden"
          >
            <div className="h-1.5 bg-primary" aria-hidden />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 end-4 p-2 rounded-lg text-text-secondary hover:bg-bg-alt hover:text-text-main transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-8 pt-10 pb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 20, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-5 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="w-8 h-8" strokeWidth={2.5} aria-hidden />
              </motion.div>

              <h2 id="success-modal-title" className="text-xl font-bold text-text-main mb-2">
                {title}
              </h2>

              {referenceId && (
                <p className="text-xs font-mono text-primary font-bold mb-3 tracking-wide">
                  {referenceId}
                </p>
              )}

              <p id="success-modal-desc" className="text-sm text-text-secondary leading-relaxed mb-7">
                {description}
              </p>

              <div className="flex flex-col gap-3">
                <Button variant="dark" size="md" className="w-full" onClick={onDownloadPdf} disabled={pdfLoading}>
                  {pdfLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileDown className="w-5 h-5" />
                  )}
                  {pdfLabel}
                </Button>
                <Button variant="outline" size="md" className="w-full" onClick={onReset}>
                  {resetLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
