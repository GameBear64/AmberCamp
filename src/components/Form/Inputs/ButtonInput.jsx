import { useEffect, useState } from 'react';

export default function ButtonInput({
  btnText,
  btnBG = 'bg-gray-100',
  btnColor,
  innerRef,
  actionInput = () => {},
  actionButton = () => {},
  shouldClear,
  value,
  type = 'button',
  width = 'w-60',
  invalid,
  inputType = 'text',
  ...rest
}) {
  const [state, setState] = useState('');

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <div className="flex flex-row text-center mb-6 mt-2">
      <input
        type={inputType}
        {...rest}
        ref={innerRef}
        onChange={(e) => {
          actionInput(e);
          setState(e.target.value);
        }}
        value={state}
        className={`shadow-slate-200 rounded-l pl-1 shadow-inner border h-10 ${width} ${
          invalid ? 'border-2 border-red-600' : 'border-slate-200'
        }`}
      />
      <button
        onClick={() => {
          actionButton(state);
          if (shouldClear) setState('');
        }}
        type={type}
        className={`font-semibold ${btnColor} rounded-r shadow-inner block ${btnBG} p-1 text-[16px] hover:shadow-inner`}>
        {btnText}
      </button>
    </div>
  );
}
