import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function MovieCard({ id, title, year, posterURL }) {
  const [imgSrc, setImgSrc] = useState(posterURL);

  const handleImageError = () => {
    setImgSrc("https://via.placeholder.com/500x750?text=No+Image");
  };

  return (
    <Link to={`/movie/${id}`}>
      <div className="group overflow-hidden rounded-lg">
        <Card className="h-full bg-zinc-900 border-zinc-800 transition-transform duration-300 ease-in-out group-hover:scale-105">
          <CardContent className="p-0 relative">
            <img
              src={imgSrc}
              onError={handleImageError}
              alt={title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-bold text-yellow-500 truncate">
                {title}
              </h3>
              <p className="text-sm text-yellow-300">
                {year ? year.substring(0, 4) : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
