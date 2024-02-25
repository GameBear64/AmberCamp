import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import gfm from 'remark-gfm';

import Icon from '@components/Icon';
import FriendshipButtons from '@components/Profile/FriendshipButtons';
import NotesSection from '@components/Profile/NotesSection';
import QuillSection from '@components/Profile/QuillSection';
import TopBar from '@components/TopBar/TopBar';
import { useStore } from '@nanostores/react';
import { $user } from '@stores/user';
import { useFetch } from '@utils/useFetch';

import { ProfileMobileLoader } from '../routers/loaders/ProfileLoader';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const user = useStore($user);

  const getUser = () => {
    useFetch({
      url: `user/${id || user.id}`,
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

  useEffect(() => {
    getUser();
  }, [id]);

  const navigate = useNavigate();
  if (!userInfo?.handle) return <ProfileMobileLoader />;
  return (
    <>
      <div className="hidden lg:block">
        <TopBar backBtnLable="Profile" backButton="arrow_back_ios_new" actionButton={() => navigate('/contacts')} />
      </div>
      <div
        className="h-60 bg-neutral-700 bg-cover bg-center shadow-md lg:h-52"
        style={{
          backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
        }}
      />
      <div className="p-4">
        <div className="relativ mt-[-6rem] flex w-full flex-row items-end">
          <img
            className="relative h-36 w-36 rounded-full border-2 border-white shadow-md lg:h-40 lg:w-40 lg:rounded-[50%]"
            src={
              userInfo?.picture && userInfo?.picture !== 'string'
                ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                : '../profilePic.jpeg'
            }
            alt=""
          />
          <div className="mb-2">
            <h2 className="flex items-center text-xl font-bold leading-6">{userInfo?.name || userInfo?.handle}</h2>
            <p className="text-sm font-medium leading-4 text-gray-600">@{userInfo?.handle}</p>
          </div>
        </div>
        <div className="ml-3 mt-3 w-full justify-center space-y-1">
          <div className="flex">
            <FriendshipButtons userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
          <div className="flex flex-col gap-4">
            <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown leading-tight">
              {userInfo?.biography}
            </ReactMarkdown>
            {userInfo?.tags?.length > 0 && (
              <span className="flex flex-row gap-3">
                {userInfo?.tags.map((tag, i) => (
                  <p key={i} className="rounded-xl border border-slate-300 p-1.5 text-center font-semibold shadow-sm">
                    {tag}
                  </p>
                ))}
              </span>
            )}
            <div className="flex flex-wrap gap-2 text-gray-600 lg:flex-col">
              <div className="flex">
                <Icon icon="calendar_month" />
                <span className="ml-1">
                  {new Date(userInfo?.createdAt).toLocaleString('en-GB', {
                    dateStyle: 'short',
                  })}
                </span>
              </div>
              <div className="flex">
                <Icon icon="schedule" />
                <span className="ml-1">{userInfo?.timezone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-[1fr_25em] grid-rows-1 lg:mx-2 lg:flex lg:flex-col">
        <QuillSection userId={id} value={userInfo.description} />
        <section className="overflow-y-auto overflow-x-hidden border-l">
          <NotesSection id={id} userInfo={userInfo} setUserInfo={setUserInfo} />
        </section>
      </section>
    </>
  );
}
