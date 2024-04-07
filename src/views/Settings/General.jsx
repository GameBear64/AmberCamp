import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsLayout from '@components/Layout/SettingsLayout';
import TopBar from '@components/Layout/TopBar';

import { Form, Input, MediaSelect, Select, SubmitButton, TagSelector, Textarea } from '@form/Fields';
import { MAX_LENGTH, MIN_LENGTH, REQUIRED } from '@form/validations';

import { timezones } from '@utils/enums/timezone';
import { timezones } from '@utils/enums/timezone';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { cleanObject, readFile } from '@utils/utils';

export default function General() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((response) =>
      setUserInfo(cleanObject(response, ['name', 'handle', 'email', 'biography', 'picture', 'background', 'tags', 'timezone']))
    );
  };

  const updateUserInfo = async (data) => {
    if (Object.entries(data).length == 0) return;

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
    <div>
      <div className="hidden lg:block">
        <TopBar backBtnLabel="Danger Zone" backButton="arrow_back_ios_new" actionButton={() => navigate('/settings')} />
      </div>
      <div className="m-auto flex flex-col gap-1 p-10 text-txtPrimary lg:max-w-md lg:justify-center lg:px-10">
        <Form defaultValues={userInfo} onSubmit={(data) => updateUserInfo(data)} onlyDirty>
          <SettingsLayout styles="m-auto w-full">
            <MediaSelect styles="" label="Background Picture" name="background" />
            <MediaSelect styles="" label="Profile Picture" name="picture" />
            <Input
              rules={{
                ...REQUIRED,
                ...MIN_LENGTH(3),
                ...MAX_LENGTH(30),
              }}
              label="Username"
              name="handle"
            />
            <Textarea rows="7" cols="30" label="Biography" name="biography" />
            <TagSelector width="w-full" type="text" btnText="+Add" name="tags" shouldClear label="Profile Tags" />
            <Select name="timezone" label="Timezone" options={timezones} styles="mt-2 mx-auto" />
            <SubmitButton size="small" styles="w-full" label="Save" />
          </SettingsLayout>
        </Form>
      </div>
    </div>
  );
}
