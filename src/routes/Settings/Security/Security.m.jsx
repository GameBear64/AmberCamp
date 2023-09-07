import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconInput from '@components/Form/Inputs/IconInput';
import FormInputs from '@form';
import IconInputField from '@form-inputs/IconInput';
import InputField from '@form-inputs/Input';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

export default function SecurityMobile() {
  let [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();
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

  const changeEmail = () => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: {
        email: newEmail,
      },
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Your email was changed successfully!');
      } else {
        errorSnackBar(`${res.message}`);
      }
    });
  };

  return (
    <div>
      <div className="p-10">
        <div className="flex flex-row">
          <span onClick={() => navigate('/user/settings')} className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">
            arrow_back_ios_new
          </span>
          <h1 className="font-semibold text-2xl">Security</h1>
        </div>
        <div className="flex flex-col max-w-md m-auto justify-center">
          <div className="my-5 flex flex-col">
            <h3 className="text-xl mb-3">Change Email</h3>
            <div className="flex max-w-md flex-col">
              <div className="flex max-w-md flex-col mb-2">
                <IconInput width="w-full" label="Change Email" icon="mail" action={(e) => setNewEmail(e.target.value)} />
              </div>
              <button
                onClick={() => changeEmail()}
                type="email"
                className="mt-2 max-w-md font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
                Change Email
              </button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col my-5">
            <h3 className="text-xl mb-3">Change Password</h3>

            <FormInputs
              onSubmit={(e) => {
                changePassword(e);
              }}>
              <div className="flex flex-col mb-2">
                <InputField width="w-full" name="password" type="password" label={'Current Password'} />

                <IconInputField
                  styles="flex max-w-md flex-col mb-3"
                  name="newPassword"
                  type="password"
                  width="w-full"
                  label="New Password"
                  icon="lock"
                />

                <IconInputField
                  styles="flex max-w-md flex-col mb-2"
                  name="confirmPassword"
                  type="password"
                  width="w-full"
                  label="Repeat New Password"
                  icon="sync_lock"
                />
              </div>
              <button
                type="submit"
                className="mt-2 max-w-md w-full font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
                Change Password
              </button>
            </FormInputs>
          </div>
        </div>
      </div>
    </div>
  );
}
