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
                className={`pl-2 shadow-slate-100 ${errors[name] && 'border-2 border-red-600'} h-10 rounded-l border ${
                  icon && 'pl-8'
                } text-lg shadow-inner ${width} border-slate-200`}
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
