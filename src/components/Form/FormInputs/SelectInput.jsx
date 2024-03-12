import ConnectForm from '../ConnectForm';

export default function SelectInputForm({ name, label, rules = {}, styleInput, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <div className="flex flex-col">
              <label className="text-grey-darkest mr-2 font-semibold uppercase">{label}</label>
              <select
                className={`${styleInput} text-md ml-1 w-24 rounded-lg border border-neutral-300 bg-neutral-50 p-1 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-500`}
                ref={ref}
                {...registerRest}
                {...rest}>
                {/* {options.map((optionText) => (
                  <option className="rounded border-none shadow-md" key={optionText}>
                    {optionText}
                  </option>
                ))} */}
              </select>
            </div>
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
