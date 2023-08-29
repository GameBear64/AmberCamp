export default function IconInput({ label, invalid, icon, action, width = 'w-60', type = 'text' }) {
  return (
    <div>
      <label>{label}</label>
      <div className="mt-1.5">
        <span className="material-symbols-outlined absolute pt-2 px-1 text-slate-700">{icon}</span>
        <input
          onChange={action}
          className={`shadow-slate-100 ${
            invalid && 'border-2 border-red-600'
          } rounded-l pl-8 text-lg shadow-inner border h-10 ${width} border-slate-200`}
          type={type}
        />
      </div>
    </div>
  );
}
