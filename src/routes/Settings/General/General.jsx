import { useEffect, useState } from 'react';

import Button from '@components/Form/Inputs/Button';
import Form from '@form';
import Input from '@form-inputs/Input';
import MediaSelect from '@form-inputs/MediaSelect';
import SelectInput from '@form-inputs/SelectInput';
import TagSelector from '@form-inputs/TagSelector';
import Textarea from '@form-inputs/Textarea';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { cleanObject, readFile, removeEmptyProperties } from '@utils/utils';

export default function General() {
  const [userInfo, setUserInfo] = useState({});

  const timezones = [
    '-12:00',
    '-11:30',
    '-11:00',
    '-10:30',
    '-10:00',
    '-09:30',
    '-09:00',
    '-08:30',
    '-08:00',
    '-07:30',
    '-07:00',
    '-06:30',
    '-06:00',
    '-05:30',
    '-05:00',
    '-04:30',
    '-04:00',
    '-03:30',
    '-03:00',
    '-02:30',
    '-02:00',
    '-01:30',
    '-01:00',
    '-00:30',
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
  ];

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        setUserInfo(
          cleanObject(res.message, ['name', 'handle', 'email', 'biography', 'picture', 'background', 'tags', 'timezone'])
        );
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
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }

    try {
      const background = await readFile(data?.background);
      data.background = background.key;
    } catch (e) {
      if (e !== 'No file provided') {
        errorSnackBar('Error uploading image');
        // eslint-disable-next-line no-console
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
        <div className="flex flex-row gap-28">
          <div>
            <MediaSelect styles="mb-5" width="w-80" label="Background Picture" name="background" />
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
              styles="mb-5 mt-2"
              width="w-80"
              type="text"
              label="Username"
              name="name"
            />
            <Textarea styles="mb-2 mt-2" rows="6" cols="30" label="Biography" name="biography" />
          </div>
          <div className="max-w-md">
            <MediaSelect styles="mb-5" width="w-80" label="Profile Picture" name="picture" />
            <TagSelector styles="mb-5 mt-2" width="w-72" type="text" btnText="+ Add" name="tags" shouldClear />
            <SelectInput name="timezone" label="Timezone" options={timezones} styleInput="mt-2" />
          </div>
        </div>
        <Button label="Save" />
      </Form>
    </div>
  );
}
