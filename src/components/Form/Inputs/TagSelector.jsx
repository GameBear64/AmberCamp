import Tag from '@components/Profile/Tag';

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
                    errorSnackBar('Can\'t have duplicate tags');
                  } else if (tag.length == 0) {
                    errorSnackBar('Can\'t have empty tags');
                  } else {
                    setValue(name, [...tags, tag], { shouldDirty: true, shouldTouch: true });
                  }
                }}
              />
            </div>
            <div className="my-2 flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Tag 
                  key={tag} 
                  onClick={() => setValue(name, tags.filter((el) => el !== tag), { shouldDirty: true, shouldTouch: true })}
                  styles='my-2'
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </>
        );
      }}
    </ConnectForm>
  );
}
