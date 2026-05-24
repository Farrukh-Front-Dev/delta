export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface DailyProgress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
  xpEarned: number;
  xpGoal: number;
}
