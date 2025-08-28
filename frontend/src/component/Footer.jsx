import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const ImdbIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="28px"
    height="28px"
    fill="currentColor"
    {...props}
  >
    <path
      fill="#ffc107"
      d="M44,41H4c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h40c1.1,0,2,0.9,2,2v30C46,40.1,45.1,41,44,41z"
    />
    <g fill="#212121">
      <path d="M10.1,15h-4v18h4V15z M23.1,15h-4.2l-2.1,11.5l-2.1-11.5h-4.2v18h4v-11l2.1,11h3.9l2.1-11v11h4V15z M38.4,15h-5.8 c-1.3,0-2.4,1.1-2.4,2.4v13.1c0,1.3,1.1,2.4,2.4,2.4h5.8c1.3,0,2.4-1.1,2.4-2.4V17.4C40.8,16.1,39.7,15,38.4,15z M37,29.8h-2.8 v-2.6H37V29.8z M37,24h-2.8v-2.6H37V24z" />
    </g>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 py-6 bg-zinc-950/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
              <Film className="h-8 w-8 text-amber-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent bg-300% animate-gradient">
                MovieVerse
              </h1>
            </Link>
          </div>
          <p className="text-zinc-400 text-sm">
            &copy; {currentYear}{" "}
            <Link to="/" className="hover:text-amber-400 transition-colors">
              <span className="text-sm font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent bg-300% animate-gradient">
                MovieVerse
              </span>
            </Link>
            . All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://www.imdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-amber-400 transition-colors"
              title="Visit IMDb"
            >
              <ImdbIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
