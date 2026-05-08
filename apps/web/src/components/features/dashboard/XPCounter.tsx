'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface XPCounterProps {
  value: number;
  className?: string;
}

export const XPCounter = ({ value, className }: XPCounterProps) => {
  const spring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={className}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
};
