import RoundButton from '@components/RoundButton';

import ConnectForm from '@form/ConnectForm';

export default function ColorPicker({ name, rules = {}, styles, label, colors }) {
  return (
    <ConnectForm>
      {({ register, watch, setValue }) => {
        register(name, rules);
        const chosenColor = watch(name, '');

        return (
          <div className={`flex flex-col items-center justify-center ${styles}`}>
            <label className="self-start text-xl font-semibold">{label}</label>
            <div className="container m-auto grid grid-cols-5 gap-1.5 md:gap-2">
              {colors.map((color) => (
                <RoundButton
                  key={color}
                  onClick={() => setValue(name, color)}
                  colors={`${color} rounded ${chosenColor === color && 'border-txtPrimary border-4'} size-7 md:size-10`}
                />
              ))}
            </div>
          </div>
        );
      }}
    </ConnectForm>
  );
}
