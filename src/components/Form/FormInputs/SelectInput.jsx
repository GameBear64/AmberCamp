import ConnectForm from '../ConnectForm';

export default function SelectInput({ name, label, rules = {}, styleInput, options, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <div className="flex flex-col">
              <label className="mr-2 font-semibold uppercase text-txtSecondary">{label}</label>
              <select
                className={`${styleInput} text-md ml-1 w-24 rounded-lg bg-base-m p-1 text-txtPrimary`}
                ref={ref}
                {...registerRest}
                {...rest}>
                {options.map((optionText) => (
                  <option className="rounded border-none shadow-md" key={optionText}>
                    {optionText}
                  </option>
                ))}
              </select>
            </div>
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
