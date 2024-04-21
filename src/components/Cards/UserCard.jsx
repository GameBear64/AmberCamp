import { useNavigate } from 'react-router-dom';

import { Status } from '@utils/enums/contacts';

import Icon from '../Icon';

export default function UserCard({ contact, status = false }) {
  const navigate = useNavigate();
  return (
    <div key={contact?._id} className="flex cursor-pointer items-center rounded-b border-t p-3 hover:bg-base-m">
      <img
        onClick={() => navigate(`/contacts/${contact?._id}`)}
        className="h-11 w-11 rounded-full"
        src={
          contact?.picture && contact?.picture !== 'string'
            ? `http://localhost:3030/recourse/${contact?.picture}?size=50`
            : '../profilePic.jpeg'
        }
      />
      <div className="flex w-full flex-row justify-between">
        <div className="ml-2 flex flex-col" onClick={() => navigate(`/contacts/${contact?._id}`)}>
          <p className="text-sm font-bold leading-snug text-txtPrimary">{contact?.name || contact?.handle}</p>
          <p className="text-xs leading-snug text-txtSecondary">@{contact?.handle}</p>
        </div>
        {status && (
          <Icon
            icon={Status[status]}
            styles={`${status === 'blocked' ? 'bg-red-200 text-red-700' : 'bg-base-s'} ${
              status === 'pending' && 'font-extrabold'
            } justify-center items-center rounded-full text-[17px] px-2.5 text-center flex`}
            onClick={() => status === 'friends' && navigate(`/chat/${contact?._id}`)}
          />
        )}
      </div>
    </div>
  );
}
