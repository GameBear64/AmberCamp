import Skeleton from 'react-loading-skeleton';
export function UsersListSkeleton({ count }) {
  const numberOfComponents = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <>
      {numberOfComponents.map((key) => (
        <div key={key}>
          <div className="my-4 flex flex-row gap-2">
            <Skeleton width={50} height={50} circle={true}/>
            <div className="flex w-full flex-col gap-1">
              <Skeleton width={80} height={15} />
              <Skeleton containerClassName="flex-1" height={20} />
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}
