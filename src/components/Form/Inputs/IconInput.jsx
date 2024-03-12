import Icon from '../../Icon';

export default function IconInput({ label, invalid, icon, action, width = 'w-60', innerRef, ...rest }) {
  return (
    <>
      <label className="text-txtPrimary">{label}</label>
      <div className="mt-1.5">
        <Icon styles="absolute px-1 pt-2" icon={icon} />
        {icon}
        <input
          ref={innerRef}
          onChange={action}
          className={`bg-base-m pl-2 ${invalid && 'border-2 border-red-600'} h-10 rounded-l text-txtPrimary ${
            icon && 'pl-8'
          } text-lg shadow-inner ${width}`}
          {...rest}
        />
      </div>
    </>
  );
}
