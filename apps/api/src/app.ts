import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import healthRoutes from './modules/health/health.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);

// Error handling
app.use(errorHandler);

export default app;
