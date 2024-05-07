import { Status } from '@utils/enums/contacts';

import Icon from '../Icon';

export default function GroupCard({ title, color, icon, participants, status = 'friends' }) {
  return (
    <div key={title} className="flex w-full cursor-pointer items-center rounded-b border-t p-3 hover:bg-base-m">
      <span className={`accent-circle rounded-full p-2 ${color} material-symbols-rounded cursor-pointer text-2xl text-base-x`}>
        {icon}
      </span>
      <div className="flex size-full flex-row justify-between">
        <div className="ml-2 flex flex-col">
          <p className="text-sm font-bold leading-snug text-txtPrimary">{title}</p>
          <p className="text-xs leading-snug text-txtSecondary">{participants} participants</p>
        </div>
        {status && (
          <Icon
            icon={Status[status]}
            styles={`${status === 'blocked' ? 'bg-red-200 text-red-700' : 'bg-base-s'} ${
              status === 'pending' && 'font-extrabold'
            } justify-center items-center rounded-full text-[17px] px-2.5 text-center flex`}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
}
