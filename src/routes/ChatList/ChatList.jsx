import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import Layout from '@layout';
import { useFetch } from '@utils/useFetch';

import SeparatedList from './SeparatedList';

const ChatType = Object.freeze({
  Direct: 'Direct',
  Group: 'Group',
});

export default function ChatList() {
  const [messageList, setMessageList] = useState({});
  const [currentList, setCurrentList] = useState(ChatType.Direct);

  let { id } = useParams();

  useEffect(() => {
    useFetch({ url: 'conversation/list' }).then(({ message }) => setMessageList(message));
  }, []);

  useEffect(() => {
    const isGroupOpened = messageList?.group?.find((chat) => chat._id == id);
    if (isGroupOpened) setCurrentList(ChatType.Group);
  }, [id, messageList]);

  return (
    <Layout
      left={
        <div className="chats flex flex-col">
          <div className="my-2 flex w-full justify-evenly border-2">
            <button
              className={`material-symbols-outlined p-2 ${currentList === ChatType.Direct ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ChatType.Direct)}>
              chat_bubble
            </button>
            <button
              className={`material-symbols-outlined p-2 ${currentList === ChatType.Group ? 'bg-neutral-200' : ''}`}
              onClick={() => setCurrentList(ChatType.Group)}>
              forum
            </button>
          </div>

          {currentList === ChatType.Direct && <SeparatedList list={messageList.direct} />}
          {currentList === ChatType.Group && <SeparatedList list={messageList.group} />}

          <Link className="mt-10" to={`/chat`}>
            no chat
          </Link>
          <Link to={`/chat/1`}>
            go to <span className="material-icons">chat_bubble</span>
          </Link>
          <Link to={`/chat/2`}>
            go to <span className="material-icons">chat_bubble</span>
          </Link>
          <a href="http://localhost:3030/api-docs/#/" target="_blank" rel="noreferrer" className="mt-10">
            API Documentation
          </a>
        </div>
      }
      right={<Outlet />}
    />
  );
}
