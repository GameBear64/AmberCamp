import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '@layout';

import SeparatedList from '@components/Layout/SeparatedList';

import { ChatType } from '@utils/enums/chat';
import useFetch from '@utils/useFetch';

export default function ChatList() {
  const [messageList, setMessageList] = useState({
    direct: [],
    group: [],
  });
  // const [data, setData] = useState(list);
  // useEffect(() => {
  //   setData(list);
  // }, [list]);
  const users = (e) => {
    messageList.direct?.map((el) => {
      const participants = el.participants;
      const filteredUsers = participants?.filter((t) => t.user.handle.includes(e));
      return filteredUsers;
    });
  };
  // const onSearch = (e) => setData(list?.filter((el) => el.handle.includes(e.target.value)));
  const onSearch = (e) =>
    setMessageList((messages) => {
      return {
        group: messages.group,
        direct: users(e.value),
      };
    });
  // console.log(messageList);

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

  return (
    <Layout>
      <div className="mx-2 flex flex-col">
        <div className="mb-2 flex w-full justify-evenly ">
          <button
            className={`m-2 flex justify-center text-[16px] font-semibold text-txtPrimary ${
              currentList === ChatType.Direct && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Direct)}>
            Messages
          </button>
          <button
            className={`m-2 flex justify-center text-[16px] font-semibold text-txtPrimary ${
              currentList === ChatType.Group && 'border-b-[3px] border-primary'
            }`}
            onClick={() => setCurrentList(ChatType.Group)}>
            Groups
          </button>
        </div>
        <input
          onChange={onSearch}
          className="my-4 h-10 w-full rounded-lg bg-base-m px-5 text-sm text-txtPrimary focus:outline-none lg:max-w-md"
          placeholder="Search"
        />
        {currentList === ChatType.Direct && <SeparatedList list={messageList.direct} />}
        {currentList === ChatType.Group && <SeparatedList list={messageList.group} />}

        <a href="http://localhost:3030/api-docs/#/" target="_blank" rel="noreferrer" className="mt-10">
          API Documentation
        </a>
      </div>
    </Layout>
  );
}
