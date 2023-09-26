import Skeleton from 'react-loading-skeleton';
export default function MessageSkeleton({ reverse = false, hMin, hMax, wMin, wMax }) {
  const heightValue = Math.round(Math.random() * (hMax - hMin) + hMin);
  const widthValue = Math.round(Math.random() * (wMax - wMin) + wMin);
  return (
    <div className="flex flex-row gap-2">
      {!reverse ? (
        <>
          <Skeleton width={70} circle={true} height={70} />
          <div className="flex flex-col gap-1">
            <Skeleton width={40} height={15} />
            <Skeleton width={widthValue} height={heightValue} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1 text-right">
            <Skeleton width={40} height={15} />
            <Skeleton width={widthValue} height={heightValue} />
          </div>
          <Skeleton width={70} circle={true} height={70} />
        </>
      )}
    </div>
  );
}
