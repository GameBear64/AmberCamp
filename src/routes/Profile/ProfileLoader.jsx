import Skeleton from 'react-loading-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';

import Layout from '../../components/Layout/Layout';
import SkeletonComponent from '../../components/Skeleton/SkeletonComponent';

export default function ProfileLoader() {
  return (
    <SkeletonTheme baseColor="#dddddd" highlightColor="#000000">
      <Layout
        native={true}
        left={<Skeleton className="h-screen" width={320} duration={1} count={1} />}
        right={
          <div>
            <section className="h-60 bg-[#DDDDDD]">
              <section className="relative flex flex-row pt-36 mx-4">
                <div className="h-48 relative overflow-hidden rounded-[50%] inline-block border-solid shadow-md border-4 border-white mx-2.5">
                  <Skeleton className="inline-block rounded-[50%]" duration={1} width={192} height={199} />
                </div>
                <div className="mt-28">
                  <Skeleton duration={1} width={100} height={15} />
                  <Skeleton duration={1} width={120} height={14} />
                </div>
              </section>
            </section>
            <section className="flex flex-row justify-between gap-6 mt-20 mx-12">
              <div className="flex flex-col justify-center text-center gap-1 mt-10">
                <Skeleton duration={1} count={1} width={120} height={35} />
                <SkeletonComponent count={5} width="45vw" height={25} />
              </div>
              <div className="flex flex-col">
                <p
                  className="mt-10
                mb-5">
                  <Skeleton duration={1} count={1} width="6vw" height={20} />
                  <Skeleton duration={1} count={1} width="13vw" height={18} />
                  <Skeleton duration={1} count={3} width="20vw" height={18} />
                </p>
                <hr />
                <Skeleton className="my-5" duration={1} count={1} width="20vw" height={18} />
                <hr />
                <div className="flex mt-5 flex-row w-[300px] flex-wrap gap-3">
                  <SkeletonComponent count={4} width={70} height={30} />
                </div>
              </div>
            </section>
          </div>
        }
      />
      <div className="grid grid-cols-[20em_1fr] grid-rows-[1fr_3em] grid-flow-row h-screen"></div>
    </SkeletonTheme>
  );
}
