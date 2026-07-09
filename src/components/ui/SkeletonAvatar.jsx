import Skeleton from './Skeleton';

export default function SkeletonAvatar({ size = 'w-12 h-12' }) {
  return <Skeleton className={`${size} rounded-full shrink-0`} />;
}
