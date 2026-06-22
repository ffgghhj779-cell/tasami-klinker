import type { Transition, Variants } from 'motion/react';

/** Subtle easing — professional, not flashy */
export const easeOut: Transition['ease'] = [0.25, 0.1, 0.25, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
};

export const cardHover = {
  y: -4,
  transition: { duration: 0.2, ease: easeOut },
};

export const buttonTap = { scale: 0.98 };
export const buttonHover = { scale: 1.02, y: -1 };

export const viewportOnce = {
  once: true,
  margin: '-60px' as const,
};
