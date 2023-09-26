import Skeleton from 'react-loading-skeleton';

import MessageSkeleton from '../../components/MessageSkeleton/MessageSkeleton';
export default function ChatMobileLoader() {
  return (
    <>
      <Skeleton height={60} />
      <div className="mt-10 mx-5 flex flex-col gap-5">
        <MessageSkeleton hMax={120} hMin={50} wMax={230} wMin={150} />
        <div className="flex self-end">
          <MessageSkeleton hMax={120} hMin={50} wMax={230} wMin={150} reverse={true} />
        </div>
        <MessageSkeleton hMax={120} hMin={50} wMax={230} wMin={150} />
        <div className="flex self-end">
          <MessageSkeleton hMax={120} hMin={50} wMax={230} wMin={150} reverse={true} />
        </div>
      </div>
    </>
  );
}
