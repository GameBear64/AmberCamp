import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import gfm from 'remark-gfm';

import { successSnackBar } from '@utils/snackbars';
import { useFetch } from '@utils/useFetch';
import { getCurrentUserId } from '@utils/utils';

import FriendshipButtons from './FriendshipButtons';
import { ProfileMobileLoader } from './Loader';
import NotesSection from './NotesSection';
import QuillSection from './QuillSection';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
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

  if (!userInfo?.handle) return <ProfileMobileLoader />;

  return (
    <>
      <div
        className="h-60 rounded-b bg-neutral-700 bg-cover bg-center shadow-md"
        style={{
          backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
        }}
      />
      <div className="border-b p-4">
        <div className="relative flex w-full">
          <div className="flex flex-1">
            <div style={{ marginTop: '-6rem' }}>
              <div style={{ height: '9rem', width: '9rem' }} className="md avatar relative rounded-full">
                <img
                  style={{ height: '9rem', width: '9rem' }}
                  className="md relative rounded-full border-4 border-gray-900"
                  src={
                    userInfo?.picture && userInfo?.picture !== 'string'
                      ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                      : '../profilePic.jpeg'
                  }
                  alt=""
                />
                <div className="absolute"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <FriendshipButtons userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        </div>
        <div className="ml-3 mt-3 w-full justify-center space-y-1">
          <div>
            <h2 className="text-xl font-bold leading-6">{userInfo?.name || userInfo?.handle}</h2>
            <p className="text-sm font-medium leading-5 text-gray-600">@{userInfo?.handle}</p>
          </div>
          <div className="mt-3">
            <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown mb-2 leading-tight">
              {userInfo?.biography}
            </ReactMarkdown>
            <div className="flex text-gray-600">
              <span className="mr-4 flex">
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="ml-1">
                  {new Date(userInfo?.createdAt).toLocaleString('en-GB', {
                    dateStyle: 'short',
                  })}
                </span>
              </span>

              <span className="mr-4 flex">
                <span className="material-symbols-outlined">schedule</span>
                <span className="ml-1">{userInfo?.timezone}</span>
              </span>

              {userInfo?.tags?.length > 0 && (
                <span className="mr-4 flex">
                  <span className="material-symbols-outlined">sell</span>
                  {userInfo?.tags?.map((tag, i) => (
                    <p key={i} className="ml-2 text-center font-semibold">
                      {tag}
                    </p>
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-[1fr_25em] grid-rows-1">
        <QuillSection userId={id} value={userInfo.description} setValue={updateDescription} />
        <section className="overflow-y-auto overflow-x-hidden border-l">
          <NotesSection id={id} styles="my-10 mx-10" userInfo={userInfo} refresh={getUser} />
        </section>
      </section>
    </>
  );
}
