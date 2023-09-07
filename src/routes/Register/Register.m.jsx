import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

export default function RegisterMobile() {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const registerUser = () => {
    useFetch({
      url: 'user/register',
      method: 'POST',
      body: {
        handle,
        email,
        password,
        confirmPassword: repeatPassword,
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
    <div className="grid m-auto grid-cols-2 h-screen lg:grid-cols-1">
      <div className="px-4">
        <div className=" text-center max-w-md m-auto flex flex-col justify-items-center mt-52">
          <h1 className=" font-medium text-4xl pb-8">Amber Camp Register</h1>
          <div className=" flex  flex-col space-y-4  ">
            <div className="flex flex-col text-left">
              <label className="font-semibold text-grey-darkest">Handler</label>
              <input
                placeholder="@handle"
                className="bg-gray-200 text-base col-span-2 rounded border-slate-600 p-3 "
                type="text"
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
              />
              <label className="font-semibold text-grey-darkest">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ac.com"
                className="bg-gray-200 text-base col-span-2 rounded border-slate-600 p-3 "
                type="text"
              />
            </div>

            <div className="flex font-semibold flex-col text-left ">
              <label className="text-grey-darkest ">Password</label>
              <div className=" flex flex-row justify-between lg:flex-col gap-4">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-gray-200  text-base border-slate-600 p-3"
                  type="password"
                />
                <input
                  placeholder="Repeat Password"
                  className="bg-gray-200  text-base border-slate-600 p-3"
                  type="password"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => registerUser()}
            className="uppercase border-solid bg-orange-700 border-2 p-2 mt-5 font-semibold text-lg rounded-md text-white ">
            Register
          </button>
          <Link to={'/user/login'} className="text-right underline mt-2 font-medium text-blue-700">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
