import { useEffect } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { Task } from '@/types';
import { initAudio } from '@/lib/audio/sounds';

// Demo tasks for new users
const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete morning workout',
    completed: false,
    createdAt: new Date().toISOString(),
    xpValue: 50,
  },
  {
    id: '2',
    title: 'Review project documentation',
    completed: false,
    createdAt: new Date().toISOString(),
    xpValue: 30,
  },
  {
    id: '3',
    title: "Plan tomorrow's tasks",
    completed: false,
    createdAt: new Date().toISOString(),
    xpValue: 20,
  },
];

/**
 * Initialize dashboard with demo data and audio system
 * Extracted from dashboard page for better separation of concerns
 */
export const useDashboardInit = () => {
  const tasks = useTaskStore((state) => state.tasks);

  // Initialize tasks (only if empty - for demo purposes)
  useEffect(() => {
    if (tasks.length === 0) {
      useTaskStore.getState().setTasks(DEMO_TASKS);
    }
  }, [tasks.length]);

  // Initialize audio
  useEffect(() => {
    initAudio();
  }, []);
};
