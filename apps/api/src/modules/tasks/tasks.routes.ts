import { Router } from 'express';
import * as taskController from './tasks.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from './tasks.validation';

const router = Router();

// All task routes require authentication
router.use(authMiddleware);

// Get task statistics
router.get('/stats', taskController.getTaskStats);

// Get all tasks
router.get('/', taskController.getTasks);

// Get single task
router.get('/:id', taskController.getTask);

// Create task
router.post('/', validateRequest(createTaskSchema), taskController.createTask);

// Update task
router.put(
  '/:id',
  validateRequest(updateTaskSchema),
  taskController.updateTask
);

// Delete task
router.delete('/:id', taskController.deleteTask);

// Toggle task completion
router.patch('/:id/toggle', taskController.toggleTask);

export default router;
