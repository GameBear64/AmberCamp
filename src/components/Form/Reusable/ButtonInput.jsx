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
        className={`${invalid ? 'input-error' : 'input'} rounded-r-none`}
      />
      <button
        onClick={() => {
          actionButton(state);
          if (shouldClear) setState('');
        }}
        type={type}
        className="btn min-w-max rounded-l-none"
      >
        {btnText}
      </button>
    </div>
  );
}
