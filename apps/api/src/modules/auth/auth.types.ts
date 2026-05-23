export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    xp: number;
    level: number;
    streak: number;
  };
  token: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  xp: number;
  level: number;
  streak: number;
  createdAt: Date;
}

export interface UpdateProfileRequest {
  name?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
