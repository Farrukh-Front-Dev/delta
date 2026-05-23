import bcrypt from 'bcryptjs';
import { authConfig } from '../config/auth.config';

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, authConfig.bcrypt.saltRounds);
};

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns True if passwords match, false otherwise
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation result and error message
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  error?: string;
} => {
  const { minLength, requireUppercase, requireLowercase, requireNumber } =
    authConfig.password;

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number',
    };
  }

  return { isValid: true };
};
