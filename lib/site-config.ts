import { content } from './content';

export const siteContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || content.contact.info.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || content.contact.info.phone,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || content.contact.info.whatsapp,
  address: content.contact.info,
};

export function formatPhoneTel(phone: string): string {
  return phone.replace(/\s/g, '');
}

export function getWhatsAppUrl(message?: string): string | null {
  const number = siteContact.whatsapp.replace(/\D/g, '');
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export const heroImage = {
  src: '/images/hero-quarry.jpg',
  alt: {
    ar: 'منجم وعمليات استخراج صناعية لتوريد الكلنكر',
    en: 'Quarry and industrial extraction operations for clinker supply',
  },
};
