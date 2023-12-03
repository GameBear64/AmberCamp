import Skeleton from 'react-loading-skeleton';

export function LoginMobileLoader() {
  return (
    <div className="m-auto flex h-screen items-center justify-center text-center">
      <div className="flex flex-col">
        <Skeleton className="mb-4" height={40} width={200} />
        <Skeleton className="my-2" count={3} height={40} width={410} />
        <div className="text-right">
          <Skeleton className="text-right" height={20} width={150} />
        </div>
      </div>
    </div>
  );
}

export function LoginLoader() {
  return (
    <div className="flex flex-row justify-between">
      <LoginMobileLoader />
      <Skeleton width="50vw" className="h-screen" />
    </div>
  );
}
