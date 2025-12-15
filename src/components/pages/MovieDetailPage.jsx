import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Play } from 'lucide-react';
import { fetchWithAuth, getMovieDetailUrl } from '@/lib/api';

const FALLBACK_POSTER = "https://placehold.co/400x600/1a1a1a/FFF?text=No+Poster";
const FALLBACK_AVATAR = "https://placehold.co/100x100/333/FFF?text=User";

const ReviewCard = ({ review }) => {

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-gray-700 p-5 rounded-xl border border-gray-700 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white uppercase">
            {review.username?.charAt(0) || "U"}
          </div>
          <div>
            <div className="font-bold text-white text-sm">{review.username}</div>
            <div className="text-xs text-gray-400">{formatDate(review.date)}</div>
          </div>
        </div>
        
        {review.rate > 0 && (
          <div className="flex items-center gap-1 bg-gray-900 px-2 py-1 rounded text-yellow-500 text-xs font-bold border border-gray-700">
            <Star size={12} fill="currentColor" />
            {review.rate}
          </div>
        )}
      </div>

      {review.title && <h4 className="font-bold text-gray-200 text-sm mb-2">{review.title}</h4>}

      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
        {review.content}
      </p>
    </div>
  );
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getValidUrl = (url, fallback) => {
    if (!url || url === "string" || !url.startsWith("http")) {
      return fallback;
    }
    return url;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth(getMovieDetailUrl(id));
        
        if (data) {
          data.image = getValidUrl(data.image, FALLBACK_POSTER);
          if (data.actors && Array.isArray(data.actors)) {
            data.actors = data.actors.map(actor => ({
              ...actor,
              image: getValidUrl(actor.image, FALLBACK_AVATAR)
            }));
          }
        }

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
    <div className="min-h-screen rounded-2xl text-gray-100 pb-20 font-sans bg-gray-400 dark:bg-gray-600">
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className='text-white' />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* POSTER CARD */}
          <div className="w-full md:w-[300px] lg:w-[350px] flex-shrink-0">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-auto object-cover aspect-[2/3]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_POSTER;
                }}
              />
            </div>
            
            <button className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-900/20 flex items-center justify-center gap-2">
              <Play size={20} fill="currentColor" />
              Xem Phim
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700">
                  <Star size={18} className="text-yellow-500" fill="currentColor" />
                  <span className="text-white font-bold text-lg">
                    {movie.ratings?.imDb ? Number(movie.ratings.imDb).toFixed(1) : (movie.rate || "N/A")}
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
                  <span key={g} className="px-4 py-1.5 rounded-full text-white text-sm transition cursor-default border border-gray-700">
                    {g}
                  </span>
                )) || <span className="text-gray-500 italic">Chưa cập nhật thể loại</span>}
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                Nội dung phim
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                {movie.plot_full?.replace(/<[^>]*>?/gm, '') || movie.short_description || "Đang cập nhật nội dung..."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
               <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Đạo diễn</span>
                  <div className="font-semibold text-white truncate">
                    {movie.directors?.map(d => d.name).join(', ') || 'N/A'}
                  </div>
               </div>
               <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Quốc gia</span>
                  <div className="font-semibold text-white">United States</div>
               </div>
               <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Doanh thu</span>
                  <div className="font-semibold text-green-400">
                    {movie.box_office?.cumulative_worldwide_gross || movie.box_office?.budget || 'N/A'}
                  </div>
               </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Diễn viên
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {movie.actors?.slice(0, 8).map(actor => (
                  <div key={actor.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-gray-500 transition group cursor-default">
                    <img 
                      src={actor.image} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-600 group-hover:border-white transition"
                      alt={actor.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_AVATAR;
                      }}
                    />
                    <div className="overflow-hidden">
                      <div className="font-semibold text-white text-sm truncate">{actor.name}</div>
                      <div className="text-xs text-gray-400 truncate">{actor.character || "Actor"}</div>
                    </div>
                  </div>
                ))}
              </div>
              {(!movie.actors || movie.actors.length === 0) && (
                 <p className="text-gray-500 italic">Chưa có thông tin diễn viên.</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Đánh giá ({movie.reviews ? movie.reviews.length : 0})
              </h3>

              {movie.reviews && movie.reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.reviews.map((review, index) => (
                    <ReviewCard key={review.id || index} review={review} />
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed text-center text-gray-500 italic">
                  Chưa có đánh giá nào cho bộ phim này.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;