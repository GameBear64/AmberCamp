export default function SelectInput({ options, innerRef, label, invalid, styleInput, ...rest }) {
  return (
    <div className="my-5">
      <label className="text-grey-darkest font-semibold uppercase mr-2">{label}</label>
      <select className={`${invalid ? 'border-2 border-red-600' : 'border-slate-200'} ${styleInput}`} ref={innerRef} {...rest}>
        {options.map((optionText) => (
          <option className="rounded shadow-md" key={optionText}>
            {optionText}
          </option>
        ))}
      </select>
    </div>
  );
}
