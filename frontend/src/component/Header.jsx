import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Film, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { genres } from "../data/genres.js";

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <Link to={href}>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none text-white transition-colors group-hover:text-amber-400">
                {title}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                {children}
              </p>
            </a>
          </NavigationMenuLink>
        </Link>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default function Header({ searchQuery, setSearchQuery, handleSearch }) {
  const navLinkClasses =
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-amber-400 focus:bg-zinc-800 focus:text-amber-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-amber-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent bg-300% animate-gradient">
            MovieVerse
          </h1>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navLinkClasses}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navLinkClasses}>
                Genres
              </NavigationMenuTrigger>
              {/* මෙන්න මේ line එක තමයි වෙනස් කලේ */}
              <NavigationMenuContent className="border border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {genres.map((genre) => (
                    <ListItem
                      key={genre.id}
                      href={`/genre/${genre.href}`}
                      title={genre.name}
                    >
                      {genre.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/top-rated">
                <NavigationMenuLink className={navLinkClasses}>
                  Top Rated
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {handleSearch && (
          <form onSubmit={handleSearch} className="relative w-1/4 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-500" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700 text-white pl-10"
            />
          </form>
        )}
      </div>
    </header>
  );
}
