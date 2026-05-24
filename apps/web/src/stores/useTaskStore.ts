import { create } from 'zustand';
import { tasksApi, Task as ApiTask } from '@/lib/api/tasks.api';

// Use API Task type
export type Task = ApiTask;

interface TaskStore {
  tasks: Task[];
  lastCompletedXp: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API actions
  fetchTasks: () => Promise<void>;
  addTask: (title: string, xpValue?: number) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<{ xpGained: number; newXp: number; newLevel: number; leveledUp: boolean }>;
  updateTask: (id: string, data: { title?: string; xpValue?: number }) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  lastCompletedXp: 0,
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks, error: null }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error, isLoading: false }),

  // Fetch all tasks from API
  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      const tasks = await tasksApi.getTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch tasks';
      set({ error: message, isLoading: false });
    }
  },

  // Add new task
  addTask: async (title: string, xpValue = 25) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await tasksApi.createTask({ title, xpValue });
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create task';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Remove task
  removeTask: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await tasksApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete task';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Toggle task completion
  toggleTask: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await tasksApi.toggleTask(id);
      
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? result.task : t
        ),
        lastCompletedXp: result.xpGained,
        isLoading: false,
      }));

      return {
        xpGained: result.xpGained,
        newXp: result.newXp,
        newLevel: result.newLevel,
        leveledUp: result.leveledUp,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to toggle task';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Update task
  updateTask: async (id: string, data: { title?: string; xpValue?: number }) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await tasksApi.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update task';
      set({ error: message, isLoading: false });
      throw error;
    }
  },
}));
