import { useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import Icon from '@components/Icon';

import { getUserId } from '@stores/user';
import { $user } from '@stores/user';

import Modal from '../../components/Modal';
import RoundButton from '../../components/RoundButton';
import socket from '../../utils/socket';
import { MessagesContext } from '../../views/Chat';

export default function ChatBar() {
  const { chatState } = useContext(MessagesContext);
  const navigate = useNavigate();
  const user = useStore($user);

  const [leaveGroupModal, setLeaveGroupModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);

  const otherUser = useMemo(
    () => chatState.participants?.find(({ user }) => user._id !== getUserId())?.user,
    [chatState?.participants]
  );

  const isOwner = chatState.participants?.find(
    (participant) => participant.user._id === user.id && participant.groupOwner === true
  );

  const deleteGroup = () => {
    socket.emit('group/delete', { groupId: chatState._id, color: chatState.color, icon: chatState.icon, name: chatState.name });
  };

  useEffect(() => {
    socket.on('group/deleted', () => {
      setDeleteGroupModal(false);
      navigate('/chat');
    });
    return () => socket.off('group/deleted');
  }, []);

  return (
    <div className="sticky top-0 flex w-full flex-row items-center gap-2 bg-base px-8 py-3 shadow-sm">
      <Icon styles="mr-2 pt-1 block md:hidden align-bottom text-xl" onClick={() => navigate('/chat')} icon="arrow_back_ios_new" />
      {chatState.participants?.length == 2 && (
        <>
          <img className="size-10 rounded-full" src={`http://localhost:3030/recourse/${otherUser?.picture}?size=50`} alt="" />
          <h1 className="text-sm font-bold leading-snug text-txtPrimary">@{otherUser?.handle}</h1>
        </>
      )}
      {chatState.participants?.length > 2 && (
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row items-center">
            <Icon icon={chatState.icon} styles={`accent-circle size-10 text-base-x ${chatState.color}`} />
            <h1 className="mx-2 font-bold leading-snug text-txtPrimary">{chatState.name}</h1>
          </div>
          {isOwner ? (
            <RoundButton onClick={() => setDeleteGroupModal(true)} icon={'delete'} colors="bg-red-500" />
          ) : (
            <RoundButton onClick={() => setLeaveGroupModal(true)} icon={'logout'} colors="bg-base-s" />
          )}
        </div>
      )}
      {leaveGroupModal && (
        <Modal easyClose title="Leave group" closeFunction={() => setLeaveGroupModal(false)}>
          <div className="flex flex-col gap-2">
            <p>Are you sure you want to leave this group?</p>
            <div className="flex flex-row justify-end gap-4" key="buttons">
              <button className="plain-btn" onClick={() => setLeaveGroupModal(false)}>
                Cancel
              </button>
              <button className="reject-btn">Leave</button>
            </div>
          </div>
        </Modal>
      )}
      {deleteGroupModal && (
        <Modal easyClose title="Delete group" closeFunction={() => setDeleteGroupModal(false)}>
          <div className="flex flex-col gap-2">
            <p>Are you sure you want to delete this group?</p>
            <div className="flex flex-row justify-end gap-4" key="buttons">
              <button className="plain-btn" onClick={() => setDeleteGroupModal(false)}>
                Cancel
              </button>
              <button className="reject-btn" onClick={deleteGroup}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
