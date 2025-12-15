import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './HomePage';
import MovieDetailPage from './components/pages/MovieDetailPage';
import SearchPage from './components/pages/SearchPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} /> 
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="*" element={<div className="text-center p-10">404 - Trang không tồn tại</div>} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}