import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './HomePage';
import MovieDetailPage from './components/pages/MovieDetailPage';
import SearchPage from './components/pages/SearchPage';
import PersonDetailPage from './components/pages/PersonDetailPage';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './layouts/Navigation';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} /> 
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/person/:id" element={<PersonDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<div className="text-center p-10">404 - Trang không tồn tại</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>

  );
}