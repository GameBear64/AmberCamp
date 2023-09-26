import Skeleton from 'react-loading-skeleton';
export default function MediaSkeleton() {
  return (
    <div>
      <Skeleton className="mb-1" width={200} height={20} />
      <Skeleton className="rounded-full mb-2 ml-2" width={90} height={30} />
      <Skeleton width={250} height={150} />
    </div>
  );
}
