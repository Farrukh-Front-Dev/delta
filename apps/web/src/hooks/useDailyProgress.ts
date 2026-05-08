import { useMemo } from 'react';
import { Task } from '@/types';

export const useDailyProgress = (tasks: Task[]) => {
  return useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const xpEarned = tasks
      .filter((t) => t.completed)
      .reduce((sum, t) => sum + t.xpValue, 0);
    const xpGoal = tasks.reduce((sum, t) => sum + t.xpValue, 0);

    return {
      totalTasks,
      completedTasks,
      percentage,
      xpEarned,
      xpGoal,
    };
  }, [tasks]);
};
