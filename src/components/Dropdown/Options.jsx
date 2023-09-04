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
      className={`${active ? color : 'bg-white'} p-2 rounded`}>
      {text}
    </li>
  );
}
