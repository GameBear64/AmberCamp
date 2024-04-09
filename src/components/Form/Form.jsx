import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { cleanObject } from '@utils/utils';

export default function Form({
  defaultValues,
  children,
  onSubmit,
  submitOnEnter = false,
  onlyDirty = false,
  validationMode = 'onChange',
}) {
  const methods = useForm({ defaultValues, mode: validationMode });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const checkKeyDown = (e) => {
    if (e.key === 'Enter' && !submitOnEnter) e.preventDefault();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(onlyDirty ? cleanObject(e, Object.keys(dirtyFields)) : e);
          if (submitOnEnter) reset();
        })}
        onKeyDown={(e) => checkKeyDown(e)}>
        {children}
      </form>
    </FormProvider>
  );
}
