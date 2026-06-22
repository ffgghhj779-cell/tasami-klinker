"use client";

import { useState } from 'react';
import { Download, Check, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { generatePdf, PdfDocumentType } from '@/lib/pdf';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type DownloadState = 'idle' | 'loading' | 'success' | 'error';

interface DownloadButtonProps {
  pdfType: PdfDocumentType;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function DownloadButton({
  pdfType,
  variant = 'dark',
  size = 'lg',
  className,
  children,
}: DownloadButtonProps) {
  const { lang } = useLanguage();
  const [state, setState] = useState<DownloadState>('idle');

  const handleDownload = async () => {
    if (state === 'loading') return;
    setState('loading');
    try {
      await generatePdf(pdfType, lang);
      setState('success');
      setTimeout(() => setState('idle'), 2200);
    } catch (err) {
      console.error(err);
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  const stateIcon =
    state === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> :
    state === 'success' ? <Check className="w-5 h-5" /> :
    state === 'error' ? <AlertCircle className="w-5 h-5" /> :
    <Download className="w-5 h-5" />;

  const stateLabel: Record<DownloadState, string | null> = {
    idle: null,
    loading: lang === 'ar' ? 'جاري التحميل...' : 'Downloading...',
    success: lang === 'ar' ? 'تم التحميل' : 'Downloaded',
    error: lang === 'ar' ? 'فشل التحميل' : 'Download failed',
  };

  return (
    <Button
      variant={state === 'success' ? 'primary' : state === 'error' ? 'outline' : variant}
      size={size}
      className={cn(
        state === 'success' && '!bg-green-600 hover:!bg-green-600',
        state === 'error' && '!border-red-400 !text-red-600',
        className
      )}
      onClick={handleDownload}
      disabled={state === 'loading'}
      aria-live="polite"
    >
      {stateIcon}
      {stateLabel[state] ?? children}
    </Button>
  );
}
