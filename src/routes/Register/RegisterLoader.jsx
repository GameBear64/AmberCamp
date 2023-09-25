import Skeleton from 'react-loading-skeleton';

import SkeletonComponent from '../../components/Skeleton/SkeletonComponent';

export default function RegisterLoader() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex text-center justify-center items-center m-auto">
        <div className="flex flex-col">
          <Skeleton className="mb-4" height={30} width={200} />

          <SkeletonComponent count={2} height={40} width={410} />
          <div className="flex flex-row">
            <SkeletonComponent count={2} height={40} width={200} />
          </div>
          <SkeletonComponent count={1} height={40} width={410} />

          <div className="text-right">
            <Skeleton duration={1} count={1} height={20} width={150} />
          </div>
        </div>
      </div>
      <Skeleton duration={1} count={1} width="50vw" className="h-screen" />
    </div>
  );
}
