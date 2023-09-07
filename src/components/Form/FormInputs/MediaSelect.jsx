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
              styleInput="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold file:cursor-pointer
                file:bg-gray-100 file:text-black-700
                hover:file:bg-gray-200 border-none mb-2 font-semibold"
              {...rest}
              type="file"
              onChange={(e) => {
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
