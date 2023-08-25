import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../utils/useFetch';
import { useState } from 'react';
import { errorSnackBar } from '../../../utils/snackbars';
import ButtonInput from '../../../components/Inputs/ButtonInput';

export default function DangerZoneMobile() {
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
    <div className="my-10">
      <div className="mx-8">
        <div className="flex flex-row">
          <span onClick={() => navigate('/user/settings')} className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">
            arrow_back_ios_new
          </span>
          <h1 className="font-semibold text-2xl">Danger Zone</h1>
        </div>
      </div>
      <div className="p-10">
        <button onClick={() => navigate('/user/login')} className=" flex flex-row mb-4 text-lg rounded">
          <span className="material-symbols-outlined mr-1.5 text-[27px] align-bottom">move_item</span>Log out
        </button>
        <hr />
        {active ? (
          <>
            <div className="flex mb-5 flex-col">
              <h1 className="text-lg mt-2">Delete Account</h1>
              <label className="mb-1">Please, enter your password to proceed.</label>
              <div className="flex">
                <ButtonInput
                  textColor={'text-white'}
                  actionInput={(e) => {
                    setPassword(e.target.value);
                  }}
                  buttonLabel="Delete"
                  color="bg-red-600"
                  actionButton={() => deleteUser()}
                  active={errorBorder}
                  type="password"
                />
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => setActive(!active)}
            className="text-lg mt-4 rounded py-1 px-2.5 hover:bg-red-700 bg-red-600 text-white">
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
