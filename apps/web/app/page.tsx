'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { fadeInUp } from '@/lib/animations/variants';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after brief intro
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Container size="md">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Dopamine
              </span>
            </h1>
            <p className="text-xl text-zinc-400">
              Discipline made emotionally satisfying
            </p>
          </div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-sm text-zinc-500"
          >
            Loading your dashboard...
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
