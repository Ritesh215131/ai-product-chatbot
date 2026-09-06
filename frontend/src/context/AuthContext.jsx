import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { DEMO_CREDENTIALS } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('productai_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile if token is present
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authApi.getProfile();
        setUser(data.user);
      } catch (err) {
        console.warn('Failed to load profile:', err.message);
        localStorage.removeItem('productai_token');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    localStorage.setItem('productai_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await authApi.register({ name, email, password });
    localStorage.setItem('productai_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const demoLogin = async (type = 'user') => {
    const creds = DEMO_CREDENTIALS[type] || DEMO_CREDENTIALS.user;
    return await login(creds.email, creds.password);
  };

  const logout = () => {
    localStorage.removeItem('productai_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const updatePreferences = async (preferences) => {
    const res = await authApi.updateProfile({ preferences });
    setUser(res.user);
    return res.user;
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user),
    isAdmin: false,
    login,
    register,
    demoLogin,
    logout,
    updateUser,
    updatePreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
