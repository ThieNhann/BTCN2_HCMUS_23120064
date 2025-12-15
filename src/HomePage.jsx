import React from 'react';
import { Banner } from '@/components/Banner';
import { MovieCarousel } from '@/components/MovieCarousel';
import { endpoints } from '@/lib/api';

const HomePage = () => {
  return (
    <div className="min-h-screen pb-20">
      <section className="w-full">
        <Banner />
      </section>

      <div className="container mx-auto px-4 mt-10 space-y-8">
        <Carousal
          title="Most popular"
          fetchURL={endpoints.getPopularMovies}
        />
        <div className="h-40 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500">
          Chỗ này để Carousel Top Rated (20 phim)
        </div>
      </div>
    </div>
  );
};

export default HomePage;