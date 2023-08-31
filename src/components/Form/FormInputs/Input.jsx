import Input from '../Inputs/Input';
import { Field } from 'react-final-form';
import { composeValidators } from '../validators';
import { useState } from 'react';

export default function InputField({
  label,
  type = 'text',
  width = 'w-60',
  invalid,
  name,
  styles,
  defaultValue,
  stylesDiv,
  validationFunction = () => {},
}) {
  const [state, setstate] = useState(defaultValue);

  return (
    <div className={stylesDiv}>
      <Field
        name={name}
        validate={composeValidators(validationFunction)}
        value={state}
        render={({ input, meta }) => (
          <div className={styles}>
            <Input
              type={type}
              action={(e) => setstate(e.target.value)}
              width={width}
              label={label}
              input={input}
              invalid={invalid || !!meta?.error}
            />
          </div>
        )}
      />
    </div>
  );
}
