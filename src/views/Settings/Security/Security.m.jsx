import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconInput from '@components/Form/Inputs/IconInput';
import FormInputs from '@form';
import IconInputField from '@form-inputs/IconInput';
import InputField from '@form-inputs/Input';
import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

import TopBar from '../../../components/NavBar/MobileNavBar';

export default function SecurityMobile() {
  let [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();
  const changePassword = (fields) => {
    useFetch({
      url: 'user/settings/resetPassword',
      method: 'POST',
      body: fields,
    }).then((res) => {
      localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.message.jwt);
      successSnackBar('Your password was changed successfully!');
    });
  };

  const changeEmail = () => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: {
        email: newEmail,
      },
    }).then(() => {
      successSnackBar('Your email was changed successfully!');
    });
  };

  return (
    <div>
      <TopBar backBtnLable="Security" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
      <div className="px-10">
        <div className="m-auto flex max-w-md flex-col justify-center">
          <div className="my-5 flex flex-col">
            <h3 className="mb-3 text-xl">Change Email</h3>
            <div className="flex max-w-md flex-col">
              <div className="mb-2 flex max-w-md flex-col">
                <IconInput width="w-full" label="Change Email" icon="mail" action={(e) => setNewEmail(e.target.value)} />
              </div>
              <button
                onClick={() => changeEmail()}
                type="email"
                className="mt-2 max-w-md rounded bg-orange-700 px-2 py-1 text-[17px] font-semibold text-white shadow-md">
                Change Email
              </button>
            </div>
          </div>
          <hr />
          <div className="my-5 flex flex-col">
            <h3 className="mb-3 text-xl">Change Password</h3>

            <FormInputs
              onSubmit={(e) => {
                changePassword(e);
              }}>
              <div className="mb-2 flex flex-col">
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
                className="mt-2 w-full max-w-md rounded bg-orange-700 px-2 py-1 text-[17px] font-semibold text-white shadow-md">
                Change Password
              </button>
            </FormInputs>
          </div>
        </div>
      </div>
    </div>
  );
}
