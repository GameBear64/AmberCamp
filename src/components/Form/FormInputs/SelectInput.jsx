import ConnectForm from '../ConnectForm';
import SelectInput from '../Inputs/SelectInput';

export default function SelectInputForm({ name, rules = {}, styleInput, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <SelectInput innerRef={ref} invalid={errors[name]} styleInput={styleInput} {...registerRest} {...rest} />
            {errors[name] && <p className="text-red-600 font-semibold">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
