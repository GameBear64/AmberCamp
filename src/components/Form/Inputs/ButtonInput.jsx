import { useEffect, useState } from 'react';

export default function ButtonInput({
  btnText,
  btnBG = 'bg-neutral-100',
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
    <div className={`mb-6 mt-2 flex flex-row text-center ${width}`}>
      <input
        type={inputType}
        {...rest}
        ref={innerRef}
        onChange={(e) => {
          actionInput(e);
          setState(e.target.value);
        }}
        value={state || ''}
        className={`h-10 w-full rounded-l border pl-1 shadow-inner shadow-slate-200 ${
          invalid ? 'border-2 border-red-600' : 'border-slate-200'
        }`}
      />
      <button
        onClick={() => {
          actionButton(state);
          if (shouldClear) setState('');
        }}
        type={type}
        className={`font-semibold ${btnColor} block rounded-r shadow-inner ${btnBG} p-1 text-[16px] hover:shadow-inner`}>
        {btnText}
      </button>
    </div>
  );
}
