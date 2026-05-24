import { apiClient } from './client';
import { User } from '@/stores/useAuthStore';

export interface SignupData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface AuthResponse {
  user: User;
  verificationLink?: string;
  telegramVerified?: boolean;
}

interface VerificationStatusResponse {
  telegramVerified: boolean;
  telegramUsername: string | null;
}

/**
 * Auth API client
 */
export const authApi = {
  /**
   * Register a new user
   */
  async signup(data: SignupData): Promise<{ user: User; verificationLink?: string }> {
    const response = await apiClient.post<AuthResponse>('/api/auth/signup', data);
    return {
      user: response.data!.user,
      verificationLink: response.data!.verificationLink,
    };
  },

  /**
   * Login user
   */
  async login(data: LoginData): Promise<User> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    return response.data!.user;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
  },

  /**
   * Get current user
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<AuthResponse>('/api/auth/me');
    return response.data!.user;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.put<AuthResponse>('/api/auth/profile', data);
    return response.data!.user;
  },

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiClient.put('/api/auth/password', data);
  },

  /**
   * Check verification status
   */
  async getVerificationStatus(): Promise<VerificationStatusResponse> {
    const response = await apiClient.get<VerificationStatusResponse>('/api/auth/verification-status');
    return response.data!;
  },
};
