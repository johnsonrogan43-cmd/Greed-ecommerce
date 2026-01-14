import React, { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (token) {
        // persist token
        localStorage.setItem('token', token);
        // fetch current user from backend
        try {
          const res = await API.get('/auth/me');
          // backend returns { success, data: { user } }
          setUser(res.data.data.user);
        } catch (err) {
          // invalid token or failed to fetch - clear auth
          console.warn('Failed to fetch current user, clearing token');
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    // backend returns nested payload: response.data.data.{token,user}
    const payload = response.data.data || {};
    setToken(payload.token);
    setUser(payload.user);
    return response.data;
  };

  const login = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    const payload = response.data.data || {};
    setToken(payload.token);
    setUser(payload.user);
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