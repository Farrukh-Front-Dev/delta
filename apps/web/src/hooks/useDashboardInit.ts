import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useTaskStore } from '@/stores/useTaskStore';
import { Task } from '@/types';
import { initAudio } from '@/lib/audio/sounds';

// Demo data
const DEMO_USER = {
  id: '1',
  email: 'demo@dopamine.app',
  xp: 0,
  level: 1,
  streak: 0,
};

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
  const user = useUserStore((state) => state.user);
  const tasks = useTaskStore((state) => state.tasks);

  // Initialize user
  useEffect(() => {
    if (!user) {
      useUserStore.getState().setUser(DEMO_USER);
    }
  }, [user]);

  // Initialize tasks
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
