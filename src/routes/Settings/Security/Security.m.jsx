import { useFetch } from '../../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../../utils/snackbars';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconInput from '../../../components/Inputs/IconInput';
import Input from '../../../components/Inputs/Input';

export default function SecurityMobile() {
  let [newPassword, setNewPassword] = useState('');
  let [currentPassword, setCurrentPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

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
                onClick={() => {
                  changeEmail();
                }}
                type="email"
                className="mt-2 max-w-md font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
                Change Email
              </button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col my-5">
            <h3 className="text-xl mb-3">Change Password</h3>
            <div className="flex max-w-md flex-col">
              <div className="flex flex-col mb-2">
                <Input width="w-full" label={'Current Password'} action={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="flex max-w-md flex-col mb-3">
                <IconInput width="w-full" label={'New Password'} icon={'lock'} action={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="flex max-w-md flex-col mb-2">
                <IconInput
                  width="w-full"
                  label="Repeat New Password"
                  icon="sync_lock"
                  action={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  changePassword();
                }}
                type="email"
                className="mt-2 max-w-md font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
