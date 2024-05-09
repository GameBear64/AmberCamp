import { useState } from 'react';
import { useEffect } from 'react';

import GroupCard from '@components/Cards/GroupCard';
import UserCard from '@components/Cards/UserCard';
import CreateGroup from '@components/Contacts/CreateGroup';

import socket from '@utils/socket';
import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';

export default function SeparatedList({ list, type = 'Direct', setMessageList }) {
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    useFetch({ url: 'user/friend/list' }).then((res) => setFriends(res.contacts));

    socket.on('group/created', (group) => {
      setMessageList((prev) => ({ ...prev, group: [...prev.group, group] }));
    });
    return () => {
      socket.off('group/created');
    };
  }, []);

  const conversations = list?.map((conversation) => {
    if (conversation.type === 'Direct') {
      const otherUser = conversation.participants.find(({ user }) => user._id !== getUserId());
      return <UserCard contact={otherUser?.user} status="friends" key={conversation._id} />;
    }
    return <GroupCard key={conversation._id} group={conversation} />;
  });

  return (
    <>
      {type === 'Group' && (
        <button onClick={() => setShowModal(!showModal)} className="btn my-5">
          Create a new group
        </button>
      )}
      {showModal && <CreateGroup friends={friends} setShowModal={setShowModal} />}
      {conversations}
    </>
  );
}
