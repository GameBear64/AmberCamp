import { useState } from 'react';

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
      className={`${active ? option?.color : 'bg-white'} cursor-pointer rounded p-2`}>
      {option?.text}
    </li>
  );
}
