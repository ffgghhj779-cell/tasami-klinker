import type { Metadata } from 'next';
import { content } from './content';

export const siteConfig = {
  name: 'TASAMI INDUSTRIAL',
  nameAr: 'تسامي الصناعية',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tasami-industrial.com',
  email: 'info@tasami-industrial.com',
  locale: 'ar_SA',
  alternateLocale: 'en_US',
};

export const seoContent = {
  title: 'تسامي الصناعية | TASAMI INDUSTRIAL — Saudi Clinker Supply',
  description:
    'توريد كلنكر سعودي عالي الجودة – مطابق للمعايير العالمية، توثيق كامل، وجداول تسليم دقيقة. Premium Saudi clinker supply with full documentation and reliable delivery.',
  keywords: [
    'Saudi clinker',
    'كلنكر سعودي',
    'cement clinker supply',
    'B2B industrial materials',
    'TASAMI INDUSTRIAL',
    'تسامي الصناعية',
    'SGS certified clinker',
    'ASTM C150',
    'EN 197-1',
    'Middle East cement import',
  ],
};

export function getSiteMetadata(): Metadata {
  const { title, description, keywords } = seoContent;
  const ogImage = `${siteConfig.url}/opengraph-image`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: '/',
      languages: {
        ar: '/',
        en: '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      url: siteConfig.url,
      siteName: `${siteConfig.nameAr} | ${siteConfig.name}`,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${content.hero.subtitle.en}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'business',
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.nameAr,
    url: siteConfig.url,
    logo: `${siteConfig.url}/opengraph-image`,
    description: seoContent.description,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    areaServed: ['SY', 'LB', 'JO', 'YE', 'LY', 'TN', 'SD'],
    knowsAbout: ['Saudi clinker supply', 'Industrial logistics', 'Cement raw materials'],
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.nameAr,
    url: siteConfig.url,
    description: seoContent.description,
    inLanguage: ['ar', 'en'],
  };
}
