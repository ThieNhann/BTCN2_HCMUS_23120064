import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { endpoints, fetchWithAuth } from '@/lib/api';

export function Banner() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        const data = await fetchWithAuth(endpoints.getFivePopularMovies);
        
        if (data && data.data && Array.isArray(data.data)) {
          setMovies(data.data);
        } else {
          throw new Error('Cấu trúc dữ liệu không hợp lệ');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  if (loading) return <div className="h-[400px] flex items-center justify-center text-gray-500">Đang tải Banner...</div>;
  if (error) return <div className="h-[200px] flex items-center justify-center text-red-500">Lỗi: {error}</div>;
  if (movies.length === 0) return null;

  const movie = movies[currentIndex];

  return (
    <div className="w-full flex flex-col items-center py-3 bg-transparent">
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        
        <button 
          onClick={prevSlide}
          className="absolute left-0 md:-left-12 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white" />
        </button>

        <div className="relative group perspective-1000"> 
          <img 
            src={movie.image} 
            alt={movie.title}
            className="h-[350px] md:h-[450px] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-500"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Poster"; }}
          />
        </div>

        <button 
          onClick={nextSlide}
          className="absolute right-0 md:-right-12 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white" />
        </button>
      </div>

      <div className="mt-6 text-center animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {movie.title} <span className="text-black font-bold">({movie.year})</span>
        </h2>
        
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium uppercase tracking-wide">
          {movie.genres ? movie.genres.join(' • ') : 'N/A'}
        </p>
      </div>
    </div>
  );
}