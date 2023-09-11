import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Form/Inputs/Button';
import Form from '@form';
import Input from '@form-inputs/Input';
import MediaSelect from '@form-inputs/MediaSelect';
import SelectInput from '@form-inputs/SelectInput';
import TagSelector from '@form-inputs/TagSelector';
import TextareaField from '@form-inputs/Textarea';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { cleanObject, readFile, removeEmptyProperties } from '@utils/utils';

import TopBar from '../../../components/TopBar/TopBar';

import { timezones } from './../../../utils/timezone';

export default function General() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

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
    <>
      <TopBar backBtnLable="Preferences" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />
      <div className="p-10 my-3">
        <Form
          defaultValues={userInfo}
          onSubmit={(data) => {
            console.log('from sumbit', data);
            updateUserInfo(removeEmptyProperties(data));
          }}
          onlyDirty>
          <div className="flex flex-col gap-2">
            <div>
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
            </div>
            <div className="max-w-md">
              <TagSelector styles="mb-5 mt-2" width="w-72" type="text" btnText="+ Add" name="tags" shouldClear />
              <SelectInput name="timezone" label="Timezone" options={timezones} styleInput="mt-2" />
            </div>
          </div>
          <Button type="submit" label="Save" />
        </Form>
      </div>
    </>
  );
}
