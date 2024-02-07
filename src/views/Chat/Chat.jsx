import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import socket from '@utils/socket';
import useFetch from '@utils/useFetch';

import { messages } from './slices/enums';
import ChatArea from './ChatArea';
import ChatBar from './ChatBar';
import { ChatLoader } from './Loader';
import Message from './Message';

export default function ChatList() {
  let { id } = useParams();
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setChatLog((prev) => [...prev, msg.message]);
    });

    return () => socket.off('message');
  }, []);

  useEffect(() => {
    useFetch({ url: `conversation/651c0636b4df32649f187034` }).then((data) => {
      setChatLog(data?.messages || []);
    });
  }, [id]);

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  if (id == 2) return <ChatLoader />;

  return (
    <div className="flex h-full flex-col justify-between pb-5">
      <ChatBar
        user={{
          user: 'momo',
          img: 'https://i1.sndcdn.com/artworks-cZKUJX6BqGAgx1FZ-AyLpLQ-t500x500.jpg',
        }}
      />
      <div className="flex h-full flex-col justify-between overflow-y-auto pb-8 pt-5">
        <ul className="relative flex w-full flex-col gap-2">
          {messages.map((message, i) => (
            <Message last={i <= 1} key={i} message={message} />
          ))}
        </ul>
      </div>
      <ChatArea onKeyDown={(e) => e.code === 'Enter' && sendMessage('hi')} onClick={() => sendMessage('hi')} />
    </div>
  );
}
