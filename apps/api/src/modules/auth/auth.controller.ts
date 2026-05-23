import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { authConfig } from '../../config/auth.config';
import { asyncHandler } from '../../utils/asyncHandler';

const authService = new AuthService();

/**
 * POST /api/auth/signup
 * Register a new user
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.signup(req.body);

  // Set JWT token in httpOnly cookie
  res.cookie(authConfig.jwt.cookieName, result.token, authConfig.jwt.cookieOptions);

  res.status(201).json({
    status: 'success',
    data: {
      user: result.user,
    },
    message: 'Account created successfully',
  });
});

/**
 * POST /api/auth/login
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  // Set JWT token in httpOnly cookie
  res.cookie(authConfig.jwt.cookieName, result.token, authConfig.jwt.cookieOptions);

  res.status(200).json({
    status: 'success',
    data: {
      user: result.user,
    },
    message: 'Login successful',
  });
});

/**
 * POST /api/auth/logout
 * Logout user
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  // Clear auth cookie
  res.clearCookie(authConfig.jwt.cookieName, {
    httpOnly: true,
    secure: authConfig.jwt.cookieOptions.secure,
    sameSite: authConfig.jwt.cookieOptions.sameSite,
    path: '/',
  });

  res.status(200).json({
    status: 'success',
    message: 'Logout successful',
  });
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  // User is attached to request by auth middleware
  const userId = req.user!.userId;

  const user = await authService.getProfile(userId);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

/**
 * PUT /api/auth/profile
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const user = await authService.updateProfile(userId, req.body);

  res.status(200).json({
    status: 'success',
    data: { user },
    message: 'Profile updated successfully',
  });
});

/**
 * PUT /api/auth/password
 * Change user password
 */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  await authService.changePassword(userId, req.body);

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully',
  });
});
