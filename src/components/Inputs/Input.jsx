export default function Input({ label, action, invalid = false, width = 'w-60', defauldValue, type = 'password' }) {
  return (
    <div>
      <label>{label}</label>
      <div className="mt-1.5">
        <input
          defaultValue={defauldValue}
          onChange={action}
          className={`shadow-slate-100 ${
            invalid ? 'border-2 border-red-600' : 'border-slate-200'
          } rounded-l pl-1.5 text-lg shadow-inner border h-10 ${width}`}
          type={type}
        />
      </div>
    </div>
  );
}
