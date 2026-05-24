import { prisma } from '../../lib/prisma';
import { hashPassword, comparePassword } from '../../utils/hash.util';
import { generateToken } from '../../utils/jwt.util';
import { sanitizeEmail, sanitizeString } from '../../utils/sanitize.util';
import { generateVerificationToken, getVerificationLink } from '../../lib/telegram';
import { AppError } from '../../middlewares/errorHandler';
import {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from './auth.types';

export class AuthService {
  /**
   * Register a new user
   */
  async signup(data: SignupRequest): Promise<AuthResponse & { verificationLink?: string }> {
    const { email, password, name } = data;

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedName = name ? sanitizeString(name) : null;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token (expires in 24 hours)
    const verificationToken = generateVerificationToken();
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        password: hashedPassword,
        name: sanitizedName,
        verificationToken,
        verificationExpiry,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Get Telegram verification link
    const verificationLink = getVerificationLink(verificationToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
      },
      token,
      verificationLink,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { email, password } = data;

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
      },
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: string): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        xp: true,
        level: true,
        streak: true,
        createdAt: true,
        telegramVerified: true,
        telegramUsername: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    data: UpdateProfileRequest
  ): Promise<UserProfile> {
    const { name } = data;

    // Sanitize name if provided
    const sanitizedName = name ? sanitizeString(name) : undefined;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: sanitizedName,
      },
      select: {
        id: true,
        email: true,
        name: true,
        xp: true,
        level: true,
        streak: true,
        createdAt: true,
      },
    });

    return user;
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    data: ChangePasswordRequest
  ): Promise<void> {
    const { currentPassword, newPassword } = data;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}
