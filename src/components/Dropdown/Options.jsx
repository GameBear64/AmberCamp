import { useState } from 'react';

import Icon from '../Icon';
export default function Options({ option }) {
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
      className={`${active ? option?.color : 'bg-base'} flex cursor-pointer flex-row justify-between gap-2 p-2 text-txtPrimary`}>
      {option?.text}
      {option?.icon && <Icon styles={`text-xl ${option?.iconColor}`} icon={option?.icon} />}
    </li>
  );
}
