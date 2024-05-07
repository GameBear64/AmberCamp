import { useState } from 'react';
import { useEffect } from 'react';

import GroupCard from '@components/Cards/GroupCard';
import UserCard from '@components/Cards/UserCard';
import CreateGroup from '@components/Contacts/CreateGroup';

import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';

export default function SeparatedList({ list, type = 'Direct' }) {
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setFriends(res.contacts));
  }, []);

  const conversations = list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({ user }) => user._id !== getUserId());
      return <UserCard contact={otherUser?.user} status="friends" key={conversation._id} />;
    } else {
      return (
        <GroupCard
          key={conversation._id}
          participants={conversation.participants.length}
          title={conversation.name}
          color={conversation.color}
          icon={conversation.icon}
        />
      );
    }
  });

  return (
    <>
      {type === 'Group' && (
        <button onClick={() => setShowModal(!showModal)} className="btn my-5">
          Create a new group
        </button>
      )}
      {showModal && <CreateGroup friends={friends} setShowModal={setShowModal} setFriends={setFriends} />}
      {conversations}
    </>
  );
}
