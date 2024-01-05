import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonInput from '@components/Form/Inputs/ButtonInput';
import { errorSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

import TopBar from '../../../components/TopBar/TopBar';

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
    }).then((res) => {
      if (res.status === 201) {
        setErrorBorder(false);
      } else {
        setErrorBorder(true);
        errorSnackBar(`${res.message}!`);
      }
    });
  };
  return (
    <div className="p-10 lg:p-0">
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
      </div>
      <div className="lg:px-10 lg:py-8">
        <button
          onClick={() => {
            localStorage.removeItem('jwt');
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
              actionInput={(e) => {
                setPassword(e.target.value);
              }}
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