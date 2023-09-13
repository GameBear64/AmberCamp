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
                <div key={tag} className="m-1 flex flex-row rounded-xl border border-slate-300 shadow-md ">
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
                  <p className="p-2.5 text-center font-semibold">{tag}</p>
                </div>
              ))}
            </div>
          </>
        );
      }}
    </ConnectForm>
  );
}
