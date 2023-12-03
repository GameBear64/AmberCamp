import Skeleton from 'react-loading-skeleton';
export function UsersListSkeleton({ count, width }) {
  const numberOfComponents = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div>
      {numberOfComponents.map((key) => (
        <div key={key}>
          <div className="my-2 flex flex-row gap-2">
            <Skeleton width={70} circle={true} height={70} />
            <div className="flex flex-col gap-1">
              <Skeleton width={40} height={15} />
              <Skeleton width={width} height={20} />
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
