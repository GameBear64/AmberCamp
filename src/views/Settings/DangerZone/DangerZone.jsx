import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonInput from '@components/Form/Inputs/ButtonInput';

import { removeUser } from '@stores/user';
import { errorSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

import MobileNavBar from '../../../components/NavBar/MobileNavBar';

export default function DangerZone() {
  let [password, setPassword] = useState('');
  let [active, setActive] = useState('');
  let [errorBorder, setErrorBorder] = useState(false);
  const navigate = useNavigate();

  const deleteUser = () => {
    useFetch({
      url: 'user',
      method: 'DELETE',
      body: {
        password,
      },
    })
      .then(() => setErrorBorder(false))
      .catch(() => setErrorBorder(true));
  };
  return (
    <div className="p-10 lg:p-0">
      <div className="hidden lg:block">
        <MobileNavBar
          backBtnLabel="Danger Zone"
          backButton="arrow_back_ios_new"
          actionButton={() => navigate('/user/settings')}
        />
      </div>
      <div className="lg:px-10 lg:py-8">
        <button
          onClick={() => {
            removeUser();
            navigate('/login');
          }}
          className="mb-4 flex flex-row rounded text-lg">
          <span className="material-symbols-outlined mr-1.5 align-bottom text-[27px]">move_item</span>Log out
        </button>
        <hr className="hidden lg:block" />

        {active ? (
          <div className="mb-5 flex flex-col">
            <h1 className="mt-2 text-lg">Delete Account</h1>
            <label className="mb-1">Please, enter your password to proceed.</label>
            <ButtonInput
              textColor="text-white"
              actionInput={(e) => setPassword(e.target.value)}
              btnText="Delete"
              btnBG="bg-red-600"
              btnColor="text-white"
              actionButton={() => deleteUser()}
              invalid={errorBorder}
              inputType="password"
            />
          </div>
        ) : (
          <button
            onClick={() => setActive(!active)}
            className="rounded bg-red-600 px-2.5 py-1 text-lg text-white hover:bg-red-700 lg:mt-4">
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
