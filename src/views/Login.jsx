import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import { Form, Input, SubmitButton } from '@form/Fields';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { $chat } from '@stores/chat';
import { setPreferences } from '@stores/preferences';
import { setUser } from '@stores/user';

export default function Login() {
  const navigate = useNavigate();
  const { id } = useStore($chat);

  const loginUser = (data) => {
    useFetch({
      url: 'user/login',
      method: 'POST',
      body: { ...data },
    }).then((response) => {
      localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, response.jwt);
      setUser({ id: response.id });
      setPreferences({
        theme: response.theme,
        accent: response.accent,
        language: response.language,
      });
      successSnackBar("You've logged in successfully!");
      navigate(`/chat/${id}`);
    });
  };

  return (
    <div className="m-auto grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="m-auto flex w-full max-w-md flex-col justify-center text-center">
        <h1 className="pb-8 text-4xl font-medium">Amber Camp Login</h1>
        <div className="mx-5 flex flex-col text-left">
          <Form onSubmit={(data) => loginUser(data)}>
            <Input type="email" placeholder="email@ac.com" name="email" label="Email" styles="col-span-2" />
            <Input type="password" placeholder="Password" name="password" label="Password" styles="col-span-2 shadow-none" />
            <SubmitButton styles="w-full uppercase bg-red-600" label="Login" />
            <Link to={'/register'} className="float-right mt-2 font-medium text-blue-700 underline">
              No account? Make one!
            </Link>
          </Form>
        </div>
      </div>
      <div className="hidden h-screen flex-col items-center justify-center bg-neutral-200 text-center lg:flex ">
        <img className="object-contain" src="../bam.png" />
        <h2 className="pb-8 text-4xl font-medium">Amber Camp</h2>
      </div>
    </div>
  );
}
