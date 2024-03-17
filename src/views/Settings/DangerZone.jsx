import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from '@components/TopBar/TopBar';
import { ButtonField, Form } from '@form/Fields';
import { removeUser } from '@stores/user';
import { errorSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

import useFetch from '@utils/useFetch';

export default function DangerZone() {
  let [password, setPassword] = useState('');
  let [active, setActive] = useState('');
  const navigate = useNavigate();

  const deleteUser = () => {
    useFetch({
      url: 'user',
      method: 'DELETE',
      body: {
        password,
      },
    });
  };
  return (
    <div className="p-10 lg:p-0">
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="lg:px-10 lg:py-8">
        <button
          onClick={() => {
            removeUser();
            navigate('/login');
          }}
          className="mb-4 flex flex-row rounded text-lg text-txtPrimary">
          <Icon styles="mr-1.5 align-bottom text-[27px]" icon="move_item" />
          Log out
        </button>
        <hr className="hidden lg:block" />

        {active ? (
          <div className="mb-5 flex flex-col">
            <h1 className="mt-2 text-lg">Delete Account</h1>
            <label className="mb-1">Please, enter your password to proceed.</label>
            <ButtonField
              textColor="text-white"
              actionInput={(e) => setPassword(e.target.value)}
              btnText="Delete"
              btnBG="bg-primary-shade"
              btnColor="text-white"
              actionButton={() => deleteUser()}
              inputType="password"
            />
          </div>
        ) : (
          <button
            onClick={() => setActive(!active)}
            className="rounded bg-primary-shade px-2.5 py-1 text-lg text-white hover:bg-primary-dark lg:mt-4">
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
