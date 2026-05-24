import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string | null;
  xp: number;
  level: number;
  streak: number;
  telegramVerified?: boolean;
  telegramUsername?: string | null;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  verificationLink: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setVerificationLink: (link: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as loading to check auth on mount
  error: null,
  verificationLink: null,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  setVerificationLink: (link) => set({ verificationLink: link }),

  clearError: () => set({ error: null }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      verificationLink: null,
    }),
}));
