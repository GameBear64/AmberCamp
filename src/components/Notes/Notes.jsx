import { useState } from 'react';

import Dropdown from '@components/Dropdown/Dropdown';

import Icon from '../Icon';
export default function Notes({ text, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    {
      text: 'Delete',
      color: 'bg-red-200 text-red-800',
      action: () => {
        setShowOptions(false);
        onDelete();
      },
    },
    {
      text: 'Edit',
      color: 'bg-green-200 text-green-800',
      action: () => {
        setShowOptions(false);
        onEdit();
      },
    },
  ];

  return (
    <div
      onMouseLeave={() => setShowOptions(false)}
      className="shadow-primary relative mb-3 w-full flex-row justify-between rounded border-l-8 border-orange-300 bg-neutral-50 p-1">
      <div className="float-right mx-2 rounded">
        <Icon icon="more_horiz" action={() => setShowOptions(!showOptions)} styles="text-3xl" />
        {showOptions && <Dropdown options={options} />}
      </div>
      <p className="ml-1 break-words p-1 text-lg">{text}</p>
    </div>
  );
}
