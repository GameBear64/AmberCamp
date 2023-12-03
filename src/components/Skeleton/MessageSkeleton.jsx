import Skeleton from 'react-loading-skeleton';
function RightMessageSkeleton({ hMin, hMax, wMin, wMax }) {
  const hasMedia = Math.floor(Math.random() * 3) + 1 == 1;
  const heightValue = Math.round(Math.random() * (hMax - hMin) + hMin);

  const numberOfMessages = hasMedia ? [] : Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => i + 1);

  return (
    <div className="flex flex-row gap-2 self-end">
      <div className="flex flex-col gap-1 text-right">
        {/* username */}
        <Skeleton width={100} height={15} />

        {numberOfMessages.map((key) => {
          const widthValue = Math.round(Math.random() * (wMax - wMin) + wMin);
          return <Skeleton key={key} width={widthValue} height={15} />;
        })}

        {hasMedia && <Skeleton width={300} height={heightValue} />}
      </div>
      {/* profile picture */}
      <Skeleton width={60} circle={true} height={60} />
    </div>
  );
}

function LeftMessageSkeleton({ hMin, hMax, wMin, wMax }) {
  const hasMedia = Math.floor(Math.random() * 5) + 1 == 1;
  const heightValue = Math.round(Math.random() * (hMax - hMin) + hMin);

  const numberOfMessages = hasMedia ? [] : Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => i + 1);

  return (
    <div className="flex flex-row gap-2">
      {/* profile picture */}
      <Skeleton width={60} circle={true} height={60} />
      <div className="flex flex-col gap-1">
        {/* username */}
        <Skeleton width={100} height={15} />

        {numberOfMessages.map((key) => {
          const widthValue = Math.round(Math.random() * (wMax - wMin) + wMin);
          return <Skeleton key={key} width={widthValue} height={15} />;
        })}

        {hasMedia && <Skeleton width={300} height={heightValue} />}
      </div>
    </div>
  );
}

function MessageSkeleton({ left = false, ...dimensions }) {
  return left ? <RightMessageSkeleton {...dimensions} /> : <LeftMessageSkeleton {...dimensions} />;
}

export { RightMessageSkeleton, LeftMessageSkeleton, MessageSkeleton };
