import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Movie } from "../../types/movie";
import { searchMovies, getMovieDetails } from "../../services/api";
import styles from "./App.module.css";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const results = await searchMovies(query);
      if (results.length === 0) setError("No movies found");
      setMovies(results);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openMovieModal = async (id: number) => {
    setLoading(true);
    try {
      const movie = await getMovieDetails(id);
      setSelectedMovie(movie);
    } catch {
      setError("Failed to load movie details");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.app}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <MovieGrid movies={movies} onMovieClick={openMovieModal} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;

// import { useState } from "react";
// import SearchBar from "../SearchBar/SearchBar";
// import MovieGrid from "../MovieGrid/MovieGrid";
// import MovieModal from "../MovieModal/MovieModal";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import { Movie } from "../../types/movie";
// import { searchMovies, getMovieDetails } from "../../services/api";
// import styles from "./App.module.css";

// const App = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

//   const handleSearch = async (query: string) => {
//     setLoading(true);
//     setError("");
//     try {
//       const results = await searchMovies(query);
//       if (results.length === 0) setError("No movies found");
//       setMovies(results);
//     } catch (e) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openMovieModal = async (id: number) => {
//     setLoading(true);
//     try {
//       const movie = await getMovieDetails(id);
//       setSelectedMovie(movie);
//     } catch {
//       setError("Failed to load movie details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => setSelectedMovie(null);

//   return (
//     <div className={styles.app}>
//       <SearchBar onSearch={handleSearch} />
//       {loading && <Loader />}
//       {error && <ErrorMessage message={error} />}
//       {!loading && !error && (
//         <MovieGrid movies={movies} onMovieClick={openMovieModal} />
//       )}
//       {selectedMovie && (
//         <MovieModal movie={selectedMovie} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default App;
