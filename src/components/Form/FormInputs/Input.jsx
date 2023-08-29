import Input from '../Inputs/Input';
import { Field } from 'react-final-form';

export default function InputField({ label, type = 'text', width = 'w-60', invalid, name, styles }) {
  return (
    <Field
      name={name}
      render={({ input }) => (
        <div className={styles}>
          <Input type={type} width={width} label={label} input={input} invalid={invalid} />
        </div>
      )}
    />
  );
}
