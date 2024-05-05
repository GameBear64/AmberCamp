import Skeleton from 'react-loading-skeleton';
function RightMessageSkeleton({ hMin, hMax }) {
  const hasMedia = Math.floor(Math.random() * 3) + 1 == 1;
  const heightValue = Math.round(Math.random() * (hMax - hMin) + hMin);

  const numberOfMessages = hasMedia ? [] : Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => i + 1);

  return (
    <div className="flex flex-row gap-2">
      <div className="flex w-full flex-col text-right">
        {/* username */}
        <Skeleton width={100} height={15} />

        {numberOfMessages.map((key) => {
          const widthValue = Math.round(Math.random() * (100 - 30) + 30);
          return <Skeleton key={key} width={`${widthValue}%`} height={15} />;
        })}

        {hasMedia && <Skeleton containerClassName="ml-auto w-full xs:w-80" height={heightValue} />}
      </div>
      {/* profile picture */}
      <Skeleton width={50} circle={true} height={50} />
    </div>
  );
}

function LeftMessageSkeleton({ hMin, hMax }) {
  const hasMedia = Math.floor(Math.random() * 5) + 1 == 1;
  const heightValue = Math.round(Math.random() * (hMax - hMin) + hMin);

  const numberOfMessages = hasMedia ? [] : Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => i + 1);

  return (
    <div className="flex flex-row gap-2">
      {/* profile picture */}
      <Skeleton width={50} circle={true} height={50} />
      <div className="flex w-full flex-col">
        {/* username */}
        <Skeleton width={100} height={15} />

        {numberOfMessages.map((key) => {
          const widthValue = Math.round(Math.random() * (90 - 30) + 30);
          return <Skeleton key={key} width={`${widthValue}%`} height={15} />;
        })}

        {hasMedia && <Skeleton containerClassName="w-full xs:w-80`" height={heightValue} />}
      </div>
    </div>
  );
}

function MessageSkeleton({ left = false, ...dimensions }) {
  return left ? <RightMessageSkeleton {...dimensions} /> : <LeftMessageSkeleton {...dimensions} />;
}

export { RightMessageSkeleton, LeftMessageSkeleton, MessageSkeleton };
