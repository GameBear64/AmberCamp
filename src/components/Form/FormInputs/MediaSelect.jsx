import ConnectForm from '../ConnectForm';
import Input from '../Inputs/Input';

export default function MediaSelect({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, watch, setValue, formState: { dirtyFields } }) => {
        register(name, rules);
        const file = watch(name, '');

        return (
          <div className={styles}>
            <Input
              {...rest}
              type="file"
              action={(e) => {
                setValue(name, e.target.files[0], { shouldDirty: true, shouldTouch: true });
              }}
            />
            <div>
              {file && (
                <img
                  className="h-32"
                  src={dirtyFields[name] ? URL.createObjectURL(file) : `http://localhost:3030/recourse/${file}`}
                  alt=""
                />
              )}
            </div>
          </div>
        );
      }}
    </ConnectForm>
  );
}
