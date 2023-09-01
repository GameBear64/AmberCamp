import { errorSnackBar } from '../../../utils/snackbars';
import ConnectForm from '../ConnectForm';
import ButtonInput from '../Inputs/ButtonInput';

export default function TagSelector({ name, rules = {}, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, setValue, watch }) => {
        register(name, rules);
        const tags = watch(name, []);

        return (
          <>
            <div className={styles}>
              <label className="text-left">Tags</label>
              <ButtonInput
                {...rest}
                label="Tags"
                actionButton={(tag) => {
                  if (tags.some((t) => t === tag)) {
                    errorSnackBar('Cant have duplicate tags');
                  } else {
                    setValue(name, [...tags, tag], { shouldDirty: true, shouldTouch: true });
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap">
              {tags?.map((tag) => (
                <div key={tag} className="border flex flex-row shadow-md border-slate-300 rounded-xl m-1 ">
                  <span
                    onClick={() => {
                      setValue(
                        name,
                        tags.filter((el) => el !== tag),
                        { shouldDirty: true, shouldTouch: true }
                      );
                    }}
                    className="material-symbols-outlined m-2">
                    close
                  </span>
                  <p className="p-2.5 font-semibold text-center">{tag}</p>
                </div>
              ))}
            </div>
          </>
        );
      }}
    </ConnectForm>
  );
}
