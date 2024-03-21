import ConnectForm from '../ConnectForm';

export default function TextareaField({ name, label, rules = {}, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className="flex flex-col">
            <label className="text-left font-semibold text-txtSecondary">{label}</label>
            <div className="mt-1.5">
              <textarea
                ref={ref}
                className={`w-full min-w-[10em] rounded-lg bg-base-m p-1 text-lg text-txtPrimary ${
                  errors[name] ? 'border-2 border-red-600' : 'border-slate-200'
                }`}
                {...registerRest}
                {...rest}></textarea>
            </div>
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
