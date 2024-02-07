import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Form/Inputs/Button';
import SettingsLayout from '@components/Layout/SettingsLayout';
import Form from '@form';
import Input from '@form-inputs/Input';
import MediaSelect from '@form-inputs/MediaSelect';
import SelectInput from '@form-inputs/SelectInput';
import TagSelector from '@form-inputs/TagSelector';
import TextareaField from '@form-inputs/Textarea';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { cleanObject, readFile } from '@utils/utils';

import MobileNavBar from '../../../components/NavBar/MobileNavBar';

import { timezones } from './../../../utils/timezone';

export default function General() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((res) => {
      setUserInfo(
        cleanObject(res.message, ['name', 'handle', 'email', 'biography', 'picture', 'background', 'tags', 'timezone'])
      );
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
    }).then(() => {
      successSnackBar('Profile updated.');
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <MobileNavBar backBtnLabel="General" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
      <Form
        defaultValues={userInfo}
        onSubmit={(data) => {
          updateUserInfo(data);
        }}
        onlyDirty>
        <SettingsLayout>
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
            styles="mb-5 mt-2"
            width="w-80"
            type="text"
            label="Username"
            name="name"
          />
          <TextareaField styles="mt-2" rows="7" cols="30" label="Biography" name="biography" />
          <TagSelector styles="mb-5 mt-2" width="w-72" type="text" btnText="+Add" name="tags" shouldClear label="Profile Tags" />
          <SelectInput name="timezone" label="Timezone" options={timezones} styleInput="mt-2" />
          <Button type="submit" label="Save" />
        </SettingsLayout>
      </Form>
    </>
  );
}
