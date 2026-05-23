import { env } from './env';

export const authConfig = {
  jwt: {
    secret: env.jwt.secret,
    expiresIn: env.jwt.expiresIn as string,
    cookieName: 'auth_token',
    cookieOptions: {
      httpOnly: true, // Prevents XSS attacks
      secure: env.nodeEnv === 'production', // HTTPS only in production
      sameSite: 'strict' as const, // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/',
    },
  },
  bcrypt: {
    saltRounds: 10, // Industry standard
  },
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
  },
  rateLimiting: {
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxAttempts: 5,
    },
    signup: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxAttempts: 3,
    },
  },
} as const;
