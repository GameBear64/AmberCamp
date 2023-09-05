import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../utils/snackbars';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../../utils/utils';
import Input from '../../components/Form/Inputs/Input';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    useFetch({
      url: 'user/login',
      method: 'POST',
      body: {
        email,
        password,
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.message.jwt);
        successSnackBar('You have logged in successfully!');
        navigate(`/user/${getCurrentUserId()}`);
      } else {
        errorSnackBar(`${res.message}!`);
      }
    });
  };

  return (
    <div className="grid m-auto grid-cols-2 h-screen lg:grid-cols-1">
      <div className="px-4">
        <div className=" text-center max-w-md m-auto flex flex-col  justify-items-center mt-52">
          <h1 className="font-medium text-4xl pb-8">Amber Camp Login</h1>
          <div className="flex flex-col space-y-4  ">
            <div className="flex flex-col text-left">
              <label className="font-semibold text-grey-darkest">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ac.com"
                className="bg-gray-200 text-base col-span-2 rounded border-slate-600 p-3 "
                type="text"
              />
              <Input
                type="text"
                placeholder="email@ac.com"
                width="w-full"
                styles="bg-gray-200 text-base col-span-2 rounded border-slate-600 p-3"
              />
            </div>
            <div className="flex font-semibold flex-col text-left">
              <label className="text-grey-darkest">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-gray-200  text-base border-slate-600 p-3"
                type="password"
              />
            </div>
          </div>
          <button
            onClick={() => loginUser()}
            className="uppercase border-solid bg-orange-700 border-2 p-2 mt-5 font-semibold text-lg rounded-md text-white ">
            Login
          </button>
          <Link to={'/user/register'} className="text-right mt-2 font-medium underline text-blue-700">
            No account? Make one!
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
