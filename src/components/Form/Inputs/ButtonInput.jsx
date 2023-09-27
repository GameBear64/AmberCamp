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
    <div className="mb-6 mt-2 flex flex-row text-center">
      <input
        type={inputType}
        {...rest}
        ref={innerRef}
        onChange={(e) => {
          actionInput(e);
          setState(e.target.value);
        }}
        value={state}
        className={`h-10 rounded-l border pl-1 shadow-inner shadow-slate-200 ${width} ${
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
