import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt.util';
import { authConfig } from '../config/auth.config';
import { AppError } from './errorHandler';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to verify JWT token and attach user to request
 * Checks for token in cookies
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from cookie
    const token = req.cookies?.[authConfig.jwt.cookieName];

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      throw new AppError('Invalid or expired token', 401);
    }

    // Attach user to request
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Authentication failed', 401));
    }
  }
};

/**
 * Optional auth middleware - doesn't throw error if no token
 * Useful for routes that work with or without authentication
 */
export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.[authConfig.jwt.cookieName];

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        req.user = payload;
      }
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};
