import React, { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // You can fetch user data here if needed
    } else {
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, [token]);

  const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const login = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};