import { useState } from 'react';

import RoundButton from '@components/RoundButton';

import ConnectForm from '@form/ConnectForm';

export default function IconPicker({ name, rules = {}, styles, label, icons }) {
  const [show, setShow] = useState(false);

  return (
    <ConnectForm>
      {({ register, watch, setValue }) => {
        register(name, rules);
        const chosenIcon = watch(name, '');

        return (
          <div className={`relative flex flex-col items-center justify-center ${styles}`}>
            <label className="self-start text-xl font-semibold">{label}</label>
            <button type="button" onClick={() => setShow(!show)} className="btn w-full">
              Pick an icon
            </button>
            {show && (
              <div className="absolute top-10 my-2 flex flex-wrap gap-2 overflow-y-clip rounded bg-base-m shadow-md">
                {icons.map((icon) => (
                  <RoundButton
                    key={icon}
                    icon={icon}
                    onClick={() => {
                      setValue(name, icon);
                      setShow(false);
                    }}
                    colors={`rounded ${icon === chosenIcon && 'bg-primary text-base-x'}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
    </ConnectForm>
  );
}
