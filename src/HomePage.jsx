// src/HomePage.jsx
import React from 'react';
import { Banner } from '@/components/Banner'; // Hoặc đường dẫn tương ứng

const HomePage = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Phần 1: Banner Slider (5 phim hot nhất) */}
      <section className="w-full">
        <Banner />
      </section>

      {/* Phần 2 & 3: Sẽ làm carousel ở đây sau */}
      <div className="container mx-auto px-4 mt-10 space-y-10">
        <div className="h-40 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500">
          Chỗ này để Carousel Popular (20 phim)
        </div>
        <div className="h-40 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500">
          Chỗ này để Carousel Top Rated (20 phim)
        </div>
      </div>
    </div>
  );
};

export default HomePage;