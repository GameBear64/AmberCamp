import { useNavigate } from 'react-router-dom';

import TopBar from '@components/Layout/TopBar';

import { Form, IconField, SubmitButton } from '@form/Fields';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

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
    <div>
      <div className="block lg:hidden">
        <TopBar backBtnLabel="Security" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="m-auto flex flex-col gap-1 p-10 lg:max-w-md lg:justify-center lg:px-10">
        <h3 className="mb-3 text-xl text-txtPrimary">Change Email</h3>
        <div className="mb-2 flex max-w-md flex-col">
          <Form onSubmit={(e) => changeEmail(e)}>
            <div className="mb-2">
              <IconField name="email" type="email" label="Change Email" icon="mail" />
            </div>
            <SubmitButton size="small" styles="w-full" label="Change Email" />
          </Form>
        </div>
        <hr />
        <h3 className="my-3 text-xl text-txtPrimary">Change Password</h3>
        <Form onSubmit={(e) => changePassword(e)}>
          <div className="mb-2 flex flex-col gap-3">
            <IconField name="password" type="password" label="Current Password" />
            <IconField name="newPassword" type="password" label="New Password" icon="lock" />
            <IconField name="confirmPassword" type="password" label="Repeat New Password" icon="sync_lock" />
          </div>
          <SubmitButton size="small" styles="w-full" label="Change Password" />
        </Form>
      </div>
    </div>
  );
}
