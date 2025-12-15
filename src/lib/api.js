export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://34.124.214.214:2423/api',
  DEFAULT_TOKEN: import.meta.env.VITE_APP_TOKEN,
};

export const endpoints = {
  getFivePopularMovies: `${API_CONFIG.BASE_URL}/movies/most-popular?page=1&limit=5`,
  getPopularMovies: `${API_CONFIG.BASE_URL}/movies/most-popular?page=1&limit=20`,
  getTopRated: `${API_CONFIG.BASE_URL}/movies/top-rated?page=1&limit=20`,
  search: `${API_CONFIG.BASE_URL}/movies/search`,
  login: `${API_CONFIG.BASE_URL}/users/login`,
  register: `${API_CONFIG.BASE_URL}/users/register`,
  logout: `${API_CONFIG.BASE_URL}/users/logout`,
};

export const getMovieDetailUrl = (id) => `${API_CONFIG.BASE_URL}/movies/${id}`;

export const getSearchUrl = (keyword, type = 'q', page = 1) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '20'
  });

  if (type === 'person') {
    params.append('person', keyword); // Tìm theo diễn viên/đạo diễn
  } else {
    params.append('q', keyword);
  }
  
  return `${endpoints.search}?${params.toString()}`;
};

export const getPersonDetailUrl = (id) => `${API_CONFIG.BASE_URL}/persons/${id}`;

export const fetchWithAuth = async (url, options = {}) => {
  // Lấy token của người dùng từ LocalStorage
  const userToken = localStorage.getItem('accessToken');
  
  // ưu tiên User Token > Default Token
  const tokenToUse = userToken || API_CONFIG.DEFAULT_TOKEN;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-app-token': tokenToUse,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // 401 (Unauthorized) -> Token hết hạn
    if (response.status === 401) {
      console.warn("Token expired or invalid");
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Lỗi API (${response.status})`;

      try {
        const errorJson = JSON.parse(errorText);
        
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        errorMessage = errorText;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};