import { useState } from 'react';
import Options from '../Options/Options';
export default function Notes({ text, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      onMouseLeave={() => setShowOptions(false)}
      className="flex rounded shadow-md flex-row justify-between border-l-8 bg-gray-50 border-orange-300 mb-3 p-1">
      <p className="text-lg ml-1">{text}</p>
      <div className="mr-2">
        <span onClick={() => setShowOptions(!showOptions)} className="material-symbols-outlined cursor-pointer text-3xl">
          more_horiz
        </span>
        {showOptions && (
          <div className="dropdown absolute shadow-md text-base">
            <ul>
              <Options
                options={{ option: 'Delete', color: 'bg-red-300' }}
                onClick={() => {
                  setShowOptions(false);
                  onDelete();
                }}
              />
              <Options
                options={{ option: 'Edit', color: 'bg-green-300' }}
                onClick={() => {
                  setShowOptions(false);
                  onEdit();
                }}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
