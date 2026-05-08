'use client';

import { Flame, Zap, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { XPCounter } from './XPCounter';

interface StatsBarProps {
  xp: number;
  level: number;
  streak: number;
}

export const StatsBar = ({ xp, level, streak }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        icon={Zap}
        label="Total XP"
        value={<XPCounter value={xp} />}
        iconBgColor="bg-purple-500/10"
        iconColor="text-purple-400"
      />
      <StatCard
        icon={TrendingUp}
        label="Level"
        value={level}
        iconBgColor="bg-purple-500/10"
        iconColor="text-purple-400"
      />
      <StatCard
        icon={Flame}
        label="Streak"
        value={
          <>
            {streak}
            <span className="text-sm text-zinc-500"> days</span>
          </>
        }
        iconBgColor="bg-orange-500/10"
        iconColor="text-orange-400"
      />
    </div>
  );
};
