'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { playSound } from '@/lib/audio/sounds';

interface CompletionCelebrationProps {
  show: boolean;
  xpGained: number;
}

export const CompletionCelebration = ({
  show,
  xpGained,
}: CompletionCelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Delay celebration slightly for better choreography
      setTimeout(() => {
        setIsVisible(true);
        playSound('xpGain');
      }, 150);

      const timer = setTimeout(() => setIsVisible(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
            y: -20,
            transition: { duration: 0.3, ease: 'easeIn' },
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
          }}
          className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Layered glow background */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />

          <div className="relative flex items-center gap-3 rounded-2xl border border-purple-500/50 bg-zinc-900/95 px-6 py-4 shadow-[0_0_40px_rgba(139,92,246,0.5)] backdrop-blur-sm">
            {/* Animated icon */}
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.3, 0.6, 1],
                ease: 'easeOut',
              }}
            >
              <Sparkles className="h-6 w-6 text-purple-400" />
            </motion.div>

            {/* Text content */}
            <div>
              <motion.p
                className="text-sm text-zinc-400"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Task Completed!
              </motion.p>
              <motion.p
                className="text-lg font-bold text-purple-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
              >
                +{xpGained} XP
              </motion.p>
            </div>
          </div>

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI) / 4) * 60,
                y: Math.sin((i * Math.PI) / 4) * 60,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
