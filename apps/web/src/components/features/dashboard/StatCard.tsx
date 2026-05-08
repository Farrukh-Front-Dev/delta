'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export const StatCard = memo(({
  icon: Icon,
  label,
  value,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
      whileHover={{ scale: 1.02 }}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <div className="text-xl font-bold text-white">{value}</div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';
