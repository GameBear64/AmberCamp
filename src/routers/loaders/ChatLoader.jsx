import Skeleton from 'react-loading-skeleton';

import { MessageSkeleton } from '../../components/Skeleton/MessageSkeleton';

export function ChatLoader() {
  const dimensions = {
    hMax: 300,
    hMin: 150,
    wMax: 500,
    wMin: 100,
  };
  return (
    <>
      <Skeleton height={60} containerClassName="lg:hidden"/>
      <div className="m-5 flex flex-col gap-10">
        <MessageSkeleton {...dimensions} />
        <MessageSkeleton {...dimensions} left />
        <MessageSkeleton {...dimensions} />
        <MessageSkeleton {...dimensions} left />
        <MessageSkeleton {...dimensions} />
      </div>
    </>
  );
}
