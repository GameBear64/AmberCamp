import Skeleton from 'react-loading-skeleton';

import MediaSkeleton from '../../../components/MediaSkeleton';
export default function GeneralMobileLoader() {
  return (
    <>
      <Skeleton className="mb-10" height={60} />
      <div className="mx-10">
        <div className="flex flex-col gap-8 mb-10">
          <MediaSkeleton />
          <MediaSkeleton />
          <div>
            <Skeleton className="mb-2" width={200} height={20} />
            <Skeleton width={250} height={250} />
            <Skeleton className="mt-2" width={250} height={35} />
          </div>
        </div>
      </div>
    </>
  );
}
