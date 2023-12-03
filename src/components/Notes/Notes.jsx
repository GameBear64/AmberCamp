import { useState } from 'react';

import Dropdown from '@components/Dropdown/Dropdown';
export default function Notes({ text, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    {
      text: 'Delete',
      color: 'bg-red-300',
      action: () => {
        setShowOptions(false);
        onDelete();
      },
    },
    {
      text: 'Edit',
      color: 'bg-green-300',
      action: () => {
        setShowOptions(false);
        onEdit();
      },
    },
  ];

  return (
    <div
      onMouseLeave={() => setShowOptions(false)}
      className="relative mb-3 w-full flex-row justify-between rounded border-l-8 border-orange-300 bg-neutral-50 p-1 shadow-md">
      <div className="float-right mx-2 rounded transition duration-0 hover:shadow-md hover:duration-500">
        <span onClick={() => setShowOptions(!showOptions)} className="material-symbols-outlined cursor-pointer text-3xl">
          more_horiz
        </span>
        {showOptions && <Dropdown options={options} />}
      </div>
      <div className="whitespace-pre-line p-1">
        <p className="ml-1 break-words text-lg">{text}</p>
      </div>
    </div>
  );
}
