import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from './errorHandler';

/**
 * Middleware factory to validate request body against Zod schema
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse request body
      const validated = schema.parse(req.body);
      
      // Replace request body with validated data
      req.body = validated;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors into readable messages
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors,
        });
      }

      next(new AppError('Validation error', 400));
    }
  };
};
