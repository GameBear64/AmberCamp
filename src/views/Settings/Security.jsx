import { useNavigate } from 'react-router-dom';

import Button from '@components/Form/Inputs/Button';
import FormInputs from '@form';
import IconInputField from '@form-inputs/IconInput';
import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

import TopBar from '../../components/TopBar/TopBar';

export default function Security() {
  const navigate = useNavigate();

  const changePassword = (fields) => {
    useFetch({
      url: `user/settings/resetPassword`,
      method: 'POST',
      body: fields,
    }).then((response) => {
      localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, response.jwt);
      successSnackBar('Your password was changed successfully!');
    });
  };

  const changeEmail = (newEmail) => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: newEmail,
    }).then(() => successSnackBar('Your email was changed successfully!'));
  };

  return (
    <>
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Security" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="m-auto flex flex-col gap-1 p-10 lg:max-w-md lg:justify-center lg:px-10">
        <h3 className="mb-3 text-xl">Change Email</h3>
        <div className="mb-2 flex max-w-md flex-col">
          <FormInputs
            onSubmit={(e) => {
              changeEmail(e);
            }}>
            <div className="mb-2">
              <IconInputField name="email" type="email" width="w-72 lg:w-full" label="Change Email" icon="mail" />
            </div>
            <Button size="small" styles="lg:w-full" label="Change Email" />
          </FormInputs>
        </div>
        <hr />
        <h3 className="my-3 text-xl">Change Password</h3>
        <FormInputs
          onSubmit={(e) => {
            changePassword(e);
          }}>
          <div className="mb-2 flex flex-col gap-3">
            <IconInputField name="password" type="password" width="w-72 lg:w-full" label="Current Password" />
            <IconInputField name="newPassword" type="password" width="w-72 lg:w-full" label="New Password" icon="lock" />
            <IconInputField
              name="confirmPassword"
              type="password"
              width="w-72 lg:w-full"
              label="Repeat New Password"
              icon="sync_lock"
            />
          </div>
          <Button size="small" styles="lg:w-full" label="Change Password" />
        </FormInputs>
      </div>
    </>
  );
}
