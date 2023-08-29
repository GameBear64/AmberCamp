import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../utils/snackbars';
import { Link } from 'react-router-dom';

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

      <div className="flex bg-gray-200 items-center justify-center text-center h-screen ">
        <div>
          <img className="object-contain" src="../bam.png" />
          <h2 className="font-medium text-4xl pb-8">Amber Camp</h2>
        </div>
      </div>
    </div>
  );
}
