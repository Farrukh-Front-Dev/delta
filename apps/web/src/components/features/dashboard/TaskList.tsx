'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/stores/useTaskStore';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
}

export const TaskList = memo(({ tasks, onTaskComplete }: TaskListProps) => {
  // Memoize filtered arrays to prevent recalculation on every render
  const { activeTasks, completedTasks } = useMemo(() => {
    const active: Task[] = [];
    const completed: Task[] = [];
    
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.completed) {
        completed.push(task);
      } else {
        active.push(task);
      }
    }
    
    return { activeTasks: active, completedTasks: completed };
  }, [tasks]);

  const hasActiveTasks = activeTasks.length > 0;
  const hasCompletedTasks = completedTasks.length > 0;
  const hasTasks = tasks.length > 0;

  return (
    <div className="space-y-6">
      {/* Active Tasks */}
      {hasActiveTasks && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-400">
            Active Tasks ({activeTasks.length})
          </h3>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={onTaskComplete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {hasCompletedTasks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-medium text-zinc-600">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={onTaskComplete}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {!hasTasks && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 py-16 text-center"
        >
          <p className="text-zinc-500">No tasks yet</p>
          <p className="mt-1 text-sm text-zinc-600">
            Add your first task to get started
          </p>
        </motion.div>
      )}
    </div>
  );
});

TaskList.displayName = 'TaskList';
