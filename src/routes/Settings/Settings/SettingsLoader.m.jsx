import Skeleton from 'react-loading-skeleton';

export default function SettingsMobileLoader() {
  return (
    <>
      <Skeleton className="mb-10" height={60} />
      <div className="mx-10">
        <div className="flex flex-col gap-5">
          <Skeleton width={90} height={25} />
          <hr />
          <Skeleton width={90} height={25} />
          <hr />
          <Skeleton width={90} height={25} />
          <hr />
          <Skeleton width={90} height={25} />
        </div>
      </div>
    </>
  );
}
