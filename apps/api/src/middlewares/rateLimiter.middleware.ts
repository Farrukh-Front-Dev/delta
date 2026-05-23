import rateLimit from 'express-rate-limit';
import { authConfig } from '../config/auth.config';

/**
 * Rate limiter for login endpoint
 * Prevents brute force attacks
 */
export const loginRateLimiter = rateLimit({
  windowMs: authConfig.rateLimiting.login.windowMs,
  max: authConfig.rateLimiting.login.maxAttempts,
  message: {
    status: 'error',
    message: 'Too many login attempts. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  // Use IP address for rate limiting
  keyGenerator: (req) => {
    return req.ip || 'unknown';
  },
});

/**
 * Rate limiter for signup endpoint
 * Prevents spam account creation
 */
export const signupRateLimiter = rateLimit({
  windowMs: authConfig.rateLimiting.signup.windowMs,
  max: authConfig.rateLimiting.signup.maxAttempts,
  message: {
    status: 'error',
    message: 'Too many signup attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || 'unknown';
  },
});

/**
 * General API rate limiter
 * Prevents API abuse
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || 'unknown';
  },
});
