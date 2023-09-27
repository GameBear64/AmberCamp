import { Link, useNavigate } from 'react-router-dom';

import Form from '@form';
import InputField from '@form-inputs/Input';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';

export default function Register() {
  const navigate = useNavigate();

  const registerUser = (data) => {
    useFetch({
      url: 'user/register',
      method: 'POST',
      body: {
        ...data,
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
    <div className="m-auto grid h-screen grid-cols-2 lg:grid-cols-1">
      <div className="px-4">
        <div className="m-auto mt-52 flex max-w-md flex-col justify-items-center text-center">
          <h1 className="pb-8 text-4xl font-medium">Amber Camp Register</h1>
          <div className="flex flex-col space-y-4">
            <Form onSubmit={(data) => registerUser(data)}>
              <div className="flex flex-col text-left">
                <InputField
                  type="text"
                  placeholder="@handle"
                  name="handle"
                  width="w-full"
                  label="Handle"
                  styles="col-span-2"
                  styleInput="bg-gray-200 rounded p-5 text-base"
                />
                <InputField
                  type="email"
                  placeholder="email@ac.com"
                  name="email"
                  width="w-full"
                  label="Email"
                  styles="col-span-2"
                  styleInput="bg-gray-200 rounded p-5 text-base"
                />
              </div>
              <div className="flex flex-col text-left font-semibold">
                <label className="text-grey-darkest ">Password</label>
                <div className="flex flex-row justify-between gap-4 lg:flex-col">
                  <InputField
                    type="password"
                    placeholder="Password"
                    name="password"
                    width="w-full"
                    styles="col-span-2"
                    styleInput="bg-gray-200 rounded p-5 text-base"
                  />
                  <InputField
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    width="w-full"
                    styles="col-span-2"
                    styleInput="bg-gray-200 rounded p-5 text-base"
                  />
                </div>
              </div>
              <button className="mt-5 w-full rounded-md border-2 border-solid bg-orange-700 p-2 text-lg font-semibold uppercase text-white">
                Register
              </button>
              <Link to={'/user/login'} className="float-right mt-2 font-medium text-blue-700 underline">
                Already have an account?
              </Link>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center bg-gray-200 text-center">
        <div>
          <img className="object-contain" src="../bam.png" />
          <h2 className="pb-8 text-4xl font-medium">Amber Camp</h2>
        </div>
      </div>
    </div>
  );
}
