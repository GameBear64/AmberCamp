import { useNavigate } from 'react-router-dom';
import { useFetch } from './../../utils/useFetch';
import { errorSnackBar, successSnackBar } from '../../utils/snackbars';
import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/FormInputs/Input';

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
    <div className="grid m-auto grid-cols-2 h-screen lg:grid-cols-1">
      <div className="px-4">
        <div className=" text-center max-w-md m-auto flex flex-col justify-items-center mt-52">
          <h1 className=" font-medium text-4xl pb-8">Amber Camp Register</h1>
          <div className=" flex  flex-col space-y-4  ">
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
              <div className="flex font-semibold flex-col text-left">
                <label className="text-grey-darkest ">Password</label>
                <div className="flex flex-row justify-between lg:flex-col gap-4">
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
              <button className="uppercase border-solid w-full bg-orange-700 border-2 p-2 mt-5 font-semibold text-lg rounded-md text-white ">
                Register
              </button>
              <Link to={'/user/login'} className="float-right underline mt-2 font-medium text-blue-700">
                Already have an account?
              </Link>
            </Form>
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
