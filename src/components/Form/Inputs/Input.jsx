export default function Input({ innerRef, label, action, invalid = false, width = 'w-60', type = 'text', ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-left">{label}</label>
      <div className="mt-1.5">
        <input
          ref={innerRef}
          onChange={action}
          className={`shadow-slate-100 ${
            invalid ? 'border-2 border-red-600' : 'border-slate-200'
          } rounded-l pl-1.5 text-lg shadow-inner border h-10 ${width}`}
          type={type}
          {...rest}
        />
      </div>
    </div>
  );
}
