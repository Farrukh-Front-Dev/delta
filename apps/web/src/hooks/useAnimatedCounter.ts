import { useEffect, useState } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export const useAnimatedCounter = (value: number, duration = 0.5) => {
  const spring = useSpring(value, { duration });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return display;
};
