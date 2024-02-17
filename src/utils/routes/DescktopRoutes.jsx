import { lazy, Suspense } from 'react';

const ChatList = lazy(() => import('../../views/ChatList/ChatList'));
const Chat = lazy(() => import('../../views/Chat/Chat'));
const Contacts = lazy(() => import('../../views/Contacts/Contacts'));
const Profile = lazy(() => import('../../views/Profile/Profile'));
const Settings = lazy(() => import('../../views/Settings/Settings/Settings'));
const General = lazy(() => import('../../views/Settings/General/General'));
const Security = lazy(() => import('../../views/Settings/Security/Security'));
const DangerZone = lazy(() => import('../../views/Settings/DangerZone/DangerZone'));
const Preferences = lazy(() => import('../../views/Settings/Preferences/Preferences'));
import { getUserId } from '@stores/user';

import { ChatLoader } from '../../views/Chat/Loader';
import { ChatListLoader } from '../../views/ChatList/Loader';
import { ProfileLoader } from '../../views/Profile/slices/Loader';
import { SettingsLoader } from '../../views/Settings/Loader';
import { SettingsPageLoader } from '../../views/Settings/Loader';
import ErrorPage from '../../views/UtilPages/ErrorPage';
import Loader from '../../views/UtilPages/Loader';

const Redirect = lazy(() => import('../../views/UtilPages/Redirect'));

const routes = [
  {
    path: '',
    element: <Redirect to="/chat" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/chat',
    element: (
      <Suspense fallback={<ChatListLoader />}>
        <ChatList />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<ChatLoader />}>
            <p>no chat</p>
          </Suspense>
        ),
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<ChatLoader />}>
            <Chat />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/contacts',
    element: (
      <Suspense fallback={<ChatListLoader />}>
        <Contacts />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<ChatLoader />}>
            <Redirect to={`/contacts/${getUserId()}`} />
          </Suspense>
        ),
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<ProfileLoader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/settings',
    element: (
      <Suspense fallback={<SettingsLoader />}>
        <Settings />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <Redirect to="/settings/general" />,
      },
      {
        path: 'general',
        element: (
          <Suspense fallback={<SettingsPageLoader />}>
            <General />
          </Suspense>
        ),
      },
      {
        path: 'dangerzone',
        element: (
          <Suspense fallback={<SettingsPageLoader />}>
            <DangerZone />
          </Suspense>
        ),
      },
      {
        path: 'preferences',
        element: (
          <Suspense fallback={<Loader />}>
            <Preferences />
          </Suspense>
        ),
      },
      {
        path: 'security',
        element: (
          <Suspense fallback={<SettingsPageLoader />}>
            <Security />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
