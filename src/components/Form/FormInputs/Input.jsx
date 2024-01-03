import ConnectForm from '../ConnectForm';
import Input from '../Inputs/Input';

export default function InputField({ name, rules = {}, styles, styleInput = 'input-primary', ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <Input innerRef={ref} invalid={errors[name]} styleInput={styleInput} {...registerRest} {...rest} />
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
