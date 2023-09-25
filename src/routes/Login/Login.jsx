import { Link, useNavigate } from 'react-router-dom';

import Form from '@form';
import InputField from '@form-inputs/Input';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

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
        <div className="text-center max-w-md m-auto flex flex-col  justify-items-center mt-52">
          <h1 className="font-medium text-4xl pb-8">Amber Camp Login</h1>
          <div className="flex flex-col space-y-4  ">
            <div className="flex flex-col text-left">
              <Form
                onSubmit={(data) => {
                  loginUser(data);
                }}>
                <InputField
                  type="email"
                  placeholder="email@ac.com"
                  name="email"
                  width="w-full"
                  label="Email"
                  styles="col-span-2"
                  styleInput="bg-gray-200 rounded p-6"
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  width="w-full"
                  label="Password"
                  styles="col-span-2 shadow-none"
                  styleInput="bg-gray-200 rounded p-6"
                />
                <button
                  type="submit"
                  className="uppercase w-full border-solid bg-orange-700 border-2 p-2 mt-5 font-semibold text-lg rounded-md text-white ">
                  Login
                </button>
                <Link to={'/user/register'} className="float-right mt-2 font-medium underline text-blue-700">
                  No account? Make one!
                </Link>
              </Form>
            </div>
          </div>
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
