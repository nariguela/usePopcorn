import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Navbar/Logo";
import SearchBar from "./components/Navbar/SearchBar";
import NumResults from "./components/Navbar/NumResults";

import Main from "./components/Main";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedBox/WatchedSummary";
import WatchedMoviesList from "./components/WatchedBox/WatchedMoviesList";
import MovieList from "./components/MovieListBox/MovieList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(movieId) {
    setSelectedId((prevId) => (prevId === movieId ? null : movieId));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((prevWatched) => [...prevWatched, movie]);
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
