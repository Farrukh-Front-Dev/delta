import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { apiRateLimiter } from './middlewares/rateLimiter.middleware';
import healthRoutes from './modules/health/health.routes';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/tasks/tasks.routes';

const app = express();

// Middlewares
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting for all API routes
app.use('/api', apiRateLimiter);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

export default app;
