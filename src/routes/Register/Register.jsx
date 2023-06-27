import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../utils/snackbars';

export default function Register() {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatRassword, setRepeatPassword] = useState('');

  const registerUser = () => {
    useFetch({
      url: 'user/register',
      method: 'POST',
      body: {
        handle,
        email,
        password,
        confirmPassword: repeatRassword,
      },
    }).then((res) => {
      if (res.status === 201) {
        successSnackBar(`Your registration was successful!`);
        localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.message.jwt);
        navigate('/chat');
      } else {
        errorSnackBar(`${res.message}!`);
      }
    });
  };

  return (
    <div className=" text-center max-w-md grid m-auto  justify-items-center mt-48 ">
      <h1 className="text-slate-500 text-4xl pb-8">Amber Camp Register</h1>
      <div className=" grid  text-center grid-cols-2  gap-4">
        <input
          placeholder="@handle"
          className=" border-solid border-4 rounded col-span-2  border-slate-600 p-2 "
          type="text"
          onChange={(e) => {
            setHandle(e.target.value);
          }}
        />
        <input
          placeholder="email@ac.com"
          className="  border-solid border-4 col-span-2 rounded border-slate-600 p-2 "
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          className="border-solid border-4 rounded  border-slate-600 p-2"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          placeholder="passsword again"
          className="border-solid border-4  border-slate-600 p-2"
          type="password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <button onClick={() => registerUser()} className="border-solid border-4 p-2 rounded-3xl  border-slate-600">
          Register
        </button>
      </div>
    </div>
  );
}
