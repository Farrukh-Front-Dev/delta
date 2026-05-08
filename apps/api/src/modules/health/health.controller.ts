import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';

export const getHealth = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: {
      uptime: process.uptime(),
      timestamp: Date.now(),
      environment: process.env.NODE_ENV,
    },
  });
});
