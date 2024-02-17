import { getUserId } from '@stores/user';

import UserCard from '../Contacts/UserCard';

// NOTE: check history, components are just functions
export default function SeparatedList({ list }) {
  if (list?.length < 1) return <p> nobody here yet </p>

  return list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({user}) => user._id !== getUserId());
      return <UserCard contact={otherUser.user} status="friends" key={conversation._id}/>;
    } else {
      return <UserCard contact={{/* TODO idk tbh, ill ask tedi*/}} status="friends" key={conversation._id}/>;
    }
  });
}
