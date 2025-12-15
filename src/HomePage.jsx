import React from 'react';
import { Banner } from '@/components/Banner';
import { Carousel } from '@/components/Carousel';
import { endpoints } from '@/lib/api';

const HomePage = () => {
  return (
    <div className="min-h-screen pb-20">
      <section className="w-full">
        <Banner />
      </section>

      <div className="container mx-auto px-4 mt-10 space-y-8">
        <Carousel
          title="Most popular"
          fetchUrl={endpoints.getPopularMovies}
        />
      <div className="container mx-auto px-4 mt-10 space-y-8">          
        <Carousel
            title="Top rating"
            fetchUrl={endpoints.getTopRated}
          />        
        </div>
      </div>
    </div>
  );
};

export default HomePage;