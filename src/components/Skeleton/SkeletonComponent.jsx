import Skeleton from 'react-loading-skeleton';

export default function SkeletonComponent({ height, width, count, ...rest }) {
  let numberOfComponents = [];
  for (let i = 0; i < count; i++) {
    numberOfComponents.push(i);
  }

  return (
    <>
      {numberOfComponents.map((element, i) => {
        return <Skeleton className="m-2" key={i} duration={1} width={width} height={height} />;
      })}
    </>
  );
}
