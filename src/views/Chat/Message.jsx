import { useState } from 'react';

import Icon from '../../components/Icon';

import MessageOptions from './MessageOptions';

export default function Message({ message, last }) {
  const [show, setShow] = useState(false);
  return (
    <li className="group mr-1 flex w-full flex-row px-8 py-2 hover:bg-gray-100">
      <img className="h-11 w-11 rounded-full" src={message?.img} alt="profile_picture" />
      <div className="relative ml-2 flex w-full flex-row gap-2">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <p className="text-sm font-bold leading-snug text-gray-900">{message?.user}</p>
            <p className="text-sm font-normal leading-snug text-gray-600">{message?.timeSend}AM</p>
          </div>
          <p className="text-md w-full max-w-[65em] break-all leading-snug text-gray-600">{message?.message}</p>
        </div>
        <div className="flex h-full items-center">
          <Icon
            onClick={() => setShow(!show)}
            styles="text-xl hidden group-hover:block shadow-primary rounded bg-slate-50 px-2 flex font-semibold"
            icon="more_horiz"
          />
        </div>
        <div onMouseLeave={() => setShow(false)} className={`absolute bottom-1  ${last && 'top-0'} right-0 z-20`}>
          {show && <MessageOptions />}
        </div>
      </div>
    </li>
  );
}
