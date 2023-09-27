import Skeleton from 'react-loading-skeleton';

export default function SkeletonComponent({ height, width, count, label = false }) {
  const numberOfComponents = new Array(count);
  return (
    <>
      {numberOfComponents.map((element, i) => {
        return (
          <>
            {label && <Skeleton className="mt-2" width={80} height={20} />}
            <Skeleton className={`${!label && 'mt-2'}`} key={i} width={width} height={height} />
          </>
        );
      })}
    </>
  );
}
