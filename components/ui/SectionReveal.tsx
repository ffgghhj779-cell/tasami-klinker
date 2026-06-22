"use client";

import { motion, type HTMLMotionProps } from 'motion/react';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export function SectionReveal({ children, className, delay = 0, ...props }: SectionRevealProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
