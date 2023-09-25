import Skeleton from 'react-loading-skeleton';

import SkeletonComponent from '../../components/Skeleton/SkeletonComponent';

export default function LoginMobileLoader() {
  return (
    <div className="flex text-center mt-52 justify-center items-center m-auto">
      <div className="flex flex-col">
        <Skeleton className="mb-4" height={30} width={200} />
        <SkeletonComponent count={3} height={40} width={410} />
        <div className="text-right">
          <Skeleton duration={1} count={1} height={20} width={150} />
        </div>
      </div>
    </div>
  );
}
