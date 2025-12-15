import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchWithAuth } from '@/lib/api';

export function Carousel({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const ITEMS_VISIBLE = 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth(fetchUrl);
        const list = data.data || []; 
        setMovies(list);
      } catch (error) {
        console.error("Carousel Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchUrl]);

  const nextSlide = () => {
    if (currentIndex < movies.length - ITEMS_VISIBLE) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) return <div className="h-64 w-full animate-pulse bg-gray-200 rounded-lg my-8"></div>;
  if (!movies.length) return null;

  const navButtonClass = "absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all disabled:opacity-0 backdrop-blur-sm";

  return (
    <div className="w-full py-8 group/container relative">
      <div className="mb-4 px-1">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white inline-block">
          {title}
        </h2>
      </div>

      <button 
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`${navButtonClass} -left-4 md:-left-6`}
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button 
        onClick={nextSlide}
        disabled={currentIndex >= movies.length - ITEMS_VISIBLE}
        className={`${navButtonClass} -right-4 md:-right-6`}
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="relative gap-10 px-12 overflow-visible py-2">
        <div className="grid grid-cols-3 gap-4 animate-in fade-in duration-300">
          {movies.slice(currentIndex, currentIndex + ITEMS_VISIBLE).map((movie, index) => (
            <div 
              key={movie.id} 
              className="group relative cursor-pointer transition-all duration-500 hover:scale-110 hover:z-20 origin-center"
              style={{ 
                 transformOrigin: index === 0 ? 'left center' : (index === ITEMS_VISIBLE - 1 ? 'right center' : 'center center') 
              }}
            >
              <div className="aspect-[2/3] rounded-lg shadow-lg bg-gray-100 relative overflow-hidden">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300x450"; }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm md:text-base font-bold leading-tight line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 font-medium">{movie.year}</p>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}