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
    const msg = chatLog?.find(m => m._id == id)
    navigator.clipboard.writeText(msg.body)
    successSnackBar('Message copied!')
  }

  const deleteMessage = () => {
    socket.emit('message/delete', id);
  };

  const addReaction = (emoji, color) => {
    socket.emit('message/react', {messageId: id, emoji, color });
  }

  return (
    <div>
      <div className="flex flex-row gap-1.5">
        <Dropdown
          stylesDropdown="flex"
          options={[
            { icon: 'add', color: 'bg-slate-100' },
            { icon: 'favorite', iconColor: 'text-red-700', color: 'bg-slate-100', action: () => addReaction('favorite', 'pink') },
            { icon: 'thumb_up', color: 'bg-slate-100', iconColor: 'text-yellow-600', action: () => addReaction('thumb_up', 'lime') },
            { icon: 'thumb_down', color: 'bg-slate-100', action: () => addReaction('thumb_down', 'red') },
          ]} 
        />
        <Dropdown
          options={[
            {
              text: 'Edit Message',
              icon: 'edit',
              color: 'bg-slate-100',
              action: editMessage,
            },
            {
              text: 'Copy Text',
              icon: 'content_copy',
              color: 'bg-slate-100',
              action: copyText
            },
            {
              text: 'Mark Unread',
              icon: 'mark_email_unread',
              color: 'bg-slate-100',
            },
            {
              text: 'Delete Message',
              icon: 'cancel',
              color: 'bg-red-100',
              styles: 'text-red-500',
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
