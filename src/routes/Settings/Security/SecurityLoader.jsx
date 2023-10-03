import Skeleton from 'react-loading-skeleton';

import SkeletonComponent from '../../../components/Skeleton/SkeletonComponent';
export default function SecurityLoader() {
  return (
    <div className="mt-10 mx-10">
      <Skeleton className="mb-2" width={200} height={20} />
      <Skeleton className="mb-1" width={250} height={40} />
      <Skeleton className="mb-6" width={250} height={40} />
      <hr />
      <Skeleton className="mb-2 mt-6" width={200} height={20} />
      <SkeletonComponent width={250} height={40} count={4} />
    </div>
  );
}
