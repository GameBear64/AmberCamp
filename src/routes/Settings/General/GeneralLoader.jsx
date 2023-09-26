import Skeleton from 'react-loading-skeleton';

import MediaSkeleton from '../../../components/MediaSkeleton';
import SkeletonComponent from '../../../components/Skeleton/SkeletonComponent';
export default function GeneralLoader() {
  return (
    <div className="mt-10 mx-10">
      <div className="flex flex-row gap-28 mb-10">
        <MediaSkeleton />
        <MediaSkeleton />
      </div>
      <div className="flex flex-row gap-28">
        <div>
          <Skeleton className="mb-2" width={200} height={20} />
          <Skeleton width={250} height={250} />
          <Skeleton className="mt-2" width={250} height={35} />
        </div>
        <div>
          <Skeleton className="ml-2 mb-2" width={260} height={30} />
          <div className="flex flex-row w-[300px] flex-wrap gap-2">
            <SkeletonComponent count={4} width={70} height={30} />
          </div>
          <Skeleton className="mt-2 ml-1" width={100} height={20} />
        </div>
      </div>
    </div>
  );
}
