import { useContext } from 'react';

import Dropdown from '@components/Dropdown/Dropdown';

import { successSnackBar } from '@utils/snackbars';
import socket from '@utils/socket';

import { MessagesContext } from '../../views/Chat';

export default function MessageOptions({ id, setEditMode }) {
  const { chatLog } = useContext(MessagesContext);

  const editMessage = () => {
    setEditMode((prev) => !prev);
  };

  const copyText = () => {
    const msg = chatLog?.find((m) => m._id == id);
    navigator.clipboard.writeText(msg.body);
    successSnackBar('Message copied!');
  };

  const deleteMessage = () => {
    socket.emit('message/delete', id);
  };

  const addReaction = (emoji, color) => {
    socket.emit('message/react', { messageId: id, emoji, color });
  };

  return (
    <div className="flex">
      <div className="flex flex-row gap-1.5">
        <Dropdown
          stylesDropdown="flex"
          options={[
            { icon: 'add', color: 'bg-slate-100' },
            {
              icon: 'favorite',
              iconColor: 'text-rose-700',
              color: 'bg-rose-100',
              action: () => addReaction('favorite', 'pink'),
            },
            {
              icon: 'thumb_up',
              color: 'bg-blue-100',
              iconColor: 'text-blue-700',
              action: () => addReaction('thumb_up', 'lime'),
            },
            {
              icon: 'thumb_down',
              color: 'bg-red-100',
              iconColor: 'text-red-700',
              action: () => addReaction('thumb_down', 'red'),
            },
          ]}
        />
        <Dropdown
          options={[
            {
              text: 'Edit Message',
              icon: 'edit',
              styles: 'text-txtPrimary',
              color: 'bg-base-s',
              action: editMessage,
            },
            {
              text: 'Copy Text',
              icon: 'content_copy',
              color: 'bg-base-s',
              styles: 'text-txtPrimary',
              action: copyText,
            },
            {
              text: 'Mark Unread',
              icon: 'mark_email_unread',
              styles: 'text-txtPrimary',
              color: 'bg-base-s',
            },
            {
              text: 'Delete Message',
              icon: 'cancel',
              color: 'bg-red-500',
              styles: 'text-txtPrimary',
              action: deleteMessage,
            },
          ]}
          stylesOptions="flex flex-row items-center justify-between gap-3 rounded text-slate-800"
          stylesDropdown="rounded bg-white font-semibold text-slate-800"
        />
      </div>
    </div>
  );
}
