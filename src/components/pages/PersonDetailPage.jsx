import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Ruler } from 'lucide-react';
import { fetchWithAuth, getPersonDetailUrl } from '@/lib/api';

const FALLBACK_PROFILE = "https://placehold.co/400x600/1a1a1a/FFF?text=No+Image";
const FALLBACK_MOVIE = "https://placehold.co/300x450/222/FFF?text=No+Poster";

const PersonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const getValidUrl = (url, fallback) => {
    if (!url || url === "string" || !url.startsWith("http")) {
      return fallback;
    }
    return url;
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "string") return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth(getPersonDetailUrl(id));
        
        if (data) {
          data.image = getValidUrl(data.image, FALLBACK_PROFILE);
          
          if (data.known_for && Array.isArray(data.known_for)) {
            data.known_for = data.known_for.map(movie => ({
              ...movie,
              image: getValidUrl(movie.image, FALLBACK_MOVIE)
            }));
          }
        }
        setPerson(data);
      } catch (error) {
        console.error("Person Detail Error:", error);
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
  
  if (!person) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1014] text-red-500 font-bold">
      Không tìm thấy dữ liệu người dùng!
    </div>
  );

  return (
    <div className="min-h-screen rounded-2xl text-gray-100 pb-20 font-sans bg-gray-400 dark:bg-gray-600">
      {/* Back Button */}
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
              <img 
                src={person.image} 
                alt={person.name} 
                className="w-full h-auto object-cover aspect-[2/3]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_PROFILE;
                }}
              />
            </div>
            
            <div className="mt-6 bg-gray-600 dark:bg-gray-700 rounded-xl p-5 border border-gray-700 space-y-4">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                Thông tin cá nhân
              </h3>
              
              <div>
                <span className="text-gray-400 text-xs uppercase block">Nghề nghiệp</span>
                <span className="text-white font-medium">{person.role || "N/A"}</span>
              </div>
              
              <div>
                <span className="text-gray-400 text-xs uppercase block">Ngày sinh</span>
                <span className="text-white font-medium flex items-center gap-2">
                   <Calendar size={14} /> {formatDate(person.birth_date)}
                </span>
              </div>

              {person.death_date && person.death_date !== "string" && (
                <div>
                  <span className="text-gray-400 text-xs uppercase block">Ngày mất</span>
                  <span className="text-red-400 font-medium flex items-center gap-2">
                     <Calendar size={14} /> {formatDate(person.death_date)}
                  </span>
                </div>
              )}

              {person.height && person.height !== "string" && (
                <div>
                   <span className="text-gray-400 text-xs uppercase block">Chiều cao</span>
                   <span className="text-white font-medium flex items-center gap-2">
                      <Ruler size={14} /> {person.height}
                   </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {person.name}
              </h1>
            </div>

            <div className="mb-8 p-6 bg-gray-600 dark:bg-gray-700 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                Tiểu sử
              </h3>
              <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {(!person.summary || person.summary === "string") 
                  ? "Chưa có thông tin tiểu sử." 
                  : person.summary.replace(/<[^>]*>?/gm, '')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Các phim đã tham gia
              </h3>
              
              {person.known_for && person.known_for.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {person.known_for.map((movie) => (
                    <Link 
                      to={`/movie/${movie.id}`} 
                      key={movie.id}
                      className="group bg-gray-600 dark:bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 transition shadow-lg"
                    >
                      <div className="aspect-[2/3] overflow-hidden bg-gray-900 relative">
                        <img 
                          src={movie.image} 
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_MOVIE;
                          }}
                        />
                         <div className="absolute top-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-500 border border-yellow-500/30">
                            ★ {movie.rate}
                         </div>
                      </div>
                      
                      <div className="p-3">
                        <h4 className="text-white text-sm font-bold truncate group-hover:text-red-500 transition-colors">
                          {movie.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">{movie.year}</div>
                        <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700 italic truncate">
                           as {movie.character !== "string" ? movie.character : (movie.role || "Actor")}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Chưa có dữ liệu phim tham gia.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;