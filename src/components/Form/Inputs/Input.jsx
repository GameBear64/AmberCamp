export default function Input({ innerRef, label, invalid = false, width = 'w-60', type = 'text', styleInput, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-left font-semibold">{label}</label>
      <div className="mt-1.5">
        <input
          ref={innerRef}
          className={`shadow-slate-100 ${
            invalid ? 'border-2 border-red-600' : 'border-slate-200'
          } h-10 rounded-l border pl-1.5 text-[17px] ${width} ${styleInput}`}
          type={type}
          {...rest}
        />
      </div>
    </div>
  );
}
