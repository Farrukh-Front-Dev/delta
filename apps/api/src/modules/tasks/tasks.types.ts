export interface CreateTaskRequest {
  title: string;
  xpValue?: number;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
  xpValue?: number;
}

export interface TaskResponse {
  id: string;
  title: string;
  completed: boolean;
  xpValue: number;
  createdAt: Date;
  completedAt: Date | null;
  userId: string;
}

export interface TaskListResponse {
  tasks: TaskResponse[];
  total: number;
}

export interface CompleteTaskResponse {
  task: TaskResponse;
  xpGained: number;
  newXp: number;
  newLevel: number;
  leveledUp: boolean;
}
