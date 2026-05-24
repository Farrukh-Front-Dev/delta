import { Router } from 'express';
import * as authController from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import {
  loginRateLimiter,
  signupRateLimiter,
} from '../../middlewares/rateLimiter.middleware';
import {
  signupSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from './auth.validation';

const router = Router();

// Public routes
router.post(
  '/signup',
  signupRateLimiter,
  validateRequest(signupSchema),
  authController.signup
);

router.post(
  '/login',
  loginRateLimiter,
  validateRequest(loginSchema),
  authController.login
);

router.post('/logout', authController.logout);

// Protected routes (require authentication)
router.get('/me', authMiddleware, authController.getMe);

router.get('/verification-status', authMiddleware, authController.getVerificationStatus);

router.put(
  '/profile',
  authMiddleware,
  validateRequest(updateProfileSchema),
  authController.updateProfile
);

router.put(
  '/password',
  authMiddleware,
  validateRequest(changePasswordSchema),
  authController.changePassword
);

export default router;
