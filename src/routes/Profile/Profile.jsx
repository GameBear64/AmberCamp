import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';

import Notes from '../../components/Notes/Notes';
import Layout from '../../components/Layout/Layout';
import ButtonInput from '../../components/Form/Inputs/ButtonInput';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

import { useFetch } from '../../utils/useFetch';
import { getCurrentUserId, removeEmptyProperties } from '../../utils/utils';

import { successSnackBar } from '../../utils/snackbars';
import QuillSection from './QuillSection';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [value, setValue] = useState(
    `<p>👋🏻Hi there, my name is undefined</p><p>I need <strong>BIG</strong> cock for madam</p><p><br></p><p><br></p><blockquote>Also im like the coolest guy ever</blockquote><h1 class="ql-align-center">HEo world</h1><p class="ql-align-center">Its actually hello but whatever</p><pre class="ql-syntax" spellcheck="false">E = MC^2\n</pre>`
  );
  const [disable, setDisable] = useState(true);
  let { id } = useParams();

  const getUser = () => {
    useFetch({
      url: `user/${id || getCurrentUserId()}`,
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        setUserInfo(res.message);
      } else {
        // For the devs to debug
        console.log(res.message);
      }
    });
  };

  const updateUser = (updateObject) => {
    useFetch({
      url: `user/${id || getCurrentUserId()}`,
      method: 'POST',
      body: removeEmptyProperties(updateObject),
    }).then(() => getUser());
  };

  const updateDescription = (description) => {
    useFetch({
      url: 'user/settings',
      method: 'PATCH',
      body: { description },
    }).then((res) => {
      if (res.status === 200) {
        successSnackBar('Profile updated.');
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  let memberDate = userInfo?.created;
  memberDate = memberDate?.split('T')[0];

  return (
    <Layout
      left={
        <div className="my-10">
          <div className="mx-8">
            <h1 className="font-semibold text-2xl">Notes</h1>
            <ButtonInput
              label={'+Add'}
              color="bg-gray-100"
              shouldClear
              actionButton={(newNote) => {
                updateUser({ notes: [...userInfo.notes, newNote] });
              }}
            />
            <>
              {userInfo?.notes?.map((note, i) => (
                <Notes
                  key={i}
                  text={note}
                  onDelete={() => {
                    updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
                  }}
                  onEdit={() => {
                    // maybe delete the note and put it back in the button input? idk man
                    // go wild :]
                  }}
                />
              ))}
            </>
          </div>
        </div>
      }
      right={
        <>
          <section
            className="h-60 shadow-md rounded-b bg-gray-700 bg-center bg-cover"
            style={{
              backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
            }}>
            <section className="relative flex flex-row pt-36 mx-4 ">
              <img
                src={userInfo?.picture ? `http://localhost:3030/recourse/${userInfo?.picture}?size=250` : '../profilePic.jpeg'}
                alt="center image"
                className="h-48 border-solid shadow-md border-4 border-white  mx-2.5 rounded-full"
              />
              <div className="mt-24">
                <h3 className="font-semibold text-2xl">{userInfo?.name || userInfo?.handle}</h3>
                <h3 className="text-lg">@{userInfo?.handle}</h3>
              </div>
            </section>
          </section>
          <section className="grid grid-cols-3 grid-rows-1 gap-0 ml-8">
            <div className="mt-32 col-span-2">
              <QuillSection userId={id} value={userInfo.description} setValue={updateDescription} />
            </div>
            <section className="overflow-y-auto overflow-x-hidden col-span-1">
              <div className="shadow-md p-10">
                {id !== getCurrentUserId() && (
                  <div className="mb-4 flex flex-wrap font-semibold gap-2 float-left ">
                    <button className="border shadow-md bg-slate-50 py-1 px-2 rounded-lg">Message</button>
                    <button className="border shadow-md bg-sky-700 text-white py-1 px-2 rounded-lg">Add friend</button>
                    <button className="border shadow-md bg-red-700 text-white py-1 px-2 rounded-lg">Block</button>
                  </div>
                )}
                <h3 className="font-semibold block">Biography</h3>
                <p className="text-lg py-4 w-fit">{userInfo?.biography}</p>
                <hr className="m-4" />
                <h2 className="text-slate-600 font-semibold uppercase ">Member since: {memberDate}</h2>
                <p className="uppercase text-slate-600 font-semibold text-xs mb-3">
                  time zone: {new Date().getHours()}:{new Date().getMinutes()}
                </p>
                <hr className="m-4" />
                <h3 className="font-semibold">Interests</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {userInfo?.tags?.map((tag, i) => (
                    <div key={i} className="border shadow-md border-slate-300 rounded-xl m-1 ">
                      <p className="p-2.5 font-semibold text-center">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </>
      }
    />
  );
}
