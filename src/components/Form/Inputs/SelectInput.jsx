export default function SelectInput({ options, innerRef, label, styleInput, ...rest }) {
  return (
    <div className="my-5">
      <label className="text-grey-darkest mr-2 font-semibold uppercase">{label}</label>
      <select
        className={`${styleInput} text-md ml-1 w-24 rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500`}
        ref={innerRef}
        {...rest}>
        {options.map((optionText) => (
          <option className="rounded border-none shadow-md" key={optionText}>
            {optionText}
          </option>
        ))}
      </select>
    </div>
  );
}
