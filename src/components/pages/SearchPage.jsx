import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth, getSearchUrl } from '@/lib/api';
import { Frown, ImageOff } from 'lucide-react'; // Thêm icon ImageOff

const MoviePoster = ({ src, alt }) => {
  const [error, setError] = useState(false);

  const isValidUrl = src && src !== "string" && src.startsWith("http");

  if (!isValidUrl || error) {
    return (
      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
        <ImageOff size={32} className="mb-2 opacity-50" />
        <span className="text-xs font-bold opacity-70">NO POSTER</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setError(true)} // Khi lỗi, set state -> component sẽ re-render ra cái div ở trên
    />
  );
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setMovies([]);
        return;
      }
      try {
        setLoading(true);
        const url = getSearchUrl(query);
        
        const response = await fetchWithAuth(url);
        setMovies(response.data || []); 
      } catch (error) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [query]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen pt-8 pb-10 px-4 md:px-8 ">
      
      {query && (
        <div className="mb-6 max-w-5xl mx-auto">
           <h1 className="text-xl text-gray-600 dark:text-gray-300">
             Kết quả tìm kiếm cho: <span className="font-bold text-black dark:text-white">"{query}"</span>
           </h1>
        </div>
      )}

      {loading && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
            ))}
         </div>
      )}

      {!loading && movies.length === 0 && query && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Frown size={64} className="mb-4" />
          <p className="text-xl font-medium">Không tìm thấy phim nào.</p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              onClick={() => handleMovieClick(movie.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col group"
            >
              <div className="aspect-[2/3] w-full bg-gray-200 relative overflow-hidden">
                <MoviePoster src={movie.image} alt={movie.title} />
              </div>

              <div className="p-4 text-center flex-1 flex flex-col justify-start bg-white dark:bg-gray-800 z-10 relative">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2">
                  {movie.title} <span className="font-normal text-gray-600 dark:text-gray-400">({movie.year})</span>
                </h3>
                
                <p className="text-sm text-gray-500 italic mt-auto">
                  [{movie.genres ? movie.genres.join(', ') : 'Unknown'}]
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;