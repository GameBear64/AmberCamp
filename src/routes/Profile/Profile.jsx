import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Notes from '@components/Notes/Notes';
import Form from '@form';
import ButtonInputField from '@form-inputs/ButtonInput';
import Layout from '@layout';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId, removeEmptyProperties } from '@utils/utils';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import QuillSection from './QuillSection';

import 'react-quill/dist/quill.snow.css';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [editNote, setEditNote] = useState('');
  const [rotate, setRotate] = useState(false);
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
        // eslint-disable-next-line no-console
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
  }, [id]);

  let memberDate = userInfo?.createdAt;
  if (memberDate) {
    memberDate = new Date(userInfo?.createdAt).toLocaleString('en-GB', {
      dateStyle: 'short',
    });
  }

  return (
    <Layout
      left={
        <div className="my-10">
          <div className="mx-8">
            <h1 className="font-semibold text-2xl">
              Notes
              <span
                onClick={() => {
                  setRotate(!rotate);
                  updateUser({ notes: userInfo?.notes.reverse() });
                }}
                className={`material-symbols-outlined cursor-pointer align-bottom ml-1 mb-1 ${rotate && 'rotate-180'} `}>
                sort
              </span>
            </h1>
            <Form
              defaultValues={{ noteField: editNote }}
              onSubmit={(data) => {
                if (!data.noteField) return errorSnackBar('Cant be empty');
                updateUser({ notes: [...userInfo.notes, data.noteField] });
                setEditNote('');
              }}>
              <ButtonInputField name="noteField" btnText="+Add" />
            </Form>
            {userInfo?.notes?.map((note, i) => (
              <Notes
                key={i}
                text={note}
                onDelete={() => {
                  updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
                }}
                onEdit={() => {
                  setEditNote(note);
                  updateUser({ notes: userInfo?.notes?.filter((value) => value !== note) });
                }}
              />
            ))}
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
              <div className="h-48  relative overflow-hidden rounded-[50%] inline-block border-solid shadow-md border-4 border-white mx-2.5">
                <img
                  src={
                    userInfo?.picture && userInfo?.picture !== 'string'
                      ? `http://localhost:3030/recourse/${userInfo?.picture}?size=250`
                      : '../profilePic.jpeg'
                  }
                  alt="center image"
                  className="bg-cover inline-block bg-center rounded-[50%] h-48 w-48"
                />
              </div>
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
                  <div className="mb-4 flex flex-wrap font-semibold gap-2 float-left w-full ">
                    <button className="border shadow-md bg-slate-50 py-1 px-2 rounded-lg">Message</button>
                    <button className="border shadow-md bg-sky-700 text-white py-1 px-2 rounded-lg">Add friend</button>
                    <button className="border shadow-md bg-red-700 text-white py-1 px-2 rounded-lg">Block</button>
                  </div>
                )}
                {userInfo?.biography && (
                  <>
                    <h3 className="font-semibold block">Biography</h3>
                    <ReactMarkdown remarkPlugins={[gfm]} className="text-lg py-4 w-fit react-markdown">
                      {userInfo?.biography}
                    </ReactMarkdown>
                  </>
                )}
                <hr className="m-4" />
                <h2 className="text-slate-600 font-semibold uppercase ">Member since: {memberDate}</h2>
                <p className="uppercase text-slate-600 font-semibold text-xs mb-3">time zone: {userInfo?.timezone}</p>
                {userInfo?.biography && (
                  <>
                    <hr className="m-4" />
                    <h3 className="font-semibold">Interests</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {userInfo?.tags?.map((tag, i) => (
                        <div key={i} className="border shadow-md border-slate-300 rounded-xl m-1 ">
                          <p className="p-2.5 font-semibold text-center">{tag}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          </section>
        </>
      }
    />
  );
}
