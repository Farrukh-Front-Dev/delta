import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

export interface JwtPayload {
  userId: string;
  email: string;
}

/**
 * Generate a JWT token
 * @param payload - User data to encode in token
 * @returns Signed JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, authConfig.jwt.secret, {
    expiresIn: '7d', // 7 days
  });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
};

/**
 * Decode a JWT token without verification (for debugging only)
 * @param token - JWT token to decode
 * @returns Decoded payload or null
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};
