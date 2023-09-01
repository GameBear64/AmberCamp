// import { Form } from 'react-final-form';
// export default function FormInputs(props) {
//   return (
//     <Form onSubmit={props.onSubmit} render={({ handleSubmit }) => <form onSubmit={handleSubmit}>{props.children}</form>}></Form>
//   );
// }

import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { cleanObject } from '../../utils/utils';

export default function Form({ defaultValues, children, onSubmit, submitOnEnter = false, onlyDirty = false }) {
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const checkKeyDown = (e) => {
    if (e.code === 'Enter' && !submitOnEnter) e.preventDefault();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(onlyDirty ? cleanObject(e, Object.keys(dirtyFields)) : e))}
        onKeyDown={(e) => checkKeyDown(e)}>
        {children}
      </form>
    </FormProvider>
  );
}
