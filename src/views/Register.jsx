import { Link, useNavigate } from 'react-router-dom';

import { Form, Input, SubmitButton } from '@form/Fields';

import { setUser } from '@stores/user';
import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

export default function Register() {
  const navigate = useNavigate();

  const registerUser = (data) => {
    useFetch({
      url: 'user/register',
      method: 'POST',
      body: { ...data },
    }).then((response) => {
      localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, response.jwt);
      setUser({ id: response.id });
      successSnackBar(`Your registration was successful!`);
      navigate('/chat');
    });
  };

  return (
    <div className="m-auto grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="m-auto flex w-full max-w-md flex-col justify-center justify-items-center text-center">
        <h1 className="pb-8 text-4xl font-medium">Amber Camp Register</h1>
        <div className="mx-5 flex flex-col text-left">
          <Form onSubmit={(data) => registerUser(data)}>
            <Input placeholder="@handle" name="handle" label="Handle" styles="col-span-2" />
            <Input
              type="email"
              placeholder="email@ac.com"
              name="email"
              label="Email"
              styles="col-span-2"
            />
            <Input type="password" placeholder="Password" label="Password" name="password" styles="col-span-2" />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              styles="col-span-2"
            />
            <SubmitButton styles="w-full uppercase bg-red-600" label="Register" />
            <Link to={'/login'} className="float-right mt-2 font-medium text-blue-700 underline">
              Already have an account?
            </Link>
          </Form>
        </div>
      </div>
      <div className="hidden h-screen flex-col items-center justify-center bg-neutral-200 text-center lg:flex">
        <img className="object-contain" src="../bam.png" />
        <h2 className="pb-8 text-4xl font-medium">Amber Camp</h2>
      </div>
    </div>
  );
}
