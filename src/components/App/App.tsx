import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { fetchMovies, fetchMovieById } from "../../services/movieService";
import styles from "./App.module.css";
import toast from "react-hot-toast";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast("No movies found for your request.");
        setMovies([]);
        return;
      }
      setMovies(results);
    } catch {
      toast.error("Something went wrong while fetching movies.");
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openMovieModal = async (id: number) => {
    setLoading(true);
    try {
      const movie = await fetchMovieById(id);
      setSelectedMovie(movie);
    } catch {
      toast.error("Failed to load movie details.");
      setError("Failed to load movie details");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={openMovieModal} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;


