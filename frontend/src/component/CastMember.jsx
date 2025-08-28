import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CastMember({ name, character, imageUrl }) {
  const fallbackText = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={imageUrl} alt={name} className="object-cover" />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold text-white">{name}</p>
        <p className="text-sm text-zinc-400">{character}</p>
      </div>
    </div>
  );
}
