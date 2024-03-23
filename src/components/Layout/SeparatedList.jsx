import UserCard from '@components/Cards/UserCard';

import { getUserId } from '@stores/user';

export default function SeparatedList({ list }) {
  if (list?.length < 1) return <p className="text-txtPrimary"> nobody here yet </p>;

  return list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({ user }) => user._id !== getUserId());
      return <UserCard contact={otherUser.user} status="friends" key={conversation._id} />;
    } else {
      return (
        <UserCard
          contact={
            {
              /* TODO idk tbh, ill ask tedi*/
            }
          }
          status="friends"
          key={conversation._id}
        />
      );
    }
  });
}
