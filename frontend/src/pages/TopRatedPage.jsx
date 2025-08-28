import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../component/Header";
import MovieCard from "../component/MovieCard";
import { Button } from "@/components/ui/button";
import MovieCardSkeleton from "../component/MovieCardSkeleton";

export default function TopRatedPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchTopRatedMovies = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNum}`
      );

      if (pageNum === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTopRatedMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTopRatedMovies(nextPage);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 mt-16 mb-24">
        <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading && movies.length === 0
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.release_date}
                  posterURL={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : null
                  }
                />
              ))}
        </div>

        <div className="flex justify-center mt-8">
          {isLoading && movies.length > 0 ? (
            <p className="text-zinc-400">Loading more...</p>
          ) : (
            !isLoading &&
            movies.length > 0 && (
              <Button
                onClick={handleLoadMore}
                className="bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400"
              >
                Load More
              </Button>
            )
          )}
        </div>

        {!isLoading && movies.length === 0 && (
          <p className="text-center text-xl text-zinc-400">No movies found.</p>
        )}
      </div>
    </div>
  );
}
