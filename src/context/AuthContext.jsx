import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth.api';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  STORAGE_KEYS,
} from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!admin && !!getAccessToken();

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await authApi.getMe();
        setAdmin(data.data);
        localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(data.data));
      } catch {
        clearTokens();
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await authApi.login(credentials);
    const { admin: adminData, accessToken, refreshToken } = data.data;
    setTokens(accessToken, refreshToken);
    setAdmin(adminData);
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminData));
    return adminData;
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = getRefreshToken();
      await authApi.logout(refreshToken);
    } catch {
      // Still clear tokens even if logout call fails
    } finally {
      clearTokens();
      setAdmin(null);
    }
  }, []);

  const updateAdmin = useCallback((updatedData) => {
    setAdmin((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(merged));
      return merged;
    });
  }, []);

  const value = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
