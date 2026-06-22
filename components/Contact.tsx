"use client";

import { useLanguage } from './LanguageProvider';
import { content, Language } from '@/lib/content';
import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, Loader2, MessageCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Toast, type ToastData } from '@/components/ui/Toast';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { generatePdf } from '@/lib/pdf';
import { siteContact, getWhatsAppUrl } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';

function getContactSchema(lang: Language) {
  const isAr = lang === 'ar';
  return z.object({
    company: z.string().min(1, isAr ? 'يجب إدخال اسم الشركة' : 'Company name is required'),
    countryPort: z.string().min(1, isAr ? 'يجب إدخال الدولة والميناء' : 'Country & port is required'),
    quantity: z.string().min(1, isAr ? 'يجب إدخال الكمية المطلوبة' : 'Required quantity is required'),
    email: z.string().email(isAr ? 'البريد الإلكتروني غير صالح' : 'Please enter a valid email'),
    phone: z
      .string()
      .min(1, isAr ? 'يجب إدخال رقم الهاتف' : 'Phone number is required')
      .regex(/^[+\d\s()-]{7,20}$/, isAr ? 'رقم الهاتف غير صالح' : 'Please enter a valid phone number'),
    notes: z.string().optional(),
    website: z.string().optional(),
  });
}

type FormData = z.infer<ReturnType<typeof getContactSchema>>;

const STORAGE_KEY = 'tasami_last_rfq';

export function Contact() {
  const { lang } = useLanguage();
  const t = content.contact;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<(FormData & { referenceId?: string }) | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = getWhatsAppUrl(
    lang === 'ar' ? 'مرحباً، أود الاستفسار عن توريد الكلنكر' : 'Hello, I would like to inquire about clinker supply'
  );
  const contactPhone = siteContact.phone;
  const contactEmail = siteContact.email;
  const schema = getContactSchema(lang);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const showToast = useCallback((message: string, type: ToastData['type']) => {
    setToast({ id: Date.now().toString(), message, type });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const fieldErrors = err.errors as Record<string, string[]> | undefined;
        if (fieldErrors) {
          throw new Error(
            lang === 'ar'
              ? 'يرجى التحقق من الحقول المطلوبة.'
              : 'Please check the required fields.'
          );
        }
        if (response.status === 503) {
          throw new Error(
            lang === 'ar'
              ? 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.'
              : 'Service temporarily unavailable. Please try again later.'
          );
        }
        throw new Error(err.message || 'Submission failed');
      }

      const result = await response.json();
      const submission = { ...data, referenceId: result.id as string };
      setFormData(submission);
      setShowSuccessModal(true);
      reset();

      showToast(
        lang === 'ar' ? 'تم إرسال طلبكم بنجاح' : 'Your request was submitted successfully',
        'success'
      );

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...submission, submittedAt: new Date().toISOString() })
        );
      } catch {
        // localStorage unavailable
      }
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError';
      setSubmitError(
        isAbort
          ? lang === 'ar'
            ? 'انتهت مهلة الاتصال. يرجى التحقق من الشبكة والمحاولة مجدداً.'
            : 'Request timed out. Please check your connection and try again.'
          : lang === 'ar'
            ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.'
            : 'Something went wrong. Please try again.'
      );
    }
  };

  const generatePDF = async () => {
    if (!formData) return;
    setPdfLoading(true);
    try {
      await generatePdf('rfq', lang, formData);
      showToast(
        lang === 'ar' ? 'تم تحميل ملف PDF بنجاح' : 'PDF downloaded successfully',
        'success'
      );
    } catch {
      showToast(
        lang === 'ar' ? 'تعذر إنشاء ملف PDF' : 'Could not generate PDF',
        'error'
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handleReset = () => {
    setShowSuccessModal(false);
    setFormData(null);
    setSubmitError(null);
    reset();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const fieldClass = (hasError: boolean) => cn(hasError && 'field-error');

  const headingId = 'contact-heading';

  return (
    <section id="contact" className="section-padding bg-white" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeader id={headingId} title={t.title[lang]} align="center" />

        <div
          ref={formRef}
          className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 max-w-5xl mx-auto items-start"
        >
          <motion.div
            layout
            className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl border border-border-main shadow-sm overflow-hidden"
          >
            <form key={lang} onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
              <input
                type="text"
                {...register('website')}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                aria-hidden
              />
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {(
                  [
                    { id: 'company', label: t.fields.company[lang], field: 'company' as const, type: 'text', auto: 'organization' },
                    { id: 'countryPort', label: t.fields.countryPort[lang], field: 'countryPort' as const, type: 'text' },
                    { id: 'quantity', label: t.fields.quantity[lang], field: 'quantity' as const, type: 'text', placeholder: lang === 'ar' ? 'مثال: 5,000 طن' : 'e.g. 5,000 tons' },
                    { id: 'email', label: t.fields.email[lang], field: 'email' as const, type: 'email', auto: 'email', ltr: true },
                  ] as const
                ).map((f) => (
                  <motion.div
                    key={f.field}
                    className="form-field"
                    animate={errors[f.field] ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor={f.id}>
                      {f.label} <span className="text-primary" aria-hidden>*</span>
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      {...register(f.field)}
                      className={cn('ltr' in f && f.ltr && 'dir-ltr-field', fieldClass(!!errors[f.field]))}
                      autoComplete={'auto' in f ? f.auto : undefined}
                      placeholder={'placeholder' in f ? f.placeholder : undefined}
                      aria-invalid={!!errors[f.field]}
                      aria-describedby={errors[f.field] ? `${f.id}-error` : undefined}
                    />
                    <AnimatePresence>
                      {errors[f.field] && (
                        <motion.span
                          id={`${f.id}-error`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="field-hint"
                          role="alert"
                        >
                          {errors[f.field]?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                <motion.div
                  className="form-field sm:col-span-2"
                  animate={errors.phone ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label htmlFor="phone">
                    {t.fields.phone[lang]} <span className="text-primary" aria-hidden>*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={cn('dir-ltr-field', fieldClass(!!errors.phone))}
                    autoComplete="tel"
                    placeholder="+966 XX XXX XXXX"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.span
                        id="phone-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="field-hint"
                        role="alert"
                      >
                        {errors.phone.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="form-field mb-7">
                <label htmlFor="notes">{t.fields.notes[lang]}</label>
                <textarea id="notes" {...register('notes')} rows={4} className="resize-none" />
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start justify-between gap-3"
                    role="alert"
                  >
                    <span>{submitError}</span>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs uppercase shrink-0"
                    >
                      {lang === 'ar' ? 'إغلاق' : 'Dismiss'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                    <span>{lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}</span>
                  </>
                ) : (
                  t.submitBtn[lang]
                )}
              </Button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-5"
            aria-label={lang === 'ar' ? 'معلومات التواصل' : 'Contact information'}
          >
            <div className="bg-text-main text-white p-7 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 end-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -me-10 -mt-10 pointer-events-none" aria-hidden />
              <div className="relative z-10 mb-6 pb-6 border-b border-white/10 flex justify-center sm:justify-start">
                <Logo layout="stacked" variant="light" size="md" />
              </div>
              <ul className="flex flex-col gap-5 relative z-10 list-none p-0 m-0">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <div className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </div>
                    <a href={`mailto:${contactEmail}`} className="font-semibold text-sm hover:text-primary transition-colors break-all">
                      {contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <div className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">
                      {lang === 'ar' ? 'الهاتف' : 'Phone'}
                    </div>
                    <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="font-semibold text-sm dir-ltr-field hover:text-primary transition-colors">
                      {contactPhone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <div className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">
                      {lang === 'ar' ? 'العنوان' : 'Address'}
                    </div>
                    <address className="font-medium text-sm text-white/80 leading-relaxed not-italic">
                      {t.info.address[lang]}
                    </address>
                  </div>
                </li>
              </ul>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-6 inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] text-white font-bold text-sm hover:brightness-110 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              )}
            </div>

            <div className="bg-bg-alt p-6 rounded-xl border border-border-main text-center hover:border-primary/30 transition-colors">
              <p className="font-bold text-xs text-text-secondary mb-4 uppercase tracking-wider">
                {lang === 'ar' ? 'مسح لتحميل الملف الفني' : 'Scan for Technical Profile'}
              </p>
              <div
                className="inline-block bg-white p-3 border border-border-main rounded-xl shadow-sm"
                role="img"
                aria-label={lang === 'ar' ? 'رمز QR للملف الفني' : 'QR code for technical profile'}
              >
                <QRCodeSVG value="https://tasami-industrial.com/technical-profile.pdf" size={128} />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t.successMsg[lang]}
        description={
          lang === 'ar'
            ? 'لقد تم استلام طلبك بنجاح، سيقوم فريق المبيعات بالتواصل معك قريباً.'
            : 'Your request has been successfully received. Our sales team will contact you shortly.'
        }
        referenceId={formData?.referenceId}
        pdfLabel={t.btnSavePdf[lang]}
        resetLabel={lang === 'ar' ? 'إرسال طلب جديد' : 'Submit Another Request'}
        onDownloadPdf={generatePDF}
        onReset={handleReset}
        pdfLoading={pdfLoading}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </section>
  );
}
