import { useContext, useEffect, useMemo,useState } from 'react';
import { useParams } from 'react-router-dom';

import socket from '@utils/socket';
import useFetch from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

import ChatArea from '../../components/Chat/ChatArea';
import { ChatInfo } from '../ChatList/ChatList'

import ChatBar from './ChatBar';
import { ChatLoader } from './Loader';
import Message from './Message';

export default function ChatList() {
  const { id } = useParams();
  const chatList = useContext(ChatInfo);
  const [chatLog, setChatLog] = useState([]);

  const chatInfo = useMemo(() => {
    const foundDirect = chatList.direct.find(entry => entry.participants.some(({user}) => user._id === id))
    const foundGroup = chatList.group.find(entry => entry._id === id)

    if (!foundDirect && !foundGroup) return { participants: [] };

    return foundDirect || foundGroup;
  }, [id, chatList]);

  const chatBarInfo = useMemo(() => 
    chatInfo.participants.find(({user}) => user._id !== getCurrentUserId())?.user
  , [chatInfo]);

  useEffect(() => {
    socket.on('message/created', (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    return () => socket.off('message/created');
  }, []);

  useEffect(() => {
    useFetch({ url: `conversation/${id}` }).then((data) => {
      setChatLog(data?.messages || []);
    });
  }, [id]);

  const sendMessage = (data) => {
    socket.emit('message/create', {userId: id, message: data.message});
  };

  if (id == 2) return <ChatLoader />;

  return (
    <div className="flex h-full flex-col justify-between pb-5">
      <ChatBar user={chatBarInfo}/>
      <div className="flex h-full flex-col justify-between overflow-y-auto pb-8 pt-5">
        <ul className="relative flex w-full flex-col gap-2">
          {chatLog?.map((message, i) => <Message key={i} message={message} />)}
        </ul>
      </div>
      <ChatArea submitHandler={sendMessage} />
    </div>
  );
}
