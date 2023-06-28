import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../utils/snackbars';

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
        successSnackBar('You have logged in successfully');
        navigate('/chat');
      } else {
        errorSnackBar(`${res.message}!`);
      }
    });
  };

  return (
    <div className=" text-center max-w-md grid m-auto  justify-items-center mt-48 ">
      <h1 className="text-slate-500 text-4xl pb-8">Amber Camp Login</h1>
      <div className=" grid  text-center grid-cols-2  gap-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@ac.com"
          className="  border-solid border-4 col-span-2 rounded border-slate-600 p-2 "
          type="text"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="passsword"
          className="border-solid border-4 border-slate-600 p-2"
          type="password"
        />
        <button onClick={() => loginUser()} className="border-solid border-4 p-2 rounded-3xl  border-slate-600">
          Login
        </button>
      </div>
    </div>
  );
}
