import ConnectForm from '../ConnectForm';
import ButtonInput from '../Inputs/ButtonInput';

export default function InputField({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <ButtonInput innerRef={ref} {...registerRest} {...rest} />
          </div>
        );
      }}
    </ConnectForm>
  );
}
