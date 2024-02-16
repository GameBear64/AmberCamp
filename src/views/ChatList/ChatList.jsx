import { createContext, useEffect, useState} from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Layout from '@layout';
import useFetch from '@utils/useFetch';

import { ChatType } from '../Chat/slices/enums';

import SeparatedList from './SeparatedList';

export const ChatInfo = createContext()

export default function ChatList() {
  const [messageList, setMessageList] = useState({
    direct: [],
    group: []
  });
  const [currentList, setCurrentList] = useState(ChatType.Direct);

  let { id } = useParams();

  useEffect(() => {
    useFetch({ url: 'conversation/list' }).then(data => setMessageList(data));
  }, []);

  useEffect(() => {
    if (messageList.group.length < 1) return; 

    const isGroupOpened = messageList.group.find((chat) => chat?._id == id);
    if (isGroupOpened) setCurrentList(ChatType.Group);
  }, [id, messageList]);

  return (
    <Layout
      left={
        <div className="chats mx-2 flex flex-col">
          <div className="mb-2 flex w-full justify-evenly ">
            <button
              className={`m-2 flex justify-center text-[16px] font-semibold ${
                currentList === ChatType.Direct && 'border-b-[3px] border-yellow-400'
              }`}
              onClick={() => setCurrentList(ChatType.Direct)}>
              Messages
            </button>
            <button
              className={`m-2 flex justify-center text-[16px] font-semibold ${
                currentList === ChatType.Group && 'border-b-[3px] border-yellow-400'
              }`}
              onClick={() => setCurrentList(ChatType.Group)}>
              Groups
            </button>
          </div>
          <input
            className="my-2 h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
            placeholder="Search"
          />
          {currentList === ChatType.Direct && <SeparatedList list={messageList.direct} />}
          {currentList === ChatType.Group && <SeparatedList list={messageList.group} />}

          {/* <UserCard contact={user} status="friends" />
          <UserCard contact={user} status="friends" />
          <UserCard contact={user} status="friends" />
          <UserCard contact={user} status="friends" /> */}
          {/* <Link className="mt-10" to={`/chat`}>
            no chat
          </Link> */}
          {/* <Link to={`/chat/651c0636b4df32649f187034`}>
            go to <Icon icon="chat_bubble" />
          </Link>
          <Link to={`/chat/2`}>
            go to <Icon icon="chat_bubble" />
          </Link> */}
          <a href="http://localhost:3030/api-docs/#/" target="_blank" rel="noreferrer" className="mt-10">
            API Documentation
          </a>
        </div>
      }
      right={
        <ChatInfo.Provider value={ messageList } >
          <Outlet />
        </ChatInfo.Provider>
      }
    />
  );
}
