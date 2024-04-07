import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import gfm from 'remark-gfm';

import { useStore } from '@nanostores/react';

import Icon from '@components/Icon';
import TopBar from '@components/Layout/TopBar';
import FriendshipButtons from '@components/Profile/FriendshipButtons';
import NotesSection from '@components/Profile/NotesSection';
import QuillSection from '@components/Profile/QuillSection';
import Tag from '@components/Profile/Tag';

import useFetch from '@utils/useFetch';
import { $user } from '@stores/user';

import { ProfileLoader } from '../routers/loaders/ProfileLoader';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const user = useStore($user);

  const getUser = () => {
    useFetch({
      url: `user/${id || user.id}`,
      method: 'GET',
    }).then((response) => setUserInfo(response));
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const navigate = useNavigate();
  if (!userInfo?.handle) return <ProfileLoader />;
  return (
    <div>
      <div className="block lg:hidden">
        <TopBar backBtnLabel="Profile" backButton="arrow_back_ios_new" actionButton={() => navigate(`/chat`)} />
      </div>
      <div
        className="h-52 bg-neutral-700 bg-cover bg-center shadow-md lg:h-60"
        style={{
          backgroundImage: userInfo?.background ? `url('http://localhost:3030/recourse/${userInfo?.background}')` : '',
        }}
      />
      <div className="p-4">
        <div className="relative mt-[-6rem] flex w-full flex-row items-end">
          <img
            className="relative h-40 w-40 rounded-[50%] border-2 border-white shadow-md lg:h-36 lg:w-36 lg:rounded-full"
            src={
              userInfo?.picture && userInfo?.picture !== 'string'
                ? `http://localhost:3030/recourse/${userInfo?.picture}?size=0`
                : '../profilePic.jpeg'
            }
            alt=""
          />
          <div className="mb-2 ">
            <h2 className="flex items-center text-xl font-bold leading-6 text-txtPrimary">
              {userInfo?.name || userInfo?.handle}
            </h2>
            <p className="text-sm font-medium leading-4 text-txtSecondary">@{userInfo?.handle}</p>
          </div>
        </div>
        <div className="ml-3 mt-3 w-full justify-center space-y-1">
          <div className="flex lg:float-right lg:mx-5">
            <FriendshipButtons userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
          <div className="flex flex-col gap-4">
            <ReactMarkdown remarkPlugins={[gfm]} className="react-markdown leading-tight text-txtSecondary">
              {userInfo?.biography}
            </ReactMarkdown>
            {userInfo?.tags?.length > 0 && (
              <span className="flex flex-row gap-3 ">
                {userInfo?.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </span>
            )}
            <div className="flex flex-col flex-wrap gap-2 text-gray-600 lg:flex-row">
              <div className="flex">
                <Icon icon="calendar_month" />
                <span className="ml-1 text-txtSecondary">
                  {new Date(userInfo?.createdAt).toLocaleString('en-GB', {
                    dateStyle: 'short',
                  })}
                </span>
              </div>
              <div className="flex text-txtSecondary">
                <Icon icon="schedule" />
                <span className="ml-1">{userInfo?.timezone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col text-txtPrimary lg:grid lg:grid-cols-[1fr_20em] lg:grid-rows-1">
        <QuillSection userId={id} value={userInfo.description} />
        <section className="overflow-y-auto overflow-x-hidden border-t border-primary lg:border-l lg:border-t-0">
          <NotesSection id={id} userInfo={userInfo} setUserInfo={setUserInfo} />
        </section>
      </section>
    </div>
  );
}
