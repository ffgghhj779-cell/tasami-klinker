/** Official TASAMI INDUSTRIAL brand assets — always prefer the uploaded logo file. */
export const brand = {
  slogan: {
    ar: 'مواد · لوجستيات · حلول',
    en: 'Materials · Logistics · Solutions',
  },
  name: {
    en: 'TASAMI INDUSTRIAL',
    ar: 'تسامي الصناعية',
  },
  assets: {
    /** Official uploaded logo — single source of truth */
    official: '/brand/tasami-logo.jpeg',
    markColor: '/brand/tasami-mark-color.svg',
    markLight: '/brand/tasami-mark-light.svg',
  },
  /** Intrinsic dimensions of tasami-logo.jpeg */
  officialDimensions: { width: 480, height: 640 },
} as const;

export type LogoLayout = 'official-header' | 'official-full' | 'official-light' | 'mark';
export type LogoVariant = 'color' | 'light';
