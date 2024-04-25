import Skeleton from 'react-loading-skeleton';

export function LoginLoader() {
  const numberOfFields = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="flex flex-row justify-between">
      <div className="m-auto flex h-screen items-center justify-center text-center">
        <div className="flex flex-col">
          <Skeleton className="my-4" height={30} width={200} />
          {numberOfFields.map((key) => (
            <div key={key} className="flex flex-col">
              <Skeleton containerClassName="mr-auto" height={10} width={200} />
              <Skeleton height={40} width={410} />
            </div>
          ))}
          <Skeleton className="my-4" height={40} width={410} />
          <div className="text-right">
            <Skeleton className="text-right" height={20} width={150} />
          </div>
        </div>
      </div>
      <Skeleton width="50vw" containerClassName="hidden md:block" className="h-screen" />
    </div>
  );
}
