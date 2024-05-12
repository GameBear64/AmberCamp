import { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '@layout';
import SeparatedList from '@components/Contacts/SeparatedList';
import Icon from '@components/Icon';

import ChatPlaceholder from '@routers/placeholders/Chat';
import { ChatType } from '@utils/enums/chat';
import useFetch from '@utils/useFetch';

export const GroupListContext = createContext({});

export default function ChatList() {
  const [messageList, setMessageList] = useState({
    direct: [],
    group: [],
  });

  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(ChatType.Direct);
  const [filteredMessages, setFilteredMessages] = useState(messageList);

  const { id } = useParams();

  useEffect(() => {
    useFetch({ url: 'conversation/list' }).then((data) => setMessageList(data));
  }, []);

  useEffect(() => {
    if (messageList?.group.length < 1) return;
    const isGroupOpened = messageList?.group.find((chat) => chat?._id == id);
    if (isGroupOpened) setCurrentList(ChatType.Group);
    setFilteredMessages(messageList);
  }, [id, messageList]);

  const onSearch = (e) => {
    if (currentList === ChatType.Direct) {
      setFilteredMessages((messages) => {
        if (currentList === ChatType.Direct) {
          return {
            group: messages.group,
            direct: messageList.direct.filter((el) => el?.participants[1]?.user?.handle?.includes(e.target.value)),
          };
        }
        return {
          group: messageList.group.filter((el) => el.name.includes(e.target.value)),
          direct: messages.direct,
        };
      });
    }
  };
  return (
    <GroupListContext.Provider value={{ setMessageList }}>
      <Layout placeholder={<ChatPlaceholder />}>
        <div className="mx-2 flex flex-col">
          <div className="mb-2 mt-3 flex w-full justify-evenly gap-2 ">
            <button
              className={`flex justify-center font-semibold text-txtPrimary ${
                currentList === ChatType.Direct && 'border-b-[3px] border-primary'
              }`}
              onClick={() => setCurrentList(ChatType.Direct)}>
              Messages
            </button>
            <button
              className={`flex justify-center font-semibold text-txtPrimary ${
                currentList === ChatType.Group && 'border-b-[3px] border-primary'
              }`}
              onClick={() => setCurrentList(ChatType.Group)}>
              Groups
            </button>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input onChange={onSearch} className="soft-input" placeholder="Search" />
            <Icon styles="btn" onClick={() => navigate('/contacts')} icon="emoji_people" />
          </div>
          {currentList === ChatType.Direct && <SeparatedList setMessageList={setMessageList} list={filteredMessages.direct} />}
          {currentList === ChatType.Group && (
            <SeparatedList setMessageList={setMessageList} type="Group" list={filteredMessages.group} />
          )}
        </div>
      </Layout>
    </GroupListContext.Provider>
  );
}
