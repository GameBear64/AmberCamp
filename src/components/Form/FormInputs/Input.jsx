import ConnectForm from '../ConnectForm';

export default function InputField({ name, label, rules = {}, styles, styleInput = 'input-primary', ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <div className="flex flex-col">
              <label className="text-left font-semibold">{label}</label>
              <input
                ref={ref}
                className={`mt-1.5 text-txtPrimary ${ errors[name] && 'border-2 border-red-600' } h-10 rounded-l pl-1.5 text-[17px] ${styleInput}`}
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
