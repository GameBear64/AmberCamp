import { useState } from 'react';

import Button from '@components/Form/Inputs/Button';
import IconInput from '@components/Form/Inputs/IconInput';
import FormInputs from '@form';
import IconInputField from '@form-inputs/IconInput';
import InputField from '@form-inputs/Input';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

export default function Security() {
  let [newEmail, setNewEmail] = useState('');

  const changePassword = (fields) => {
    useFetch({
      url: 'user/settings/resetPassword',
      method: 'POST',
      body: fields,
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.message.jwt);
        successSnackBar('Your password was changed successfully!');
      } else {
        errorSnackBar(`${res.message}`);
      }
    });
  };

  // TODO: fix email to use the new form
  // const changeEmail = () => {
  //   useFetch({
  //     url: 'user/settings',
  //     method: 'PATCH',
  //     body: {
  //       email: newEmail,
  //     },
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       successSnackBar('Your email was changed successfully!');
  //     } else {
  //       errorSnackBar(`${res.message}`);
  //     }
  //   });
  // };

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <h3 className="mb-3 text-xl">Change Email</h3>
            <div className="flex max-w-md flex-col">
              <div className="mb-2 flex max-w-md flex-col">
                <IconInput width="w-72" label="Change Email" icon="mail" action={(e) => setNewEmail(e.target.value)} />
              </div>
            </div>
          </div>
          <Button size="small" label="Change Email" />
          <hr />
          <div className="flex flex-col">
            <h3 className="my-3 text-xl">Change Password</h3>
            <FormInputs
              onSubmit={(e) => {
                changePassword(e);
              }}>
              <div className="mb-2 flex flex-col">
                <InputField width="w-72" name="password" type="password" label={'Current Password'} />

                <IconInputField
                  styles="flex max-w-md flex-col mb-3"
                  name="newPassword"
                  type="password"
                  width="w-72"
                  label="New Password"
                  icon="lock"
                />

                <IconInputField
                  styles="flex max-w-md flex-col mb-2"
                  name="confirmPassword"
                  type="password"
                  width="w-72"
                  label="Repeat New Password"
                  icon="sync_lock"
                />
              </div>
              <Button size="small" label="Change Password" type="submit" />
            </FormInputs>
          </div>
        </div>
      </div>
    </div>
  );
}
