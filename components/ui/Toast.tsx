"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ toast, onDismiss, duration = 4500 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss, duration]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:end-6 z-[100] sm:max-w-sm"
        >
          <div
            className={cn(
              'flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md',
              toast.type === 'success' && 'bg-white border-green-200',
              toast.type === 'error' && 'bg-white border-red-200',
              toast.type === 'info' && 'bg-white border-border-main'
            )}
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden />
            )}
            <p className="flex-1 text-sm font-semibold text-text-main leading-snug">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 rounded-md text-text-secondary hover:text-text-main hover:bg-bg-alt transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
