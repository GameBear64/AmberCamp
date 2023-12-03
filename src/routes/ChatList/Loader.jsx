import Skeleton from 'react-loading-skeleton';

import Layout from '../../components/Layout/Layout';
import { UsersListSkeleton } from '../../components/Skeleton/UsersListSkeleton';
import { ChatLoader } from '../Chat/Loader';

export function ChatListLoader() {
  return (
    <Layout
      left={
        <div className="h-full">
          <div className="m-5">
            <UsersListSkeleton count={10} width={150} />
          </div>
        </div>
      }
      right={<ChatLoader />}
    />
  );
}

export function ChatListMobileLoader() {
  return (
    <>
      <Skeleton height={60} />
      <div className="m-5">
        <UsersListSkeleton count={5} width={300} />
      </div>
    </>
  );
}
