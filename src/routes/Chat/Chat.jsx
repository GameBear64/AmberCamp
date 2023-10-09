import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ButtonInput from '@components/Form/Inputs/ButtonInput';
import resizeScreen from '@utils/resizeScreen';
import socket from '@utils/socket';

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

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  return (
    <div className="flex h-full flex-col">
      <h1>Chat {id}</h1>
      {screenSize <= 1024 && (
        <Link to={`/chat`}>
          back to <span className="material-icons">home</span>
        </Link>
      )}

      <ul className="grow">
        {chatLog.map(({ user, message }, i) => (
          <li key={i}>
            <strong className="mr-3">{user}</strong>
            {message}
          </li>
        ))}
      </ul>

      <ButtonInput actionButton={sendMessage} shouldClear btnText="Send" btnBG="bg-gray-800" btnColor="text-white" />
    </div>
  );
}
