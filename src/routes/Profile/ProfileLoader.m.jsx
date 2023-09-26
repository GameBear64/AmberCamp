import Skeleton from 'react-loading-skeleton';

import SkeletonComponent from '../../components/Skeleton/SkeletonComponent';

export default function ProfileMobileLoader() {
  return (
    <div className="m-auto">
      <section className="h-52 bg-[#EBEBEB] bg-center bg-cover">
        <section className="relative flex flex-row pt-28 mx-4 ">
          <div className="h-44 relative overflow-hidden rounded-[50%] inline-block border-solid shadow-md border-4 border-white mx-2.5">
            <Skeleton duration={1} width="11rem" className="inline-block bg-center rounded-[50%]" height="11rem" />
          </div>
          <div className="mt-28">
            <Skeleton duration={1} width={65} height={17} />
            <Skeleton duration={1} width={85} height={16} />
          </div>
        </section>
      </section>
      <section className="flex flex-col">
        <div className="mt-32 col-span-2 mx-9 mb-10">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Skeleton duration={1} count={5} height={20} />
            </div>
          </div>
        </div>
        <section className="overflow-y-auto col-span-1 ">
          <div className="pl-10 pr-10 w-auto">
            <Skeleton duration={1} width={105} height={20} />
            <Skeleton duration={1} count={4} height={20} />
            <hr className="my-5" />
            <Skeleton duration={1} height={18} />
            <hr className="my-5" />
            <Skeleton className="m-2" duration={1} height={20} width={105} />
            <div className="flex flex-row max-w-[600px] flex-wrap">
              <SkeletonComponent count={4} width={70} height={22} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
