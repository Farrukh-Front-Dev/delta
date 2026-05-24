import { apiClient } from './client';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  xpValue: number;
  createdAt: string;
  completedAt: string | null;
  userId: string;
}

export interface CreateTaskData {
  title: string;
  xpValue?: number;
}

export interface UpdateTaskData {
  title?: string;
  completed?: boolean;
  xpValue?: number;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}

export interface CompleteTaskResponse {
  task: Task;
  xpGained: number;
  newXp: number;
  newLevel: number;
  leveledUp: boolean;
}

export interface TaskStatsResponse {
  total: number;
  completed: number;
  pending: number;
  totalXpEarned: number;
}

/**
 * Task API client
 */
export const tasksApi = {
  /**
   * Get all tasks
   */
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<TaskListResponse>('/api/tasks');
    return response.data!.tasks;
  },

  /**
   * Get single task
   */
  async getTask(id: string): Promise<Task> {
    const response = await apiClient.get<{ task: Task }>(`/api/tasks/${id}`);
    return response.data!.task;
  },

  /**
   * Create task
   */
  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<{ task: Task }>('/api/tasks', data);
    return response.data!.task;
  },

  /**
   * Update task
   */
  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await apiClient.put<{ task: Task }>(`/api/tasks/${id}`, data);
    return response.data!.task;
  },

  /**
   * Delete task
   */
  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/api/tasks/${id}`);
  },

  /**
   * Toggle task completion
   */
  async toggleTask(id: string): Promise<CompleteTaskResponse> {
    const response = await apiClient.post<CompleteTaskResponse>(
      `/api/tasks/${id}/toggle`
    );
    return response.data!;
  },

  /**
   * Get task statistics
   */
  async getTaskStats(): Promise<TaskStatsResponse> {
    const response = await apiClient.get<TaskStatsResponse>('/api/tasks/stats');
    return response.data!;
  },
};
