import Icon from '@components/Icon';

import ConnectForm from '../ConnectForm';

export default function IconInput({ name, rules = {}, styles, onClickIcon, label, icon, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <label className="text-txtSecondary">{label}</label>
            <div className={`flex w-full items-center`}>
              <Icon onClick={onClickIcon} icon={icon} styles="absolute p-2" />
              <input
                ref={ref}
                className={`${errors[name] ? 'input-error' : 'input'} ${icon && 'pl-10'}`}
                {...registerRest}
                {...rest}
              />
            </div>
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
