import { useState, useEffect } from "react";

const KEY = "def9f89e";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fecthMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok)
            throw new Error("Something went wrong with the movies API");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      fecthMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
