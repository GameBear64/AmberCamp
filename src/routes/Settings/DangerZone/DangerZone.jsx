import { useFetch } from '../../../utils/useFetch';
import { useState } from 'react';
import { errorSnackBar } from '../../../utils/snackbars';
import { useNavigate } from 'react-router-dom';
import ButtonInput from '../../../components/Form/Inputs/ButtonInput';

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
    <div className="p-10">
      <button onClick={() => navigate('/user/login')} className=" flex flex-row mb-4 text-lg rounded">
        <span className="material-symbols-outlined mr-1.5 text-[27px] align-bottom">move_item</span>Log out
      </button>
      {active ? (
        <div className="flex mb-5 flex-col">
          <label className="mb-1">Please, enter your password to proceed.</label>
          <div className="flex">
            <ButtonInput
              textColor={'text-white'}
              actionInput={(e) => {
                setPassword(e.target.value);
              }}
              btnText="Delete Account"
              btnBG="bg-red-600"
              btnColor="text-white"
              actionButton={() => deleteUser()}
              invalid={errorBorder}
            />
          </div>
        </div>
      ) : (
        <button onClick={() => setActive(!active)} className="text-lg rounded py-1 px-2.5 hover:bg-red-700 bg-red-600 text-white">
          Delete Account
        </button>
      )}
    </div>
  );
}
