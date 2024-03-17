import { Children, cloneElement } from 'react';

export default function SettingsLayout({ children, styles }) {
  return (
    <div className={`my-5 flex flex-col items-center gap-20 px-2 ${styles}`}>
      {Children.map(children, (child, i) => (
        <div className="flex w-full flex-col items-center">
          {i !== 0 && <hr className="w-full pb-2" />}
          {child.type.name === 'Button' ? (
            child
          ) : (
            <>
              <label className="mb-2 self-start text-2xl font-bold text-txtPrimary">{child.props.label}</label>
              <div>{cloneElement(child, { label: undefined })}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
