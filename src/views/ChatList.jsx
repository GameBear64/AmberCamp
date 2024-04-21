import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '@layout';
import SeparatedList from '@components/Contacts/SeparatedList';
import Icon from '@components/Icon';

import ChatPlaceholder from '@routers/placeholders/Chat';
import { ChatType } from '@utils/enums/chat';
import socket from '@utils/socket';
import useFetch from '@utils/useFetch';

export default function ChatList() {
  const [messageList, setMessageList] = useState({
    direct: [],
    group: [],
  });
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(ChatType.Direct);

  const { id } = useParams();

  useEffect(() => {
    useFetch({ url: 'conversation/list' }).then((data) => setMessageList(data));
  }, []);

  useEffect(() => {
    if (messageList.group.length < 1) return;
    const isGroupOpened = messageList.group.find((chat) => chat?._id == id);
    if (isGroupOpened) setCurrentList(ChatType.Group);
  }, [id, messageList]);

  const onSearch = (e) => {
    setMessageList((messages) => {
      return {
        group: messages.group,
        direct: messages.direct.filter((el) => {
          return el.participants[1].user.name.includes(e.target.value);
        }),
      };
    });
  };

  const testCreate = () => {
    socket.emit('group/create', {
      title: 'new group',
      participants: ['64eeff959d98879f70171f68', '64eeff959d98879f70171f68', '64eeff959d98879f70171f68'],
      color: 'dfgs',
      icon: 'dfghjk',
    });
  };

  return (
    <Layout placeholder={<ChatPlaceholder />}>
      <div className="mx-2 flex flex-col">
        <div className="mb-2 flex w-full justify-evenly ">
          <button
            className={`m-2 flex justify-center text-base font-semibold text-txtPrimary ${
              currentList === ChatType.Direct && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Direct)}>
            Messages
          </button>
          <button
            className={`m-2 flex justify-center text-base font-semibold text-txtPrimary ${
              currentList === ChatType.Group && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Group)}>
            Groups
          </button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            onChange={onSearch}
            className="my-4 h-10 w-full rounded-lg bg-base-m px-5 text-sm text-txtPrimary focus:outline-none lg:max-w-md"
            placeholder="Search"
          />
          <Icon styles="btn" onClick={() => navigate('/contacts')} icon="emoji_people" />
        </div>
        <button className="btn my-4" onClick={testCreate}>
          click
        </button>
        {currentList === ChatType.Direct && <SeparatedList list={messageList.direct} />}
        {currentList === ChatType.Group && <SeparatedList list={messageList.group} />}
      </div>
    </Layout>
  );
}
