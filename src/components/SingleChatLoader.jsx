import Skeleton from 'react-loading-skeleton';
export default function SingleChatLoader({ count, width }) {
  const numberOfComponents = new Array(count);

  return (
    <div>
      {numberOfComponents.map(() => {
        return (
          <>
            <div className="flex flex-row gap-2 mb-2 mt-2">
              <Skeleton width={70} circle={true} height={70} />
              <div className="flex flex-col gap-1">
                <Skeleton width={40} height={15} />
                <Skeleton width={width} height={20} />
              </div>
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
}
