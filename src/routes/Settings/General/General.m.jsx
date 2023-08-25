import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetch } from '../../../utils/useFetch';
import { useUpload } from '../../../utils/useUpload';
import { useState } from 'react';
import { errorSnackBar, successSnackBar } from '../../../utils/snackbars';
import Input from './../../../components/Inputs/Input';

export default function GeneralMobile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
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
      } else {
        errorSnackBar(`${res.message.error}!`);
      }
    });
  };

  const updateUserInfo = () => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: {
        name: username,
        biography: bio,
        picture: 'string',
        background: 'string',
      },
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
    setUsername(userInfo?.name);
    setBio(userInfo?.biography);
  }, []);
  return (
    <div className="my-10">
      <div className="mx-8">
        <div className="flex flex-row">
          <span onClick={() => navigate('/user/settings')} className="material-symbols-outlined align-bottom pt-1 mr-2 text-xl">
            arrow_back_ios_new
          </span>
          <h1 className="font-semibold text-2xl">General</h1>
        </div>
      </div>
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

          <div className="flex flex-row text-center">
            <Input
              type="text"
              invalid={errorUsername}
              label="Username"
              defauldValue={userInfo.handle}
              action={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="my-3">
          <p className="text-base mb-1">Biography</p>
          <div className="flex flex-row text-center">
            <textarea
              className="shadow-slate-100 text-black rounded-lg p-1 text-lg shadow-inner border border-slate-200 "
              type="text"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              defaultValue={userInfo.biography}
              rows="6"
              cols="60"></textarea>
          </div>
        </div>
        <button
          onClick={() => {
            updateUserInfo();
            updateUserInfo();
            if (!username || username.length <= 3) {
              setErrorUsername(true);
            } else {
              setErrorUsername(false);
            }
          }}
          className="font-semibold text-white shadow-md rounded bg-orange-700 py-1 px-2 text-[17px]">
          Submit
        </button>
      </div>
    </div>
  );
}
