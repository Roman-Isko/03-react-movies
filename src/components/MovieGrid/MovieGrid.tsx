import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (id: number) => void;
}

const MovieGrid = ({ movies, onMovieClick }: MovieGridProps) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={styles.card}
          onClick={() => onMovieClick(movie.id)}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
          ) : (
            <div className={styles.noImage}>No image</div>
          )}
          <p className={styles.title}>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
