import Icon from '@components/Icon';

import ConnectForm from '@form/ConnectForm';
import ButtonInput from '@form/Reusable/ButtonInput';

import { errorSnackBar } from '@utils/snackbars';

export default function TagSelector({ name, rules = {}, styles, label, ...rest }) {
  return (
    <ConnectForm>
      {({ register, setValue, watch }) => {
        register(name, rules);
        const tags = watch(name, []);

        return (
          <>
            <div className={styles}>
              <label className="text-left font-semibold text-txtSecondary">{label}</label>
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
                <div key={tag} className="m-1 flex flex-row rounded-xl border border-base-m shadow-sm">
                  <Icon
                    onClick={() => {
                      setValue(
                        name,
                        tags.filter((el) => el !== tag),
                        { shouldDirty: true, shouldTouch: true }
                      );
                    }}
                    styles="m-2"
                    icon="close"
                  />
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
