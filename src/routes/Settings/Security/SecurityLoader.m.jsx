import Skeleton from 'react-loading-skeleton';

import SkeletonComponent from '../../../components/Skeleton/SkeletonComponent';

export default function SecurityMobileLoader() {
  return (
    <>
      <Skeleton className="mb-10" height={60} />
      <div className="mx-10">
        <div>
          <Skeleton className="mb-2" width={180} height={20} />
          <Skeleton width={80} height={20} />
          <Skeleton className="mb-1" height={40} />
          <Skeleton className="mb-6" height={40} />
        </div>
        <hr />
        <div className="mt-6">
          <Skeleton className="mb-2" width={200} height={20} />
          <SkeletonComponent height={40} count={3} label={true} />
          <Skeleton className="mt-4" height={40} />
        </div>
      </div>
    </>
  );
}
