import { useState } from 'react';

import Dropdown from '@components/Dropdown/Dropdown';

import Icon from '../Icon';
export default function Notes({ text, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    {
      text: 'Delete',
      color: 'bg-red-500 text-red-800',
      action: () => {
        setShowOptions(false);
        onDelete();
      },
    },
    {
      text: 'Edit',
      color: 'bg-green-500 text-green-800',
      action: () => {
        setShowOptions(false);
        onEdit();
      },
    },
  ];

  return (
    <div
      onMouseLeave={() => setShowOptions(false)}
      className="relative my-3 w-full flex-row justify-between rounded border-l-8 border-primary bg-base-m p-1">
      <div className="float-right mx-2 rounded">
        <Icon icon="more_horiz" onClick={() => setShowOptions(!showOptions)} styles="text-3xl" />
        {showOptions && <Dropdown options={options} />}
      </div>
      <p className="ml-1 break-words p-1 text-lg text-txtPrimary">{text}</p>
    </div>
  );
}
