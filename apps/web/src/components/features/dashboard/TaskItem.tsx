'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Task } from '@/stores/useTaskStore';
import { cn } from '@/lib/utils/cn';
import { playSound } from '@/lib/audio/sounds';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

// Memoize to prevent re-renders when other tasks change
export const TaskItem = memo(({ task, onComplete }: TaskItemProps) => {
  // Stable callback reference
  const handleComplete = useCallback(() => {
    if (!task.completed) {
      playSound('taskComplete');
      onComplete(task.id);
    }
  }, [task.completed, task.id, onComplete]);

  // Pre-compute class names
  const containerClassName = cn(
    'group relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-200',
    task.completed
      ? 'border-zinc-800 bg-zinc-900/50'
      : 'border-zinc-800 bg-zinc-900 hover:border-purple-500/50 hover:bg-zinc-900/80 hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]'
  );

  const checkboxClassName = cn(
    'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200',
    task.completed
      ? 'border-purple-500 bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]'
      : 'border-zinc-700 bg-zinc-800 hover:border-purple-400 hover:bg-zinc-700 hover:shadow-[0_0_8px_rgba(139,92,246,0.3)]'
  );

  const textClassName = cn(
    'text-base transition-all duration-300',
    task.completed
      ? 'text-zinc-600 line-through'
      : 'text-white group-hover:text-purple-50'
  );

  const badgeClassName = cn(
    'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
    task.completed
      ? 'bg-zinc-800 text-zinc-600'
      : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/15 group-hover:text-purple-300'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={containerClassName}
    >
      {/* Ambient glow on hover */}
      {!task.completed && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl bg-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />
      )}

      {/* Checkbox */}
      <motion.button
        onClick={handleComplete}
        disabled={task.completed}
        className={checkboxClassName}
        whileHover={!task.completed ? { scale: 1.15 } : undefined}
        whileTap={
          !task.completed
            ? {
                scale: 0.9,
                transition: { duration: 0.1, ease: 'easeOut' },
              }
            : undefined
        }
      >
        {task.completed && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 20,
              duration: 0.4,
            }}
          >
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.button>

      {/* Task content */}
      <div className="flex-1">
        <motion.p
          className={textClassName}
          animate={{
            opacity: task.completed ? 0.4 : 1,
          }}
        >
          {task.title}
        </motion.p>
      </div>

      {/* XP Badge */}
      <motion.div
        className={badgeClassName}
        animate={{
          scale: task.completed ? 0.85 : 1,
        }}
      >
        +{task.xpValue} XP
      </motion.div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if task actually changed
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.completed === nextProps.task.completed &&
    prevProps.task.title === nextProps.task.title &&
    prevProps.task.xpValue === nextProps.task.xpValue
  );
});

TaskItem.displayName = 'TaskItem';
