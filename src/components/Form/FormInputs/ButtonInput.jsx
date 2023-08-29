import ButtonInput from '../Inputs/ButtonInput';
import { Field } from 'react-final-form';

export default function ButtonInputField({
  label,
  type = 'text',
  width = 'w-60',
  invalid,
  name,
  actionInput,
  styles,
  actionButton,
  textColor,
}) {
  return (
    <Field
      name={name}
      render={({ input }) => (
        <div className={styles}>
          <ButtonInput
            type={type}
            width={width}
            buttonLabel={label}
            input={input}
            invalid={invalid}
            actionButton={actionButton}
            actionInput={actionInput}
            textColor={textColor}
          />
        </div>
      )}
    />
  );
}
