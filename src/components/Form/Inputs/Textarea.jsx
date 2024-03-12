export default function Textarea({ innerRef, label, action, invalid = false, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-left font-semibold">{label}</label>
      <div className="mt-1.5">
        <textarea
          ref={innerRef}
          onChange={action}
          className={`w-full min-w-[10em] rounded-lg bg-base-m p-1 text-lg text-txtPrimary ${
            invalid ? 'border-2 border-red-600' : 'border-slate-200'
          }`}
          {...rest}></textarea>
      </div>
    </div>
  );
}
