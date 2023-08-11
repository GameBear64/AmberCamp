import { useState } from 'react';

export default function Options({ options }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <li
        onMouseEnter={() => {
          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
        className={`${active ? options.color : 'bg-white'} p-2 rounded`}>
        {options.option}
      </li>
    </>
  );
}
