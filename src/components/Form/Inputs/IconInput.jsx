export default function IconInput({ label, invalid, icon, action, width = 'w-60', innerRef, ...rest }) {
  return (
    <>
      <label>{label}</label>
      <div className="mt-1.5">
        <span className="material-symbols-outlined absolute px-1 pt-2 text-slate-700">{icon}</span>
        <input
          ref={innerRef}
          onChange={action}
          className={`pl-2 shadow-slate-100 ${invalid && 'border-2 border-red-600'} h-10 rounded-l border ${
            icon && 'pl-8'
          } text-lg shadow-inner ${width} border-slate-200`}
          {...rest}
        />
      </div>
    </>
  );
}
