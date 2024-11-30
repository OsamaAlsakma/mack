import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';

declare global {
  namespace Express {
    interface Request {
      admin: {
        id: string;
        username: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = jwt.verify(token, config.jwtSecret) as any;
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true },
    });

    if (!admin) {
      throw new ApiError(401, 'Invalid token');
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid token'));
  }
};