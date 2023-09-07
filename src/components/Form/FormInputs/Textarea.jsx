import ConnectForm from '../ConnectForm';
import Textarea from '../Inputs/Textarea';

export default function TextareaField({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => {
        const { ref, ...registerRest } = register(name, rules);
        return (
          <div className={styles}>
            <Textarea innerRef={ref} {...registerRest} {...rest} />
          </div>
        );
      }}
    </ConnectForm>
  );
}
