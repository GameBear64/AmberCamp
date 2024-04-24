import Skeleton from 'react-loading-skeleton';

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
    <>
      <section className="h-60 bg-base-s">
        <section className="relative mx-4 flex flex-row pt-36">
          <div className="relative mx-2.5 inline-block size-48 overflow-hidden rounded-full border-4 border-solid border-base-m shadow-md">
            <Skeleton className="-translate-y-3" width={190} height={200} />
          </div>
          <div className="mt-28">
            <Skeleton width={100} height={20} />
            <Skeleton width={200} height={20} />
          </div>
        </section>
      </section>
      <section className="mx-12 mt-20 flex flex-col justify-between gap-6 md:flex-row">
        <div className="mt-10 flex w-full">
          <Skeleton count={4} containerClassName="flex-1" height={30} />
        </div>
        <div className="flex w-full flex-col gap-5 md:w-1/3">
          <Skeleton width={100} height={20} />
          <Skeleton count={3} containerClassName="flex-1" height={20} />
          <Skeleton className="mt-5" width={100} height={20} />
          <Skeleton count={4} containerClassName="flex-1" height={30} />
        </div>
      </section>
    </>
  );
}
