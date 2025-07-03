import axios from "axios";

const API_KEY = "🔑_ТВОЙ_API_КЛЮЧ"; // заміни на свій ключ
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const searchMovies = async (query: string) => {
  const response = await api.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// import axios from "axios";

// const API_KEY = "🔑_ТВОЙ_API_КЛЮЧ"; // заміни на свій
// const BASE_URL = "https://api.themoviedb.org/3";

// const api = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     api_key: API_KEY,
//     language: "en-US",
//   },
// });

// export const searchMovies = async (query: string) => {
//   const response = await api.get("/search/movie", {
//     params: { query },
//   });
//   return response.data.results;
// };

// export const getMovieDetails = async (movieId: number) => {
//   const response = await api.get(`/movie/${movieId}`);
//   return response.data;
// };
