import Skeleton from 'react-loading-skeleton';

import SingleChatLoader from '../../components/SingleChatLoader';
export default function ChatListMobileLoader() {
  return (
    <>
      <Skeleton height={60} />
      <div className="mx-10 my-10">
        <SingleChatLoader count={5} width={300} />
      </div>
    </>
  );
}
