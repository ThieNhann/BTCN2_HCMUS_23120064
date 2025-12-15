import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';

const HomePage = () => <div className="text-center text-xl p-10">NỘI DUNG PHIM</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} /> 

          <Route path="*" element={<div className="text-center p-10">404 - Trang không tồn tại</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}