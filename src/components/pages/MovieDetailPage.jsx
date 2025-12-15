import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Play, Users, Film } from 'lucide-react';
import { fetchWithAuth, getMovieDetailUrl } from '@/lib/api';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth(getMovieDetailUrl(id));
        setMovie(data);
      } catch (error) {
        console.error("Detail Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1014] text-gray-400">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
    </div>
  );
  
  if (!movie) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1014] text-red-500 font-bold">
      Không tìm thấy dữ liệu phim!
    </div>
  );

  return (
    <div className="min-h-screen rounded-2xl text-gray-100 pb-20 font-sans">
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          <div className="w-full md:w-[300px] lg:w-[350px] flex-shrink-0">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-auto object-cover aspect-[2/3]"
                onError={(e) => e.target.src = "https://via.placeholder.com/400x600?text=No+Poster"}
              />
            </div>
            
            <button className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-900/20 flex items-center justify-center gap-2">
              <Play size={20} fill="currentColor" />
              Xem Phim
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-black dark:text-white mb-4 leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-black dark:text-white font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 dark:border-white">
                  <Star size={18} className="text-yellow-500" fill="currentColor" />
                  <span className="text-black dark:text-white font-bold text-lg">
                    {movie.ratings.imDb ? Number(movie.ratings.imDb).toFixed(1) : "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar size={18} />
                  <span>{movie.year || "----"}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock size={18} />
                  <span>{movie.runtime || "N/A"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {movie.genres?.map((g) => (
                  <span key={g} className="px-4 py-1.5 rounded-full text-black dark:text-white text-sm transition cursor-default border border-gray-700 dark:border-white">
                    {g}
                  </span>
                )) || <span className="text-gray-500 italic">Chưa cập nhật thể loại</span>}
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-500 dark:bg-gray-400 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Film size={20} className="text-red-500" />
                Nội dung phim
              </h3>
              <p className="text-white dark:text-black leading-relaxed text-base">
                {movie.plot_full?.replace(/<[^>]*>?/gm, '') || movie.short_description || "Đang cập nhật nội dung..."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
               <div className="p-4 bg-gray-500 dark:bg-gray-400 rounded-xl border border-gray-800">
                  <span className="text-white dark:text-black text-xs uppercase tracking-wider block mb-1">Đạo diễn</span>
                  <div className="font-semibold text-white truncate">
                    {movie.directors?.map(d => d.name).join(', ') || 'N/A'}
                  </div>
               </div>
               <div className="p-4 bg-gray-500 dark:bg-gray-400 rounded-xl border border-gray-800">
                  <span className="text-white dark:text-black text-xs uppercase tracking-wider block mb-1">Quốc gia</span>
                  <div className="font-semibold text-white">United States</div> {/* Data JSON của bạn thiếu field này, tôi hardcode mẫu */}
               </div>
               <div className="p-4 bg-gray-500 dark:bg-gray-400 rounded-xl border border-gray-800">
                  <span className="text-white dark:text-black text-xs uppercase tracking-wider block mb-1">Doanh thu</span>
                  <div className="font-semibold text-black-400">
                    {movie.box_office?.cumulative_worldwide_gross || movie.box_office?.budget || 'N/A'}
                  </div>
               </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-500" />
                Diễn viên
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {movie.actors?.slice(0, 8).map(actor => (
                  <div key={actor.id} className="flex items-center gap-3 bg-gray-500 dark:bg-gray-400 p-3 rounded-xl border border-gray-800 hover:border-gray-600 transition group cursor-default">
                    <img 
                      src={actor.image || "https://via.placeholder.com/100"} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-700 group-hover:border-white transition"
                      alt={actor.name}
                      onError={(e) => e.target.src = "https://via.placeholder.com/100?text=U"}
                    />
                    <div className="overflow-hidden">
                      <div className="font-semibold text-white dark:text-black text-sm truncate">{actor.name}</div>
                      <div className="text-xs text-white dark:text-black truncate">{actor.character || "Actor"}</div>
                    </div>
                  </div>
                ))}
              </div>
              {(!movie.actors || movie.actors.length === 0) && (
                 <p className="text-gray-500 italic">Chưa có thông tin diễn viên.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;