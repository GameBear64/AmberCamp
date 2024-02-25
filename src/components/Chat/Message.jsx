import { useState } from 'react';

import socket from '@utils/socket';

import Icon from '../Icon';

import ChatArea from './ChatArea';
import MessageOptions from './MessageOptions';

export default function Message({ message }) {
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const editMessage = (data) => {
    setEditMode(false);
    socket.emit('message/edit', { id: message._id, body: data.message });
  };

  return (
    <li className="group mr-1 flex w-full flex-row px-8 py-2 hover:bg-gray-100">
      <img
        className="h-11 w-11 rounded-full"
        src={`http://localhost:3030/recourse/${message.author.picture}?size=50`}
        alt="profile_picture"
      />
      <div className="relative ml-2 flex w-full flex-row gap-2">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <p className="text-sm font-bold leading-snug text-gray-900">{message.author.handle}</p>
            <p className="text-sm font-normal leading-snug text-gray-600">{message?.createdAt}</p>
          </div>
          {!editMode && <p className="text-md w-full max-w-[65em] break-all leading-snug text-gray-600">{message?.body}</p>}
          {editMode && <ChatArea submitHandler={editMessage} defaultValue={message?.body} />}
        <div className='flex'>
          {message.reactions.map(reaction => (
            <Icon
              key={reaction._id}
              // TODO: known bug, will be fixed with the introduction of themes, extract emojis into classes
              styles={`bg-slate-50 px-2 flex font-semibold text-${reaction.color}-500`}
              icon={reaction.emoji}
            />
          ))}
        </div>
        </div>
        <div className="flex h-full items-center">
          <Icon
            onClick={() => setShowMenu(!showMenu)}
            styles="text-xl hidden group-hover:block shadow-primary rounded bg-slate-50 px-2 flex font-semibold"
            icon="more_horiz"
          />
        </div>
        {/*TODO: ${last && 'top-0'} lets not use props for this, reduce variables*/}
        <div onMouseLeave={() => setShowMenu(false)} className={`absolute bottom-1 right-0 top-0 z-20`}>
          {showMenu && <MessageOptions id={message._id} setEditMode={setEditMode} />}
        </div>
      </div>
    </li>
  );
}
