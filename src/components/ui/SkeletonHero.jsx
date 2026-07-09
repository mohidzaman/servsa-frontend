import Skeleton from './Skeleton';

export default function SkeletonHero() {
  return (
    <div className="min-h-screen">
      <div className="py-32 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="h-14 w-[600px] max-w-full mx-auto" />
          <Skeleton className="h-6 w-[500px] max-w-full mx-auto" />
          <div className="flex justify-center gap-4 pt-6">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
          <div className="flex justify-center gap-3 pt-8">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
