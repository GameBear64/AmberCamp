import ConnectForm from '../ConnectForm';
import Textarea from '../Inputs/Textarea';

export default function TextareaField({ name, rules = {}, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => {
        const { ref, ...registerRest } = register(name, rules);
        return <Textarea innerRef={ref} {...registerRest} {...rest} />;
      }}
    </ConnectForm>
  );
}
