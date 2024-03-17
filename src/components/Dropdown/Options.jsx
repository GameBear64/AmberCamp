import { useState } from 'react';

import Icon from '../Icon';
export default function Options({ option, style }) {
  const [active, setActive] = useState(false);
  return (
    <li
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      onClick={option?.action}
      className={`${active ? option?.color : 'bg-base'} cursor-pointer p-2 text-txtPrimary`}>
      {option?.text}
      {option?.icon && <Icon styles={`text-xl ${option?.iconColor ? option.iconColor : 'text-slate-700'}`} icon={option?.icon} />}
    </li>
  );
}
