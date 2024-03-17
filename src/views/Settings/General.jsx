import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsLayout from '@components/Layout/SettingsLayout';
import { Form, Input, MediaSelect, Select, SubmitButton, TagSelector, Textarea } from '@form/Fields';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { cleanObject, readFile } from '@utils/utils';

import TopBar from '../../components/TopBar/TopBar';
import { timezones } from '../../utils/timezone';

export default function General() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((response) => setUserInfo(cleanObject(
        response, 
        ['name', 'handle', 'email', 'biography', 'picture', 'background', 'tags', 'timezone']
      ))
    );
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
    }).then(() => successSnackBar('Profile updated.'));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="m-auto flex flex-col gap-1 p-10 lg:max-w-md lg:justify-center lg:px-10">
        <Form defaultValues={userInfo} onSubmit={(data) => updateUserInfo(data)} onlyDirty>
          <SettingsLayout styles="w-3/6 m-auto lg:w-full">
            <MediaSelect styles="" label="Background Picture" name="background" />
            <MediaSelect styles="" label="Profile Picture" name="picture" />
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
              width="w-80"
              label="Username"
              name="handle"
            />

            <Textarea rows="7" cols="30" label="Biography" name="biography" />
            <TagSelector width="w-full" type="text" btnText="+Add" name="tags" shouldClear label="Profile Tags" />
            <Select name="timezone" label="Timezone" options={timezones} styleInput="mt-2" />
            <SubmitButton size="small" styles="lg:w-full" label="Save" />
          </SettingsLayout>
        </Form>
      </div>
    </>
  );
}
