import { useEffect, useState } from 'react';
import { useFetch } from '../../../utils/useFetch';
import { useUpload } from '../../../utils/useUpload';

import { errorSnackBar, successSnackBar } from '../../../utils/snackbars';
import ButtonInput from '../../../components/Form/Inputs/ButtonInput';
import FormInputs from '../../../components/Form/Form';
import { Field } from 'react-final-form';

import InputField from '../../../components/Form/FormInputs/Input';

export default function General() {
  const [userInfo, setUserInfo] = useState({});
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({ id: null, key: null, mimetype: null });
  const [errorUsername, setErrorUsername] = useState(false);

  function readFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      useUpload({
        data: event.target.result.split(';base64,').pop(),
        name: file.name,
        mimetype: file.type,
      }).then((data) => setImage(data));
    };
  }

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        setUserInfo(res.message);
        setTags(res.message.tags);
      } else {
        errorSnackBar(`${res.message}`);
      }
    });
  };

  const updateUserInfo = (data) => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: { ...data, tags },
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
    <div className="p-10">
      <div className="my-3">
        <p className="text-base mb-1">Profile Picture</p>
        <input type="file" onChange={(event) => readFile(event.target.files[0] || null)} />
        <br />

        {(image?.mimetype?.includes('image') || image?.mimetype?.includes('video')) && image?.key && (
          <img src={`http//:localhost:3030/recourse/${image?.key}?size=250`} alt="" />
        )}
      </div>
      <div className="my-3">
        <p className="text-base mb-1">Background Picture</p>
        <input type="file" onChange={(event) => readFile(event.target.files[0] || null)} />
        <br />

        {(image?.mimetype?.includes('image') || image?.mimetype?.includes('video')) && image?.key && (
          <img src={`http//:localhost:3030/recourse/${image?.key}?size=250`} alt="" />
        )}
      </div>
      <div className="my-3">
        {image?.mimetype?.includes('image') && image?.key && (
          <img src={`http//:localhost:3030/recourse/${image?.key}?size=250`} alt="" />
        )}
        <FormInputs
          onSubmit={(e) => {
            console.log(e);
            updateUserInfo(e);
            console.log(userInfo.biography);
          }}>
          <InputField
            stylesDiv={'flex flex-row text-center'}
            type="text"
            invalid={errorUsername}
            label="Username"
            defauldValue={userInfo.handle}
            name="handle"
          />

          <div className="my-3">
            <p className="text-base mb-1">Biography</p>
            <div className="flex flex-row text-center">
              <Field
                name="biography"
                render={({ input }) => {
                  return (
                    <textarea
                      className="shadow-slate-100 text-black rounded-lg p-1 text-lg shadow-inner border border-slate-200 "
                      type="text"
                      defaultValue={userInfo.biography}
                      rows="6"
                      cols="60"
                      {...input}></textarea>
                  );
                }}></Field>
            </div>
          </div>

          <div className="my-4 max-w-lg">
            <h1 className="font-semibold text-xl">Tags</h1>
            <ButtonInput
              buttonLabel="Add Tag"
              shouldClear
              actionButton={(tag) => {
                if (tags.some((t) => t === tag)) {
                  errorSnackBar('Cant have duplicate tags');
                } else {
                  setTags([...tags, tag]);
                }
              }}
            />

            <div className="flex flex-wrap">
              {tags?.map((tag) => (
                <div key={tag} className="border flex flex-row shadow-md border-slate-300 rounded-xl m-1 ">
                  <span
                    onClick={() => {
                      setTags((prev) => prev.filter((el) => el !== tag));
                    }}
                    className="material-symbols-outlined m-2">
                    close
                  </span>
                  <p className="p-2.5 font-semibold text-center">{tag}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">Submit</button>
        </FormInputs>
      </div>
    </div>
  );
}
