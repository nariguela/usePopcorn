import MovieListBox from "./MovieListBox/MovieListBox";
import WatchedBox from "./WatchedBox/WatchedBox";

export default function Main({ movies }) {
  return (
    <main className="main">
      <MovieListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}
