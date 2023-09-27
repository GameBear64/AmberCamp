import { useState } from 'react';

export default function Options({ text, color, onClick }) {
  const [active, setActive] = useState(false);
  return (
    <li
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      onClick={onClick}
      className={`${active ? color : 'bg-white'} rounded p-2`}>
      {text}
    </li>
  );
}
