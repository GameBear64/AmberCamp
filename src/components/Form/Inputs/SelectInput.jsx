export default function SelectInput({ options, innerRef, label, styleInput, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-grey-darkest mr-2 font-semibold uppercase">{label}</label>
      <select className={`${styleInput} text-md ml-1 w-24 rounded-lg bg-base-m p-1 text-txtPrimary`} ref={innerRef} {...rest}>
        {options.map((optionText) => (
          <option className="rounded border-none shadow-md" key={optionText}>
            {optionText}
          </option>
        ))}
      </select>
    </div>
  );
}
