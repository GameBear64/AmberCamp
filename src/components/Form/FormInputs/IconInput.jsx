import IconInput from '../Inputs/IconInput';
import { Field } from 'react-final-form';

export default function IconInputField({ label, type = 'text', icon, width = 'w-60', invalid, name, styles }) {
  return (
    <Field
      name={name}
      render={({ input }) => (
        <div className={styles}>
          <IconInput type={type} width={width} label={label} icon={icon} input={input} invalid={invalid} />
        </div>
      )}
    />
  );
}
