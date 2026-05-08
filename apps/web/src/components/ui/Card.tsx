'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, children }, ref) => {
    const baseStyles =
      'rounded-xl bg-zinc-900 border border-zinc-800 p-6 transition-all';

    const glowStyles = glow
      ? 'shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'
      : '';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(baseStyles, glowStyles, className)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
