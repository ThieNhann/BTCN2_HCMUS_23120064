export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://34.124.214.214:2423/api',
  TOKEN: import.meta.env.VITE_APP_TOKEN,
};

if (!API_CONFIG.TOKEN) {
  console.error("VITE_APP_TOKEN chưa được tìm thấy.");
}

export const endpoints = {
  getFivePopularMovies: `${API_CONFIG.BASE_URL}/movies/most-popular?page=1&limit=5`,
  getPopularMovies: `${API_CONFIG.BASE_URL}/movies/most-popular?page=1&limit=20`,
  getTopRated: `${API_CONFIG.BASE_URL}/movies/top-rated?page=1&limit=20`, // Dự phòng cho section 2
};


export const fetchWithAuth = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-app-token': API_CONFIG.TOKEN, 
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};