import ConnectForm from '../ConnectForm';

export default function IconInputField({ name, rules = {}, styles, label, icon, width = 'w-60', ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <label>{label}</label>
            <div className="mt-1.5">
              <span className="material-symbols-outlined absolute px-1 pt-2 text-slate-700">{icon}</span>
              <input
                ref={ref}
                className={`bg-base-m pl-2 ${errors[name] && 'border-2 border-red-600'} h-10 rounded-l text-txtPrimary ${
                  icon && 'pl-8'
                } text-lg shadow-inner ${width}`}
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
