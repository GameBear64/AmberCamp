import ConnectForm from '../ConnectForm';
import Input from '../Inputs/Input';

export default function InputField({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <Input innerRef={ref} {...registerRest} {...rest} />
          </div>
        );
      }}
    </ConnectForm>
  );
}
