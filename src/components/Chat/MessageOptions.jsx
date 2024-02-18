import { useContext } from 'react';

import Dropdown from '@components/Dropdown/Dropdown';

import { successSnackBar } from '@utils/snackbars';
import socket from '@utils/socket';

import { MessagesContext } from '../../views/Chat/Chat';
import { reactions } from '../../views/Chat/slices/enums';

export default function MessageOptions({ id, setEditMode }) {
  const {chatLog} = useContext(MessagesContext);

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

  return (
    <div>
      <div className="flex flex-row gap-1.5">
        <Dropdown stylesDropdown="flex" options={reactions} />
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
