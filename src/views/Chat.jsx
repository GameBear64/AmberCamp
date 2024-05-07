import { createContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import ChatArea from '@components/Chat/ChatArea';
import ChatBar from '@components/Chat/ChatBar';
import Message from '@components/Chat/Message';

import socket from '@utils/socket';
import useFetch from '@utils/useFetch';
import { getUserId } from '@stores/user';

import { ChatLoader } from '../routers/loaders/ChatLoader';
import { setChat } from '../stores/chat';

export const MessagesContext = createContext({});

export default function Chat() {
  const { id } = useParams();
  const [chatState, setChatState] = useState([]);
  const [chatPage, setChatPage] = useState(0);

  // === TYPING STUFF ===
  const [typing, setTyping] = useState(false);
  const [typeTimeout, setTypeTimeout] = useState();

  const messages = useRef(null);
  const typingTimeout = () => setTyping(false);
  // ====================

  useEffect(() => {
    socket.on('message/created', (msg) => {
      setChatState((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
    });

    socket.on('message/deleted', (msgId) => {
      setChatState((prev) => ({ ...prev, messages: [...prev.messages.filter((msg) => msg._id != msgId)] }));
    });

    socket.on('message/edited', (msg) => {
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages.map((message) => (message._id === msg.id ? { ...message, body: msg.body } : message))],
      }));
    });

    socket.on('message/reacted', (msg) => {
      // TODO: known bug, there is no deference between users reacting
      setChatState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages.map((message) => (message._id === msg.id ? { ...message, reactions: msg.reactions } : message)),
        ],
      }));
    });

    socket.on('message/typing', (from) => {
      if (from._id != getUserId()) {
        if (typing) {
          clearTimeout(typeTimeout);
        } else {
          setTyping(from);
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
      setChatState(data);
    });
    setChat(id);
  }, [id]);

  useLayoutEffect(() => {
    messages.current.scrollTop = messages.current.scrollHeight;
  }, [chatState?.messages?.length]);

  const sendMessage = (data) => {
    socket.emit('message/create', { targetId: id, message: data.message });
  };

  if (id == 2) return <ChatLoader />;
  return (
    <MessagesContext.Provider value={{ chatState, setChatState }}>
      <div className="flex size-full flex-1 flex-col justify-between pb-5">
        {location.pathname.includes('chat') && <ChatBar />}
        <div ref={messages} className="relative flex size-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-8 pt-5">
          {chatState?.messages && (
            <InfiniteScroll
              dataLength={chatState?.messages?.length}
              next={() => {
                console.log('more');
              }}
              inverse={true}
              style={{ overflow: 'hidden' }}
              hasMore={chatState?.messages?.length < chatState.messagesCount}
              loader={<ChatLoader />}>
              {chatState.messages?.map((message, i) => (
                <Message
                  last={i > 3 && (i === chatState.messages.length - 1 || i === chatState.messages.length - 2)}
                  key={message._id}
                  message={message}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
        <ChatArea submitHandler={sendMessage} />
        {typing && <span className="absolute bottom-0 mx-5 text-sm">{typing?.handle} is typing...</span>}
      </div>
    </MessagesContext.Provider>
  );
}
