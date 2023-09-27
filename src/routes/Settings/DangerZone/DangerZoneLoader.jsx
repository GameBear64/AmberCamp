import Skeleton from 'react-loading-skeleton';

export default function DangerZoneLoader() {
  return (
    <div className="mt-10 mx-10">
      <Skeleton className="mb-3" width={150} height={20} />
      <Skeleton width={250} height={20} />
    </div>
  );
}
