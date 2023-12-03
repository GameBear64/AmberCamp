import { Link, useParams } from 'react-router-dom';

import { getCurrentUserId } from '@utils/utils';

export default function SeparatedList({ list }) {
  const { id } = useParams();

  return (
    <>
      {list?.length < 1 && <p> nobody here yet </p>}
      {list?.map((conversation) => {
        let conversationName = conversation?.name;
        if (conversation.type === 'Direct') {
          const otherUser = conversation.users.find((user) => user._id !== getCurrentUserId());
          conversationName = otherUser.username || otherUser.handle;
        }
        return (
          <div
            key={conversation._id}
            className={`m-2 flex justify-between border-l-4 p-1 ${
              conversation._id == id ? 'border-rose-600' : 'border-cyan-600'
            }`}>
            <Link to={`/chat/${conversation._id}`}>{conversationName}</Link>
            <button className="material-symbols-outlined">close</button>
          </div>
        );
      })}
    </>
  );
}
