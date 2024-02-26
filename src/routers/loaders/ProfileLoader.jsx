import Skeleton from 'react-loading-skeleton';

import Layout from '../../components/Layout/Layout';

export function NotesLoader() {
  const numberOfNotes = Array.from({ length: Math.floor(Math.random() * 6) + 1 }, (_, i) => i + 1);
  return (
    <div className="m-auto my-5 w-5/6">
      {numberOfNotes.map((key) => {
        const heightValue = Math.round(Math.random() * (200 - 50) + 50);
        return <Skeleton key={key} height={heightValue} className="my-2" />;
      })}
    </div>
  );
}

export function ProfileLoader() {
  return (
    <Layout
    // left={<NotesLoader />}
    >
      <>
        <section className="h-60 bg-[#DDDDDD]">
          <section className="relative mx-4 flex flex-row pt-36">
            <div className="relative mx-2.5 inline-block h-48 overflow-hidden rounded-[50%] border-4 border-solid border-white shadow-md">
              <Skeleton className="inline-block rounded-[50%]" width={190} height={200} />
            </div>
            <div className="mt-28">
              <Skeleton width={100} height={20} />
              <Skeleton width={200} height={20} />
            </div>
          </section>
        </section>
        <section className="mx-12 mt-20 flex flex-row justify-between gap-6">
          <div className="mt-10">
            <Skeleton count={4} width="45vw" height={30} />
          </div>
          <div className="flex flex-col gap-5">
            <Skeleton width="6vw" height={20} />
            <Skeleton width="13vw" height={20} />
            <Skeleton count={3} width="20vw" height={20} />
            <Skeleton className="my-5" width="20vw" height={20} />
            <Skeleton count={4} width="20vw" height={30} />
          </div>
        </section>
      </>
    </Layout>
  );
}

export function ProfileMobileLoader() {
  return (
    <>
      <section className="h-52 bg-[#EBEBEB] bg-cover bg-center">
        <section className="relative mx-4 flex flex-row pt-28 ">
          <div className="relative mx-2.5 inline-block h-44 overflow-hidden rounded-[50%] border-4 border-solid border-white shadow-md">
            <Skeleton className="inline-block rounded-[50%]" width={170} height={200} />
          </div>
          <div className="mt-28">
            <Skeleton width={100} height={20} />
            <Skeleton width={200} height={20} />
          </div>
        </section>
      </section>
      <section className="mx-12 my-20 flex flex-col justify-between gap-6">
        <Skeleton className="mt-10" width={100} height={20} />
        <Skeleton count={5} height={20} />
        <Skeleton width={100} height={20} />
        <hr className="my-1" />
        <Skeleton height={20} />
        <hr className="my-1" />
        <Skeleton count={4} height={20} />
        <Skeleton width={100} height={20} />
        <Skeleton count={2} height={20} />
      </section>
    </>
  );
}
