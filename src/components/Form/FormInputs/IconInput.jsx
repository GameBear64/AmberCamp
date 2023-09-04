import IconInput from '../Inputs/IconInput';
import ConnectForm from '../ConnectForm';

export default function IconInputField({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <IconInput innerRef={ref} {...registerRest} {...rest} />
          </div>
        );
      }}
    </ConnectForm>
  );
}
