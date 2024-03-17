import { createContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatArea from '@components/Chat/ChatArea';
import ChatBar from '@components/Chat/ChatBar';
import Message from '@components/Chat/Message';

import { getUserId } from '@stores/user';
import socket from '@utils/socket';
import useFetch from '@utils/useFetch';

import Icon from '../components/Icon';
import { ChatLoader } from '../routers/loaders/ChatLoader';

export const MessagesContext = createContext({});

export default function Chat() {
  const { id } = useParams();
  const [chatLog, setChatLog] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  // === TYPING STUFF ===
  const [typing, setTyping] = useState(false);
  const [typeTimeout, setTypeTimeout] = useState();

  const typingTimeout = () => setTyping(false);
  // ====================

  const otherUser = useMemo(() => chatUsers.find(({ user }) => user._id !== getUserId())?.user, [chatUsers]);

  useEffect(() => {
    socket.on('message/created', (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    socket.on('message/deleted', (msgId) => {
      setChatLog((prev) => prev.filter((msg) => msg._id != msgId));
    });

    socket.on('message/edited', (msg) => {
      setChatLog((prev) => prev.map((message) => (message._id === msg.id ? { ...message, body: msg.body } : message)));
    });

    socket.on('message/reacted', (msg) => {
      // TODO: known bug, there is no deference between users reacting
      setChatLog((prev) => prev.map((message) => (message._id === msg.id ? { ...message, reactions: msg.reactions } : message)));
    });

    socket.on('message/typing', (from) => {
      if (from == otherUser?._id) {
        if (typing) {
          clearTimeout(typeTimeout);
        } else {
          setTyping(true);
        }
        setTypeTimeout(setTimeout(typingTimeout, 5000));
      }
    });

    return () => {
      socket.off('message/created');
      socket.off('message/deleted');
      socket.off('message/edited');
      socket.off('message/reacted');
      socket.off('message/typing');
    };
  }, []);

  useEffect(() => {
    useFetch({ url: `conversation/${id}` }).then((data) => {
      setChatLog(data?.messages || []);
      setChatUsers(data.participants);
    });
  }, [id]);

  const sendMessage = (data) => {
    socket.emit('message/create', { userId: id, message: data.message });
  };

  if (id == 2) return <ChatLoader />;

  return (
    <MessagesContext.Provider value={{ chatLog, setChatLog, otherUser }}>
      <div className="flex h-full flex-col justify-between pb-5">
        <ChatBar />
        <div className="flex h-full flex-col justify-between overflow-y-auto pb-8 pt-5">
          <ul className="relative flex w-full flex-col gap-2">
            {chatLog?.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </ul>
        </div>
        <ChatArea submitHandler={sendMessage} />
        {typing && <span>{otherUser.handle} is typing...</span>}
      </div>
    </MessagesContext.Provider>
  );
}
