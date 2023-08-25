import { useFetch } from '../../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../../utils/snackbars';
import { useState } from 'react';
import IconInput from '../../../components/Inputs/IconInput';
import Input from '../../../components/Inputs/Input';

export default function Security() {
  let [newPassword, setNewPassword] = useState('');
  let [currentPassword, setCurrentPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [newEmail, setNewEmail] = useState('');

  const changePassword = () => {
    useFetch({
      url: 'user/settings/resetPassword',
      method: 'POST',
      body: {
        password: currentPassword,
        confirmPassword: repeatPassword,
        newPassword: newPassword,
      },
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Your password was changed successfully!');
      } else {
        errorSnackBar(`${res.message.error}!`);
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
        errorSnackBar(`${res.message.error}!`);
      }
    });
  };

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <h3 className="text-xl mb-3">Change Email</h3>
            <div className="flex max-w-md flex-col">
              <div className="flex max-w-md flex-col mb-2">
                <IconInput width="w-72" label="Change Email" icon="mail" action={(e) => setNewEmail(e.target.value)} />
              </div>
            </div>
          </div>
          <button
            onClick={() => changeEmail()}
            type="email"
            className="mt-2 mb-4 max-w-[290px] font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
            Change Email
          </button>
          <hr />
          <div className="flex flex-col">
            <h3 className="text-xl my-3">Change Password</h3>
            <div>
              <div className="flex flex-col mb-2">
                <Input width="w-72" label={'Current Password'} action={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="flex flex-col mb-3">
                <IconInput
                  type="password"
                  width="w-72"
                  label={'New Password'}
                  icon={'lock'}
                  action={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4">
                <IconInput
                  width="w-72"
                  type="password"
                  label="Repeat New Password"
                  icon="sync_lock"
                  action={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => changePassword()}
            type="email"
            className="max-w-[290px] font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
