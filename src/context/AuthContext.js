'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, setToken, removeToken } from '@/lib/api';
import { parseJWT, isTokenExpired } from '@/lib/utils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && !isTokenExpired(token) && savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Clear expired/invalid data
          removeToken();
          localStorage.removeItem('user');
        }
      } catch (e) {
        console.error('Auth initialization error:', e);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response;

      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (err) {
      const message = err.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response;

      setToken(token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Role-based checks
  const isAuthenticated = !!user;
  const isUser = user?.role === 'USER';
  const isMaster = user?.role === 'MASTER';
  const isAdmin = user?.role === 'ADMIN';

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isUser,
    isMaster,
    isAdmin,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
