import { z } from 'zod';

/**
 * Create task validation schema
 */
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  xpValue: z.number().int().min(1).max(1000).optional().default(25),
});

/**
 * Update task validation schema
 */
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  completed: z.boolean().optional(),
  xpValue: z.number().int().min(1).max(1000).optional(),
});

/**
 * Task ID param validation
 */
export const taskIdSchema = z.object({
  id: z.string().uuid('Invalid task ID'),
});
