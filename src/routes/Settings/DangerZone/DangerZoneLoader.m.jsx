import Skeleton from 'react-loading-skeleton';
export default function DangerZoneMobileLoader() {
  return (
    <>
      <Skeleton className="mb-10" height={60} />
      <div className="mx-5">
        <Skeleton className="mb-3" width={150} height={20} />
        <Skeleton width={250} height={20} />
      </div>
    </>
  );
}
