/** Official TASAMI INDUSTRIAL brand assets (SVG recreations + optional PNG override). */
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
    /** Full stacked logo — drop official PNG here to override SVG */
    stackedColor: '/brand/tasami-logo-stacked-color.svg',
    stackedLight: '/brand/tasami-logo-stacked-light.svg',
    horizontalColor: '/brand/tasami-logo-horizontal-color.svg',
    horizontalLight: '/brand/tasami-logo-horizontal-light.svg',
    markColor: '/brand/tasami-mark-color.svg',
    markLight: '/brand/tasami-mark-light.svg',
    /** Official uploaded logo (JPEG/PNG) */
    pngOverride: '/brand/tasami-logo.jpeg',
  },
  dimensions: {
    horizontal: { width: 220, height: 52 },
    stacked: { width: 200, height: 140 },
    mark: { width: 48, height: 48 },
  },
} as const;

export type LogoLayout = 'lockup' | 'lockup-compact' | 'stacked' | 'mark';
export type LogoVariant = 'color' | 'light';
