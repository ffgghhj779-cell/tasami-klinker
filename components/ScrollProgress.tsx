"use client";

import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-0.5 bg-primary origin-left z-[60] pointer-events-none"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
