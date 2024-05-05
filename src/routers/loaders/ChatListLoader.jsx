import Skeleton from 'react-loading-skeleton';

import Layout from '@layout';
import { UsersListSkeleton } from '@components/Skeleton/UsersListSkeleton';

export function ChatListLoader() {
  return (
    <Layout>
      <Skeleton height={60} />
      <Skeleton height={20} />
      <div className="m-5">
        <UsersListSkeleton count={5} />
      </div>
    </Layout>
  );
}
