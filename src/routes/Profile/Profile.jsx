import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import gfm from 'remark-gfm';

import Notes from '@components/Notes/Notes';
import Form from '@form';
import ButtonInputField from '@form-inputs/ButtonInput';
import Layout from '@layout';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId, removeEmptyProperties } from '@utils/utils';

import QuillSection from './QuillSection';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [editNote, setEditNote] = useState('');
  const [rotate, setRotate] = useState(false);
  const { id } = useParams();

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
            <h1 className="text-2xl font-semibold">
              Notes
              <span
                onClick={() => {
                  setRotate(!rotate);
                  updateUser({ notes: userInfo?.notes.reverse() });
                }}
                className={`material-symbols-outlined mb-1 ml-1 cursor-pointer align-bottom ${rotate && 'rotate-180'} `}>
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
            className="h-60 rounded-b bg-gray-700 bg-cover bg-center shadow-md"
            style={{
              backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
            }}>
            <section className="relative flex flex-row pt-36 mx-4">
              <div className="h-48 relative overflow-hidden rounded-[50%] inline-block border-solid shadow-md border-4 border-white mx-2.5">
                <img
                  src={
                    userInfo?.picture && userInfo?.picture !== 'string'
                      ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                      : '../profilePic.jpeg'
                  }
                  alt="center image"
                  className="inline-block h-48 w-48 rounded-[50%] bg-cover bg-center"
                />
              </div>
              <div className="mt-24">
                <h3 className="text-2xl font-semibold">{userInfo?.name || userInfo?.handle}</h3>
                <h3 className="text-lg">@{userInfo?.handle}</h3>
              </div>
            </section>
          </section>
          <section className="ml-8 grid grid-cols-3 grid-rows-1 gap-0">
            <div className="col-span-2 mt-32">
              <QuillSection userId={id} value={userInfo.description} setValue={updateDescription} />
            </div>
            <section className="overflow-y-auto overflow-x-hidden col-span-1">
              <div className="p-10">
                {id !== getCurrentUserId() && (
                  <div className="float-left mb-4 flex w-full flex-wrap gap-2 font-semibold ">
                    <button className="rounded-lg border bg-slate-50 px-2 py-1 shadow-md">Message</button>
                    <button className="rounded-lg border bg-sky-700 px-2 py-1 text-white shadow-md">Add friend</button>
                    <button className="rounded-lg border bg-red-700 px-2 py-1 text-white shadow-md">Block</button>
                  </div>
                )}
                {userInfo?.biography && (
                  <>
                    <h3 className="block font-semibold">Biography</h3>
                    <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown w-fit py-4 text-lg">
                      {userInfo?.biography}
                    </ReactMarkdown>
                  </>
                )}
                <hr className="m-4" />
                <h2 className="font-semibold uppercase text-slate-600">Member since: {memberDate}</h2>
                <p className="mb-3 text-xs font-semibold uppercase text-slate-600">time zone: {userInfo?.timezone}</p>
                {userInfo?.biography && (
                  <>
                    <hr className="m-4" />
                    <h3 className="font-semibold">Interests</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {userInfo?.tags?.map((tag, i) => (
                        <div key={i} className="m-1 rounded-xl border border-slate-300 shadow-md ">
                          <p className="p-2.5 text-center font-semibold">{tag}</p>
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
