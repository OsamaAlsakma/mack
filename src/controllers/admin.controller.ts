import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { ApiError } from '../utils/ApiError';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await comparePasswords(password, admin.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(admin);
  res.json({ token });
};

export const verifyToken = async (req: Request, res: Response) => {
  res.json({ valid: true });
};