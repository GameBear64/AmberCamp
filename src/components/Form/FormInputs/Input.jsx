import ConnectForm from '../ConnectForm';
import Input from '../Inputs/Input';

export default function InputField({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <Input innerRef={ref} invalid={errors[name]} {...registerRest} {...rest} />
            {errors[name] && <p className="text-red-600 font-semibold">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
