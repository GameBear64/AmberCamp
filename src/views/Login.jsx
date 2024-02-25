import { Link, useNavigate } from 'react-router-dom';

import Button from '@components/Form/Inputs/Button';
import Form from '@form';
import InputField from '@form-inputs/Input';
import { setUser } from '@stores/user';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

export default function Login() {
  const navigate = useNavigate();

  const loginUser = (data) => {
    useFetch({
      url: 'user/login',
      method: 'POST',
      body: {
        ...data,
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, res.message.jwt);
        setUser({ id: res.message.id });
        successSnackBar("You've logged in successfully!");
        navigate(`/chat`);
      } else {
        errorSnackBar(`${res.message}!`);
      }
    });
  };

  return (
    <div className="m-auto grid h-screen grid-cols-2 lg:grid-cols-1">
      <div className="m-auto flex w-full max-w-md flex-col justify-center text-center">
        <h1 className="pb-8 text-4xl font-medium">Amber Camp Login</h1>
        <div className="flex flex-col text-left lg:mx-5">
          <Form onSubmit={(data) => loginUser(data)}>
            <InputField type="email" placeholder="email@ac.com" name="email" label="Email" styles="col-span-2" />
            <InputField type="password" placeholder="Password" name="password" label="Password" styles="col-span-2 shadow-none" />
            <Button styles="w-full uppercase" label="Login" />
            <Link to={'/register'} className="float-right mt-2 font-medium text-blue-700 underline">
              No account? Make one!
            </Link>
          </Form>
        </div>
      </div>
      <div className="flex h-screen flex-col items-center justify-center bg-neutral-200 text-center lg:hidden ">
        <img className="object-contain" src="../bam.png" />
        <h2 className="pb-8 text-4xl font-medium">Amber Camp</h2>
      </div>
    </div>
  );
}
