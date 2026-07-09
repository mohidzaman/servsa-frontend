import Skeleton from './Skeleton';

export default function SkeletonForm({ fields = 4 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ))}
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  );
}
