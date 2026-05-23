import { z } from 'zod';
import { authConfig } from '../../config/auth.config';

/**
 * Password validation schema
 * Enforces minimum length and character requirements
 */
const passwordSchema = z
  .string()
  .min(
    authConfig.password.minLength,
    `Password must be at least ${authConfig.password.minLength} characters`
  )
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number');

/**
 * Email validation schema
 */
const emailSchema = z.string().email('Invalid email address').toLowerCase();

/**
 * Signup request validation schema
 */
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1).max(100).optional(),
});

/**
 * Login request validation schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

/**
 * Update profile validation schema
 */
export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

/**
 * Change password validation schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});
