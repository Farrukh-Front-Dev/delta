import { prisma } from '../../lib/prisma';
import { sanitizeString } from '../../utils/sanitize.util';
import { AppError } from '../../middlewares/errorHandler';
import {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TaskListResponse,
  CompleteTaskResponse,
} from './tasks.types';

export class TaskService {
  /**
   * Calculate level from XP
   */
  private calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
  }

  /**
   * Get all tasks for a user
   */
  async getTasks(userId: string): Promise<TaskListResponse> {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: [
        { completed: 'asc' }, // Incomplete tasks first
        { createdAt: 'desc' }, // Newest first
      ],
    });

    return {
      tasks,
      total: tasks.length,
    };
  }

  /**
   * Get a single task by ID
   */
  async getTaskById(taskId: string, userId: string): Promise<TaskResponse> {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId, // Ensure user owns the task
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }

  /**
   * Create a new task
   */
  async createTask(
    userId: string,
    data: CreateTaskRequest
  ): Promise<TaskResponse> {
    const { title, xpValue = 25 } = data;

    // Sanitize title
    const sanitizedTitle = sanitizeString(title);

    const task = await prisma.task.create({
      data: {
        title: sanitizedTitle,
        xpValue,
        userId,
      },
    });

    return task;
  }

  /**
   * Update a task
   */
  async updateTask(
    taskId: string,
    userId: string,
    data: UpdateTaskRequest
  ): Promise<TaskResponse> {
    // Check if task exists and belongs to user
    await this.getTaskById(taskId, userId);

    const updateData: any = {};

    if (data.title !== undefined) {
      updateData.title = sanitizeString(data.title);
    }

    if (data.completed !== undefined) {
      updateData.completed = data.completed;
      updateData.completedAt = data.completed ? new Date() : null;
    }

    if (data.xpValue !== undefined) {
      updateData.xpValue = data.xpValue;
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return task;
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string, userId: string): Promise<void> {
    // Check if task exists and belongs to user
    await this.getTaskById(taskId, userId);

    await prisma.task.delete({
      where: { id: taskId },
    });
  }

  /**
   * Toggle task completion and award XP
   */
  async toggleTaskCompletion(
    taskId: string,
    userId: string
  ): Promise<CompleteTaskResponse> {
    // Get task
    const task = await this.getTaskById(taskId, userId);

    // Toggle completion
    const newCompletedState = !task.completed;
    const xpChange = newCompletedState ? task.xpValue : -task.xpValue;

    // Update task and user in a transaction
    const [updatedTask, updatedUser] = await prisma.$transaction([
      // Update task
      prisma.task.update({
        where: { id: taskId },
        data: {
          completed: newCompletedState,
          completedAt: newCompletedState ? new Date() : null,
        },
      }),
      // Update user XP
      prisma.user.update({
        where: { id: userId },
        data: {
          xp: {
            increment: xpChange,
          },
        },
      }),
    ]);

    // Calculate new level
    const oldLevel = this.calculateLevel(updatedUser.xp - xpChange);
    const newLevel = this.calculateLevel(updatedUser.xp);
    const leveledUp = newLevel > oldLevel && newCompletedState;

    // Update level if changed
    if (leveledUp) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel },
      });
    }

    return {
      task: updatedTask,
      xpGained: newCompletedState ? task.xpValue : 0,
      newXp: updatedUser.xp,
      newLevel,
      leveledUp,
    };
  }

  /**
   * Get task statistics for user
   */
  async getTaskStats(userId: string) {
    const [total, completed, totalXpEarned] = await Promise.all([
      prisma.task.count({
        where: { userId },
      }),
      prisma.task.count({
        where: { userId, completed: true },
      }),
      prisma.task.aggregate({
        where: { userId, completed: true },
        _sum: { xpValue: true },
      }),
    ]);

    return {
      total,
      completed,
      pending: total - completed,
      totalXpEarned: totalXpEarned._sum.xpValue || 0,
    };
  }
}
