import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import ProfileMobile from './Profile/Profile.m';
import RegisterMobile from './Register/Register.m';
import ChatListMobile from './ChatList/ChatList.m';
import ErrorPage from './ErrorPage/ErrorPage';
import resizeScreen from '../utils/resizeScreen';
import LoginMobile from './Login/Login.m';
import Settings from './Settings/Settings/Settings';
import General from './Settings/General/General';
import Security from './Settings/Security/Security';
import DangerZone from './Settings/DangerZone/DangerZone';
import Preferences from './Settings/Preferences/Preferences';
import SettingsMobile from './Settings/Settings/Settings.m';
import DangerZoneMobile from './Settings/DangerZone/DangerZone.m';
import GeneralMobile from './Settings/General/General.m';
import SecurityMobile from './Settings/Security/Security.m';
import PreferencesMobile from './Settings/Preferences/Preferences.m';

const ChatList = lazy(() => import('./ChatList/ChatList'));
const Chat = lazy(() => import('./Chat/Chat'));

export default function Router() {
  const screenSize = resizeScreen();

  let routes = [
    {
      path: '/',
      element: (
        <Suspense fallback={<>...</>}>
          <h1> the index </h1>
        </Suspense>
      ),
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<>...</>}>
          <ChatList className="classList-component " />
        </Suspense>
      ),

      children: [
        {
          path: '',
          element: (
            <Suspense fallback={<>...</>}>
              <h1> no chat </h1>
            </Suspense>
          ),
        },
        {
          path: ':id',
          element: (
            <Suspense fallback={<>...</>}>
              <Chat className="chat-component" />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: '/user/register',
      element: (
        <Suspense fallback={<>...</>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<>...</>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/user',
      element: (
        <Suspense fallback={<>...</>}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<>...</>}>
          <Settings />
        </Suspense>
      ),
      children: [
        {
          path: 'general',
          element: (
            <Suspense fallback={<>...</>}>
              <General />
            </Suspense>
          ),
        },
        {
          path: 'dangerzone',
          element: (
            <Suspense fallback={<>...</>}>
              <DangerZone />
            </Suspense>
          ),
        },
        {
          path: 'preferences',
          element: (
            <Suspense fallback={<>...</>}>
              <Preferences />
            </Suspense>
          ),
        },
        {
          path: 'security',
          element: (
            <Suspense fallback={<>...</>}>
              <Security />
            </Suspense>
          ),
        },
      ],
    },
  ];

  //////////////////////////////////////////////////////////////////////////////

  let mobileRoutres = [
    {
      path: '/',
      element: (
        <Suspense fallback={<>...</>}>
          <h1> the index mobile </h1>
        </Suspense>
      ),
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<>...</>}>
          <ChatListMobile />
        </Suspense>
      ),
    },
    {
      path: `/chat/:id`,
      element: (
        <Suspense fallback={<>...</>}>
          <Chat className="chat-component" />
        </Suspense>
      ),
    },
    {
      path: '/user/register',
      element: (
        <Suspense fallback={<>...</>}>
          <RegisterMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<>...</>}>
          <LoginMobile />
        </Suspense>
      ),
    },
    {
      path: '/user',
      element: (
        <Suspense fallback={<>...</>}>
          <ProfileMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<>...</>}>
          <SettingsMobile />
        </Suspense>
      ),
    },

    {
      path: '/user/settings/dangerzone',
      element: (
        <Suspense fallback={<>...</>}>
          <DangerZoneMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/general',
      element: (
        <Suspense fallback={<>...</>}>
          <GeneralMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/security',
      element: (
        <Suspense fallback={<>...</>}>
          <SecurityMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/preferences',
      element: (
        <Suspense fallback={<>...</>}>
          <PreferencesMobile />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter(screenSize > 1023 ? routes : mobileRoutres);

  return <RouterProvider router={router} />;
}
