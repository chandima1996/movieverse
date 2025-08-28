import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-80 w-full rounded-lg bg-zinc-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-5/6 bg-zinc-800" />
        <Skeleton className="h-4 w-1/4 bg-zinc-800" />
      </div>
    </div>
  );
}
