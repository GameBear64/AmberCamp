import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Layout from '@layout';
import Icon from '@components/Icon';
import SeparatedList from '@components/Layout/SeparatedList';

import ChatPlaceholder from '@routers/placeholders/Chat'
import useFetch from '@utils/useFetch';

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
    <Layout placeholder={<ChatPlaceholder/>}>
      <div className="mx-2 flex flex-col">
        <div className="mb-2 flex w-full justify-evenly ">
          <button
            className={`m-2 flex justify-center font-semibold ${
              currentList === ChatType.Direct && 'border-b-2 border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Direct)}>
            Messages
          </button>
          <button
            className={`m-2 flex justify-center font-semibold ${
              currentList === ChatType.Group && 'border-b-2 border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Group)}>
            Groups
          </button>
        </div>
        <input className="input" placeholder="Search"/>
        {currentList === ChatType.Direct && <SeparatedList list={messageList?.direct} />}
        {currentList === ChatType.Group && <SeparatedList list={messageList?.group} />}

        <Link className="mt-10" to={`/chat`}>
          no chat
        </Link>
        <Link to={`/chat/1`}>
          go to <Icon icon="chat_bubble" />
        </Link>
        <Link to={`/chat/2`}>
          go to <Icon icon="chat_bubble" />
        </Link>
        <a href="http://localhost:3030/api-docs/#/" target="_blank" rel="noreferrer" className="mt-10">
          API Documentation
        </a>
      </div>
    </Layout>
  );
}
