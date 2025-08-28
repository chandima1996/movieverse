import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft } from "lucide-react";
import CastMember from "../component/CastMember";
import MovieCardSkeleton from "../component/MovieCardSkeleton";
import Header from "../component/Header";
export default function MovieDetailPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchAllDetails = async () => {
      setIsLoading(true);
      try {
        const detailsPromise = axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const creditsPromise = axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        );

        const [detailsResponse, creditsResponse] = await Promise.all([
          detailsPromise,
          creditsPromise,
        ]);

        setMovieDetails(detailsResponse.data);
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error("Error fetching movie details and credits:", error);
      }
      setIsLoading(false);
    };

    fetchAllDetails();
  }, [id, apiKey]);

  const director = credits?.crew.find((member) => member.job === "Director");

  if (isLoading || !movieDetails || !credits) {
    return (
      <div>
        <Header />
        <div className="container mx-auto p-6 mt-16 mb-24">
          <div className="h-10 w-40 mb-6">
            <MovieCardSkeleton />
          </div>
          <div className="h-[50vh] rounded-xl">
            <MovieCardSkeleton />
          </div>
          <div className="mt-8">
            <MovieCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto p-6 mt-16 mb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        <div className="relative h-[50vh] rounded-xl overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>

        <div className="mt-[-100px] relative z-10 px-8 flex gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-64 rounded-xl hidden md:block"
          />
          <div>
            <h1 className="text-5xl font-bold">{movieDetails.title}</h1>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-xl text-zinc-300">
                {movieDetails.release_date.substring(0, 4)}
              </p>
              <div className="flex items-center gap-2">
                <Star className="text-amber-400" size={20} />
                <p className="text-xl font-bold">
                  {movieDetails.vote_average.toFixed(1)} / 10
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {movieDetails.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <p className="mt-6 text-zinc-300 max-w-3xl">
              {movieDetails.overview}
            </p>

            {director && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Director</h3>
                <p className="text-zinc-300">{director.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Top Billed Cast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credits.cast.slice(0, 6).map((member) => (
              <CastMember
                key={member.id}
                name={member.name}
                character={member.character}
                imageUrl={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                    : null
                }
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
