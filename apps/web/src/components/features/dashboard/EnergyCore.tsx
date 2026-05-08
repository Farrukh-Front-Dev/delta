'use client';

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { playSound } from '@/lib/audio/sounds';

interface EnergyCoreProps {
  progress: number; // 0-100
  className?: string;
}

export const EnergyCore = ({ progress, className }: EnergyCoreProps) => {
  const springProgress = useSpring(0, {
    stiffness: 180,
    damping: 28,
    mass: 1.2,
  });

  const glowIntensity = useTransform(springProgress, [0, 100], [0.15, 1]);
  const glowSize = useTransform(springProgress, [0, 100], [0.7, 1.2]);
  const pulseOpacity = useMotionValue(0.3);

  useEffect(() => {
    const prevProgress = springProgress.get();
    springProgress.set(progress);

    // Play energy pulse sound on significant progress
    if (progress > prevProgress && progress - prevProgress >= 10) {
      playSound('energyPulse');
    }
  }, [progress, springProgress]);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  // Breathing animation for ambient feel
  useEffect(() => {
    const interval = setInterval(() => {
      pulseOpacity.set(pulseOpacity.get() === 0.3 ? 0.5 : 0.3);
    }, 2000);
    return () => clearInterval(interval);
  }, [pulseOpacity]);

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Layered glow effects */}
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-500/10 blur-3xl"
        style={{
          scale: useTransform(glowSize, (v) => v * 0.9),
          opacity: useTransform(glowIntensity, (v) => v * 0.4),
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-400/20 blur-2xl"
        style={{
          scale: glowSize,
          opacity: glowIntensity,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Outer ring glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: useTransform(
            glowIntensity,
            (v) => `0 0 ${40 * v}px rgba(139, 92, 246, ${0.3 * v})`
          ),
        }}
      />

      {/* SVG Progress Ring */}
      <svg width="280" height="280" className="relative z-10">
        {/* Background ring with subtle glow */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="rgba(63, 63, 70, 0.4)"
          strokeWidth="8"
        />

        {/* Progress ring with enhanced glow */}
        <motion.circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset,
            rotate: -90,
            transformOrigin: 'center',
            filter: useTransform(
              glowIntensity,
              (v) => `drop-shadow(0 0 ${8 * v}px rgba(139, 92, 246, ${0.8 * v}))`
            ),
          }}
        />

        {/* Gradient definition with enhanced colors */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-6xl font-bold"
          style={{
            scale: useTransform(springProgress, (v) => 1 + (v / 100) * 0.12),
          }}
        >
          <motion.span
            className="bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
            style={{
              opacity: useTransform(springProgress, [0, 100], [0.5, 1]),
              filter: useTransform(
                glowIntensity,
                (v) => `drop-shadow(0 0 ${12 * v}px rgba(139, 92, 246, ${0.4 * v}))`
              ),
            }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
        <motion.p
          className="mt-2 text-sm font-medium text-zinc-500"
          style={{
            opacity: useTransform(springProgress, [0, 100], [0.6, 1]),
          }}
        >
          Daily Energy
        </motion.p>
      </div>

      {/* Particle effect at high progress */}
      {progress >= 80 && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-purple-400"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI) / 3) * 140],
                y: [0, Math.sin((i * Math.PI) / 3) * 140],
                opacity: [0.6, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
