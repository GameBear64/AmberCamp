import { useState } from 'react';

export default function ButtonInput({
  buttonLabel,
  color = 'bg-gray-100',
  actionInput = () => {},
  actionButton,
  shouldClear,
  defaultValue = '',
  textColor,
  width = 'w-60',
  invalid,
  type = 'text',
  input,
}) {
  const [state, setstate] = useState(defaultValue);
  return (
    <div className="flex flex-row text-center mb-6 mt-2">
      <input
        onChange={(e) => {
          actionInput(e);
          setstate(e.target.value);
        }}
        value={state}
        type={type}
        className={`shadow-slate-200 rounded-l pl-1 shadow-inner border h-10 ${width} ${
          invalid ? 'border-2 border-red-600' : 'border-slate-200'
        }  `}
        {...input}
      />
      <button
        onClick={() => {
          actionButton(state);
          if (shouldClear) setstate('');
        }}
        type="button"
        className={`font-semibold ${textColor} rounded-r shadow-inner ${color} p-1 text-md hover:shadow-inner`}>
        {buttonLabel}
      </button>
    </div>
  );
}
