import { useNavigate } from 'react-router-dom';

import Icon from '../../components/Icon';

import { Status } from './slice/enums';

export default function UserCard({ contact, status = false }) {
  const navigate = useNavigate();

  return (
    <div key={contact?._id} className="flex cursor-pointer items-center border-t p-3 hover:bg-gray-100">
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
          <p className="text-sm font-bold leading-snug text-gray-900">{contact?.name || contact?.handle}</p>
          <p className="text-xs leading-snug text-gray-600">@{contact?.handle}</p>
        </div>
        {status && (
          <Icon
            icon={Status[status]}
            styles={`text-gray-700 ${status === 'blocked' ? 'bg-red-200 text-red-700' : 'bg-slate-200'} ${
              status === 'pending' && 'font-extrabold'
            } justify-center items-center rounded-full text-[17px] px-2.5 text-center flex`}
            onClick={() => status === 'friends' && navigate(`/chat/${contact?._id}`)}
          />
        )}
      </div>
    </div>
  );
}
