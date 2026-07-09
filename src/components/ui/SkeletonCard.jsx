import Skeleton from './Skeleton';

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-outline-variant bg-surface p-8 space-y-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <div className="pt-2">
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
