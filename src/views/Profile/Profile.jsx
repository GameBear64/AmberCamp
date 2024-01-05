import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import gfm from 'remark-gfm';

import Icon from '../../components/Icon';

import { getUser } from './slices/endpoints';
import FriendshipButtons from './slices/FriendshipButtons';
import { ProfileMobileLoader } from './slices/Loader';
import NotesSection from './slices/NotesSection';
import QuillSection from './slices/QuillSection';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUser(id).then((res) => {
      if (res.status === 200) {
        setUserInfo(res.message);
      } else {
        // For the devs to debug
        // eslint-disable-next-line no-console
        console.log(res.message);
      }
    });
  }, [id]);

  if (!userInfo?.handle) return <ProfileMobileLoader />;

  return (
    <>
      <div
        className="h-60 bg-neutral-700 bg-cover bg-center shadow-md"
        style={{
          backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
        }}
      />
      <div className="border-b p-4">
        <div className="relative flex w-full">
          <div className="relative mt-[-6rem] flex h-[9rem] w-[9rem] flex-1">
            <img
              className="border-0.5 relative h-[9rem] w-[9rem] rounded-full border-gray-900"
              src={
                userInfo?.picture && userInfo?.picture !== 'string'
                  ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                  : '../profilePic.jpeg'
              }
              alt=""
            />
          </div>
          <div className="flex flex-col text-right">
            <FriendshipButtons userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        </div>
        <div className="ml-3 mt-3 w-full justify-center space-y-1">
          <h2 className="text-xl font-bold leading-6">{userInfo?.name || userInfo?.handle}</h2>
          <p className="text-sm font-medium leading-4 text-gray-600">@{userInfo?.handle}</p>
          <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown mb-2 mt-3 leading-tight">
            {userInfo?.biography}
          </ReactMarkdown>
          <div className="flex text-gray-600">
            <span className="mr-4 flex">
              <Icon icon="calendar_month" />
              <span className="ml-1">
                {new Date(userInfo?.createdAt).toLocaleString('en-GB', {
                  dateStyle: 'short',
                })}
              </span>
            </span>

            <span className="mr-4 flex">
              <Icon icon="schedule" />
              <span className="ml-1">{userInfo?.timezone}</span>
            </span>

            {userInfo?.tags?.length > 0 && (
              <span className="mr-4 flex">
                <Icon icon="sell" />
                {userInfo?.tags.map((tag, i) => (
                  <p key={i} className="ml-2 text-center font-semibold">
                    {tag}
                  </p>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
      <section className="grid grid-cols-[1fr_25em] grid-rows-1">
        <QuillSection userId={id} value={userInfo.description} />
        <section className="overflow-y-auto overflow-x-hidden border-l">
          <NotesSection id={id} userInfo={userInfo} setUserInfo={setUserInfo} />
        </section>
      </section>
    </>
  );
}
