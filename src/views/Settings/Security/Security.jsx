import { useNavigate } from 'react-router-dom';

import Button from '@components/Form/Inputs/Button';

import { IconField } from '@form/Fields';
import Form from '@form/Form';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

import MobileNavBar from '../../../components/NavBar/MobileNavBar';

export default function Security() {
  const navigate = useNavigate();

  const changePassword = (fields) => {
    useFetch({
      url: `user/settings/resetPassword`,
      method: 'POST',
      body: fields,
    }).then((res) => {
      localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.jwt);
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
        <MobileNavBar backBtnLabel="Security" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
      </div>
      <div className="m-auto flex flex-col gap-1 p-10 lg:max-w-md lg:justify-center lg:px-10">
        <h3 className="mb-3 text-xl">Change Email</h3>
        <div className="mb-2 flex max-w-md flex-col">
          <Form onSubmit={(e) => changeEmail(e)}>
            <div className="mb-2">
              <IconField name="email" type="email" width="w-72 lg:w-full" label="Change Email" icon="mail" />
            </div>
            <Button size="small" styles="lg:w-full" label="Change Email" />
          </Form>
        </div>
        <hr />
        <h3 className="my-3 text-xl">Change Password</h3>
        <Form onSubmit={(e) => changePassword(e)}>
          <div className="mb-2 flex flex-col gap-3">
            <IconField name="password" type="password" width="w-72 lg:w-full" label="Current Password" />
            <IconField name="newPassword" type="password" width="w-72 lg:w-full" label="New Password" icon="lock" />
            <IconField
              name="confirmPassword"
              type="password"
              width="w-72 lg:w-full"
              label="Repeat New Password"
              icon="sync_lock"
            />
          </div>
          <Button size="small" styles="lg:w-full" label="Change Password" />
        </Form>
      </div>
    </>
  );
}
