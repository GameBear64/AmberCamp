import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/Icon';

import { MessagesContext } from '../../views/Chat';

export default function ChatBar() {
  const navigate = useNavigate();
  const { otherUser } = useContext(MessagesContext);

  return (
    <div className="sticky top-0 z-20 flex flex-row justify-between bg-base px-8 py-3 shadow-sm">
      <div className="flex flex-row items-center gap-2">
        <Icon
          styles="mr-2 pt-1 block lg:hidden align-bottom text-xl"
          onClick={() => navigate('/chat')}
          icon="arrow_back_ios_new"
        />
        <img className="h-10 w-10 rounded-full" src={`http://localhost:3030/recourse/${otherUser?.picture}?size=50`} alt="" />
        <h1 className="text-sm font-bold leading-snug text-txtPrimary">@{otherUser?.handle}</h1>
      </div>
      <Icon styles="flex items-center text-2xl" icon="settings" />
    </div>
  );
}
