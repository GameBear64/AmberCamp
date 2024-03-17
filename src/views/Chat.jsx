import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ButtonInput from '@components/Form/Inputs/ButtonInput';
import resizeScreen from '@utils/resizeScreen';
import socket from '@utils/socket';
import useFetch from '@utils/useFetch';

import Icon from '../components/Icon';
import { ChatLoader } from '../routers/loaders/ChatLoader';

export default function ChatList() {
  const screenSize = resizeScreen();
  let { id } = useParams();

  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    return () => socket.off('message');
  }, []);

  useEffect(() => {
    useFetch({ url: `conversation/${id}` }).then((data) => setChatLog(data.message.messages));
  }, [id]);

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  if (id == 2) return <ChatLoader />;

  return (
    <div className="flex h-full flex-col">
      <h1>Chat {id}</h1>
      {screenSize <= 1024 && (
        <Link to={`/chat`}>
          back to <Icon icon="home" />
        </Link>
      )}

      <ul className="grow">
        {chatLog?.map((msg) => (
          <li key={msg._id}>
            <strong className="mr-3">{msg.author.name || msg.author.handle}</strong>
            {msg.body}
          </li>
        ))}
      </ul>

      <ButtonInput actionButton={sendMessage} shouldClear btnText="Send" btnBG="bg-gray-800" btnColor="text-white" />
    </div>
  );
}
