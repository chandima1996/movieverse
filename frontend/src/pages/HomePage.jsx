import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../component/Header";
import MovieCard from "../component/MovieCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 1. Search query එකට state එකක්
  const [currentTitle, setCurrentTitle] = useState("Popular Movies"); // 2. Heading එකට state එකක්

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Popular movies ගේන function එක
  const fetchPopularMovies = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNum}`
      );
      if (pageNum === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
    setIsLoading(false);
  };

  // Search results ගේන function එක
  const searchMovies = async (query) => {
    if (!query) return; // query එක හිස් නම් මුකුත් කරන්න එපා
    setIsLoading(true);
    setPage(1); // Search කරද්දී හැමවෙලේම 1 වෙනි page එකෙන් පටන් ගන්න
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`
      );
      setMovies(response.data.results); // Search results වලින් movies list එක replace කරනවා
      setCurrentTitle(`Search Results for: "${query}"`);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setIsLoading(false);
  };

  // මුලින්ම page එක load වෙද්දී popular movies ගේනවා
  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    // දැනට search කරලා නැත්නම් විතරක් popular movies load කරන්න
    if (currentTitle === "Popular Movies") {
      fetchPopularMovies(nextPage);
    }
    // (අපි පස්සේ search results වලටත් load more හදමු)
  };

  // Search form එක submit කරද්දී මේ function එක run වෙනවා
  const handleSearch = (e) => {
    e.preventDefault(); // page එක refresh වෙන එක නවත්තනවා
    searchMovies(searchQuery);
  };

  return (
    <div>
      {/* 3. Header එකට state සහ functions ටික props විදියට pass කරනවා */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="container mx-auto p-6 mt-16 mb-24">
        <h2 className="text-3xl font-bold mb-6">{currentTitle}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.id}-${searchQuery}`}
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
          {isLoading ? (
            <p className="text-zinc-400">Loading...</p>
          ) : (
            // Search කරලා නැත්නම් විතරක් Load More button එක පෙන්නනවා
            movies.length > 0 &&
            currentTitle === "Popular Movies" && (
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
