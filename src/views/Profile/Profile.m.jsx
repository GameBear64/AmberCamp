import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import gfm from 'remark-gfm';

import Notes from '@components/Notes/Notes';
import Form from '@form';
import ButtonInputField from '@form-inputs/ButtonInput';
import { errorSnackBar, successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';
import { getCurrentUserId, removeEmptyProperties } from '@utils/utils';

import MobileNavBar from '../../components/NavBar/MobileNavBar';

import QuillSection from './slices/QuillSection';

export default function ProfileMobile() {
  const [userInfo, setUserInfo] = useState({});
  const [editNote, setEditNote] = useState('');
  const [rotate, setRotate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getUser = () => {
    useFetch({
      url: `user/${id || getCurrentUserId()}`,
      method: 'GET',
    }).then((res) => {
      setUserInfo(res.message);
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
    }).then(() => {
      successSnackBar('Profile updated.');
    });
  };
  useEffect(() => {
    getUser();
  }, [id]);

  let memberDate = new Date(userInfo?.createdAt).toLocaleString('en-GB', {
    dateStyle: 'short',
  });

  return (
    <div>
      <div className="m-auto">
        <MobileNavBar backBtnLable="Profile" backButton="arrow_back_ios_new" actionButton={() => navigate('/user/settings')} />

        <section
          className="h-52 rounded-b bg-neutral-700 bg-cover bg-center shadow-md"
          style={{
            backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
          }}>
          <section className="relative mx-4 flex flex-row pt-28 ">
            <div className="relative mx-2.5 inline-block h-44 overflow-hidden rounded-[50%] border-4 border-solid border-white shadow-md">
              <img
                src={
                  userInfo?.picture && userInfo?.picture !== 'string'
                    ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                    : '../profilePic.jpeg'
                }
                alt="center image"
                className="inline-block h-44 w-44 rounded-[50%] bg-cover bg-center"
              />
            </div>
            <div className="mt-24">
              <h3 className="text-2xl font-semibold">{userInfo?.name || userInfo?.handle}</h3>
              <h3 className="text-lg">@{userInfo?.handle}</h3>
            </div>
          </section>
        </section>
        <section className="flex flex-col">
          <div className="col-span-2 mx-9 mb-10 mt-32">
            {id !== getCurrentUserId() && (
              <div className="float-left mb-4 flex w-full flex-wrap gap-2 font-semibold">
                <button className="rounded-lg border bg-slate-50 px-2 py-1 shadow-md">Message</button>
                <button className="rounded-lg border bg-sky-700 px-2 py-1 text-white shadow-md">Add friend</button>
                <button className="rounded-lg border bg-red-700 px-2 py-1 text-white shadow-md">Block</button>
              </div>
            )}
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <QuillSection userId={id} value={userInfo.description} setValue={updateDescription} />
              </div>
            </div>
          </div>
          <section className="col-span-1 overflow-y-auto ">
            <div className="w-auto px-10">
              {userInfo?.biography && (
                <>
                  <h3 className="block font-semibold">Biography</h3>
                  <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown w-fit py-4 text-lg">
                    {userInfo?.biography}
                  </ReactMarkdown>
                </>
              )}
              <hr className="m-4" />
              <h2 className="font-semibold uppercase text-slate-600 ">Member since: {memberDate}</h2>
              <p className="mb-3 text-xs font-semibold uppercase text-slate-600">
                time zone: {new Date().getHours()}:{new Date().getMinutes()}
              </p>
              {userInfo?.biography && (
                <>
                  <hr className="m-4" />
                  <h3 className="font-semibold">Interests</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {userInfo?.tags?.map((tag, i) => (
                      <div key={i} className="m-1 rounded-xl border border-slate-300 shadow-md">
                        <p className="p-2.5 text-center font-semibold">{tag}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </section>

        <div className="m-8">
          <h1 className="text-2xl font-semibold">
            Notes
            <span
              onClick={() => {
                setRotate(!rotate);
                updateUser({ notes: userInfo?.notes.reverse() });
              }}
              className={`material-symbols-outlined mb-1 ml-1 cursor-pointer align-bottom ${rotate && 'rotate-180'}`}>
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
            <ButtonInputField width="w-[400px]" name="noteField" btnText="+Add" />
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
    </div>
  );
}
