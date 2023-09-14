export default function Textarea({ innerRef, label, action, invalid = false, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-left">{label}</label>
      <div className="mt-1.5">
        <textarea
          ref={innerRef}
          onChange={action}
          className={`rounded-lg border p-1 text-lg text-black shadow-inner shadow-slate-100 ${
            invalid ? 'border-2 border-red-600' : 'border-slate-200'
          }`}
          {...rest}></textarea>
      </div>
    </div>
  );
}
