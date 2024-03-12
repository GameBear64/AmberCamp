export default function Input({ innerRef, label, invalid = false, styleInput, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-left font-semibold">{label}</label>
      <input
        ref={innerRef}
        className={`mt-1.5 bg-base-m text-txtPrimary ${
          invalid && 'border-2 border-red-600'
        } h-10 rounded-l pl-1.5 text-[17px] ${styleInput}`}
        {...rest}
      />
    </div>
  );
}
