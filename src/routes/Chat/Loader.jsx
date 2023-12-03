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
    <div className="m-10 flex flex-col gap-10">
      <MessageSkeleton {...dimensions} />
      <MessageSkeleton {...dimensions} left />
      <MessageSkeleton {...dimensions} />
      <MessageSkeleton {...dimensions} left />
      <MessageSkeleton {...dimensions} />
    </div>
  );
}

export function ChatLoaderMobile() {
  const dimensions = {
    hMax: 200,
    hMin: 100,
    wMax: 400,
    wMin: 50,
  };

  return (
    <>
      <Skeleton height={60} />
      <div className="mx-5 mt-10 flex flex-col gap-5">
        <MessageSkeleton {...dimensions} />
        <MessageSkeleton {...dimensions} left />
        <MessageSkeleton {...dimensions} />
        <MessageSkeleton {...dimensions} left />
        <MessageSkeleton {...dimensions} />
      </div>
    </>
  );
}
