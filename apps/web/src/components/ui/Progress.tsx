'use client';

import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showGlow?: boolean;
}

export const Progress = ({
  value,
  max = 100,
  showGlow = true,
  className,
  ...props
}: ProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-full bg-zinc-800',
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'h-full rounded-full bg-linear-to-r from-purple-500 to-purple-600',
          showGlow && 'shadow-[0_0_10px_rgba(139,92,246,0.5)]'
        )}
      />
    </div>
  );
};
