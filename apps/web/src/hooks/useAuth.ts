import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { authApi, SignupData, LoginData } from '@/lib/api/auth.api';

/**
 * Auth hook for authentication operations
 */
export const useAuth = () => {
  const router = useRouter();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    verificationLink,
    setUser, 
    setLoading, 
    setError, 
    setVerificationLink,
    clearError, 
    logout: logoutStore 
  } = useAuthStore();

  /**
   * Check authentication status on mount
   */
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const user = await authApi.getMe();
      setUser(user);
    } catch (error) {
      // User is not authenticated
      setUser(null);
    }
  }, [setUser, setLoading]);

  /**
   * Signup new user
   */
  const signup = useCallback(
    async (data: SignupData) => {
      try {
        setLoading(true);
        clearError();
        const result = await authApi.signup(data);
        setUser(result.user);
        setVerificationLink(result.verificationLink || null);
        router.push('/dashboard');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Signup failed';
        setError(message);
        throw error;
      }
    },
    [setUser, setLoading, setError, setVerificationLink, clearError, router]
  );

  /**
   * Login user
   */
  const login = useCallback(
    async (data: LoginData) => {
      try {
        setLoading(true);
        clearError();
        const user = await authApi.login(data);
        setUser(user);
        router.push('/dashboard');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        setError(message);
        throw error;
      }
    },
    [setUser, setLoading, setError, clearError, router]
  );

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      logoutStore();
      router.push('/login');
    } catch (error) {
      // Even if API call fails, clear local state
      logoutStore();
      router.push('/login');
    }
  }, [logoutStore, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    verificationLink,
    signup,
    login,
    logout,
    checkAuth,
    clearError,
  };
};
