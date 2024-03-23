import { useEffect, useState } from 'react';

export default function ButtonInput({
  btnText,
  btnBG = 'bg-base-s',
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
    <div className={`flex flex-row text-center text-txtPrimary ${width}`}>
      <input
        type={inputType}
        {...rest}
        ref={innerRef}
        onChange={(e) => {
          actionInput(e);
          setState(e.target.value);
        }}
        value={state || ''}
        className={`h-10 w-full rounded-l bg-base-m pl-1 text-txtPrimary focus:outline-none ${
          invalid && 'border-2 border-red-600'
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
