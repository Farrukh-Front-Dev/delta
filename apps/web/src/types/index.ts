export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  xpValue: number;
}

export interface User {
  id: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
}

export interface DailyProgress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
  xpEarned: number;
  xpGoal: number;
}
