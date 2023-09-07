import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
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
      className="rounded w-full relative shadow-md flex-row border-l-8 justify-between bg-gray-50 border-orange-300 mb-3 p-1">
      <div className="float-right hover:shadow-md rounded transition duration-0 hover:duration-500 mx-2">
        <span onClick={() => setShowOptions(!showOptions)} className="material-symbols-outlined cursor-pointer text-3xl">
          more_horiz
        </span>
        {showOptions && <Dropdown options={options} />}
      </div>
      <div className="p-1 whitespace-pre-line">
        <p className="text-lg ml-1 break-words">{text}</p>
      </div>
    </div>
  );
}
