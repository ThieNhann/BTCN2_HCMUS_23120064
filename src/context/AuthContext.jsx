import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithAuth, endpoints } from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Khởi tạo: kiểm tra LocalStorage khi f5 trang
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (username, password) => {
    try {
      const data = await fetchWithAuth(endpoints.login, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      // API trả về: { message, token, user: { ... } }
      if (data.token) {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: 'Không nhận được token' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register
  const register = async (formData) => {
    try {
      // API Register yêu cầu: username, email, password, phone, dob
      await fetchWithAuth(endpoints.register, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Gọi API logout
      await fetchWithAuth(endpoints.logout, { method: 'POST' });
    } catch (error) {
      console.error("Logout API error", error);
    } finally {
      // Dù API lỗi hay không, Client vẫn phải xóa data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);