export default function SelectInput({ options, innerRef, label, styleInput, ...rest }) {
  return (
    <div className="my-5">
      <label className="text-grey-darkest font-semibold uppercase mr-2">{label}</label>
      <select
        className={`${styleInput} bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg ml-1 w-24 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        ref={innerRef}
        {...rest}>
        {options.map((optionText) => (
          <option className="rounded shadow-md border-none" key={optionText}>
            {optionText}
          </option>
        ))}
      </select>
    </div>
  );
}
