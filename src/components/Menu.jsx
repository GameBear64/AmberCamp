import { useState } from 'react';

export default function Menu({ values }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      onMouseLeave={() => {
        setShowOptions(false);
      }}>
      <span onClick={() => setShowOptions(!showOptions)} className="material-symbols-outlined text-3xl">
        more_horiz
      </span>
      {showOptions && (
        <div className="dropdown relative shadow-md text-base">
          <ul className="absolute" onClick={() => setShowOptions(false)}>
            {values.map((option, i) => (
              <li key={i} className={`p-2 rounded bg-white hover:bg-slate-200`} onClick={() => option.action}>
                {option.option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
