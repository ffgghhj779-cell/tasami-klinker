import { content } from './content';

/** Public contact details — override via env in production */
export const siteContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || content.contact.info.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || content.contact.info.phone,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  address: content.contact.info,
};

export function getWhatsAppUrl(message?: string): string | null {
  const number = siteContact.whatsapp.replace(/\D/g, '');
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export const heroImage = {
  src: 'https://images.unsplash.com/photo-1581094277771-cbb32757aa69?w=1920&q=80',
  alt: {
    ar: 'منشأة صناعية وموانئ شحن',
    en: 'Industrial facility and shipping logistics',
  },
};
