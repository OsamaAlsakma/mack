import jwt from 'jsonwebtoken';
import { config } from '../config';

interface AdminPayload {
  id: string;
  username: string;
}

export const generateToken = (admin: AdminPayload): string => {
  return jwt.sign(
    {
      id: admin.id,
      username: admin.username,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn,
    }
  );
};