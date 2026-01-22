import { useState, useCallback } from 'react';
import { authService, LoginCredentials } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: { username: string } | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
          user: response.user || { username: credentials.username },
        });
        return { success: true };
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Login failed',
        }));
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.logout();
      
      if (response.success) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
          user: null,
        });
        return { success: true };
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Logout failed',
        }));
        return { success: false, error: response.message || 'Logout failed' };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    clearError,
  };
};

