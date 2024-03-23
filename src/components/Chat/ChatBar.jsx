import { useContext } from 'react';

import Icon from '@components/Icon';

import { MessagesContext } from '../../views/Chat';

export default function ChatBar() {
  const { otherUser } = useContext(MessagesContext);

  return (
    <div className="sticky top-0 z-20 flex flex-row justify-between bg-base px-8 py-3 shadow-sm">
      <div className="flex flex-row items-center gap-2">
        <img className="h-10 w-10 rounded-full" src={`http://localhost:3030/recourse/${otherUser?.picture}?size=50`} alt="" />
        <h1 className="text-sm font-bold leading-snug text-txtPrimary">@{otherUser?.handle}</h1>
      </div>
      <h1 className="text-2xl font-semibold"></h1>
      <Icon styles="flex items-center text-2xl" icon="settings" />
    </div>
  );
}
