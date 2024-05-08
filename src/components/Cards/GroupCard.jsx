import { useNavigate } from 'react-router-dom';

import Icon from '../Icon';

export default function GroupCard({ group }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full cursor-pointer items-center rounded-b border-t p-3 hover:bg-base-m">
      <span
        className={`accent-circle rounded-full p-2 ${group.color} material-symbols-rounded cursor-pointer text-2xl text-base-x`}>
        {group.icon}
      </span>
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="ml-2 flex flex-1 flex-col">
          <p className="text-sm font-bold leading-snug text-txtPrimary">{group.name}</p>
          <p className="text-xs leading-snug text-txtSecondary">{group.participants.length} participants</p>
        </div>

        <Icon
          onClick={() => navigate(`/chat/${group._id}`)}
          icon={'chat_bubble'}
          styles="font-extrabold bg-base-s justify-center items-center rounded-full size-9 text-md  px-2.5 text-center flex"
        />
      </div>
    </div>
  );
}
