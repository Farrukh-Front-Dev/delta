import { Request, Response } from 'express';
import { TaskService } from './tasks.service';
import { asyncHandler } from '../../utils/asyncHandler';

const taskService = new TaskService();

/**
 * GET /api/tasks
 * Get all tasks for current user
 */
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const result = await taskService.getTasks(userId);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

/**
 * GET /api/tasks/:id
 * Get a single task by ID
 */
export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const task = await taskService.getTaskById(id as string, userId);

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

/**
 * POST /api/tasks
 * Create a new task
 */
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const task = await taskService.createTask(userId, req.body);

  res.status(201).json({
    status: 'success',
    data: { task },
    message: 'Task created successfully',
  });
});

/**
 * PUT /api/tasks/:id
 * Update a task
 */
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const task = await taskService.updateTask(id as string, userId, req.body);

  res.status(200).json({
    status: 'success',
    data: { task },
    message: 'Task updated successfully',
  });
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  await taskService.deleteTask(id as string, userId);

  res.status(200).json({
    status: 'success',
    message: 'Task deleted successfully',
  });
});

/**
 * PATCH /api/tasks/:id/toggle
 * Toggle task completion and award XP
 */
export const toggleTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const result = await taskService.toggleTaskCompletion(id as string, userId);

  res.status(200).json({
    status: 'success',
    data: result,
    message: result.task.completed
      ? `Task completed! +${result.xpGained} XP`
      : 'Task marked as incomplete',
  });
});

/**
 * GET /api/tasks/stats
 * Get task statistics
 */
export const getTaskStats = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;

    const stats = await taskService.getTaskStats(userId);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  }
);
