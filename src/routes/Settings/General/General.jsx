import { useEffect, useState } from 'react';
import { useFetch } from '../../../utils/useFetch';

import { errorSnackBar, successSnackBar } from '../../../utils/snackbars';
import Form from '../../../components/Form/Form';
import { cleanObject, readFile, removeEmptyProperties } from '../../../utils/utils';

import Input from '../../../components/Form/FormInputs/Input';
import Textarea from '../../../components/Form/FormInputs/Textarea';
import TagSelector from '../../../components/Form/FormInputs/TagSelector';
import MediaSelect from '../../../components/Form/FormInputs/MediaSelect';

export default function General() {
  const [userInfo, setUserInfo] = useState({});

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        setUserInfo(cleanObject(res.message, ['name', 'handle', 'email', 'biography', 'picture', 'background', 'tags']));
      } else {
        errorSnackBar(`${res.message}`);
      }
    });
  };

  const updateUserInfo = async (data) => {
    try {
      const picture = await readFile(data?.picture);
      data.picture = picture.key;
    } catch (e) {
      if (e !== 'No file provided') {
        errorSnackBar('Error uploading image');
        console.log(e);
      }
    }

    try {
      const background = await readFile(data?.background);
      data.background = background.key;
    } catch (e) {
      if (e !== 'No file provided') {
        errorSnackBar('Error uploading image');
        console.log(e);
      }
    }

    await useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: { ...data },
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Profile updated.');
      } else {
        errorSnackBar(`${res.message}!`);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-10 my-3">
      <Form defaultValues={userInfo} onSubmit={(data) => updateUserInfo(removeEmptyProperties(data))} onlyDirty>
        <MediaSelect styles="mb-5" width="w-80" label="Background Picture" name="background" />
        <MediaSelect styles="mb-5" width="w-80" label="Profile Picture" name="picture" />
        <Input
          rules={{
            required: 'This field is required.',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters!',
            },
            maxLength: {
              value: 30,
              message: "Username can't be longer than 3 characters!",
            },
          }}
          styles="mb-5"
          width="w-80"
          type="text"
          label="Username"
          name="name"
        />
        <Textarea styles="mb-5" rows="6" cols="30" label="Biography" name="biography" />
        <TagSelector styles="mb-5" width="w-72" type="text" btnText="+ Add" name="tags" shouldClear />
        <button className="font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 mt-5 text-[17px]">Submit</button>
      </Form>
    </div>
  );
}
