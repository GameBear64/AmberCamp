import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';

// Auth
import Guard from './UtilPages/RouterGuard';
const Register = lazy(() => import('./Register/Register'));
const RegisterMobile = lazy(() => import('./Register/Register.m'));
const Login = lazy(() => import('./Login/Login'));
const LoginMobile = lazy(() => import('./Login/Login.m'));

// Routes
const ChatList = lazy(() => import('./ChatList/ChatList'));
const Chat = lazy(() => import('./Chat/Chat'));
const Profile = lazy(() => import('./Profile/Profile'));
const Settings = lazy(() => import('./Settings/Settings/Settings'));
const General = lazy(() => import('./Settings/General/General'));
const Security = lazy(() => import('./Settings/Security/Security'));
const DangerZone = lazy(() => import('./Settings/DangerZone/DangerZone'));
const Preferences = lazy(() => import('./Settings/Preferences/Preferences'));

// Mobile Routes
const ChatListMobile = lazy(() => import('./ChatList/ChatList.m'));
const ProfileMobile = lazy(() => import('./Profile/Profile.m'));
const SettingsMobile = lazy(() => import('./Settings/Settings/Settings.m'));
const DangerZoneMobile = lazy(() => import('./Settings/DangerZone/DangerZone.m'));
const GeneralMobile = lazy(() => import('./Settings/General/General.m'));
const SecurityMobile = lazy(() => import('./Settings/Security/Security.m'));
const PreferencesMobile = lazy(() => import('./Settings/Preferences/Preferences.m'));

// Other
const ErrorPage = lazy(() => import('./UtilPages/ErrorPage'));
import Loader from './UtilPages/Loader';
const NotFound = lazy(() => import('./UtilPages/NotFound'));
import ChatLoader from './Chat/ChatLoader';
import ChatMobileLoader from './Chat/ChatLoader.m';
import ChatListLoader from './ChatList/ChatListLoader';
import ChatListMobileLoader from './ChatList/ChatListLoader.m';
import LoginLoader from './Login/LoginLoader';
import LoginMobileLoader from './Login/LoginLoader.m';
import ProfileLoader from './Profile/ProfileLoader';
import ProfileMobileLoader from './Profile/ProfileLoader.m';
import RegisterLoader from './Register/RegisterLoader';
import RegisterMobileLoader from './Register/RegisterLoader.m';
import DangerZoneLoader from './Settings/DangerZone/DangerZoneLoader';
import DangerZoneMobileLoader from './Settings/DangerZone/DangerZoneLoader.m';
import GeneralLoader from './Settings/General/GeneralLoader';
import GeneralMobileLoader from './Settings/General/GeneralLoader.m';
import SecurityLoader from './Settings/Security/SecurityLoader';
import SecurityMobileLoader from './Settings/Security/SecurityLoader.m';
import SettingsLoader from './Settings/Settings/SettingLoader';
import SettingsMobileLoader from './Settings/Settings/SettingsLoader.m';

export default function Router() {
  const screenSize = resizeScreen();

  const authRoutes = [
    {
      path: '/user/register',
      element: (
        <Suspense fallback={<RegisterLoader />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<LoginLoader />}>
          <Login />
        </Suspense>
      ),
    },
  ];

  const routes = [
    {
      path: '',
      element: <p>the index</p>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<ChatListLoader />}>
          <ChatList className="classList-component" />
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: <Suspense fallback={<ChatLoader />}>{<p>no chat</p>}</Suspense>,
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
      path: '/user/:id',
      element: (
        <Suspense fallback={<ProfileLoader />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<SettingsLoader />}>
          <Settings />
        </Suspense>
      ),
      children: [
        {
          path: 'general',
          element: (
            <Suspense fallback={<GeneralLoader />}>
              <General />
            </Suspense>
          ),
        },
        {
          path: 'dangerzone',
          element: (
            <Suspense fallback={<DangerZoneLoader />}>
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
            <Suspense fallback={<SecurityLoader />}>
              <Security />
            </Suspense>
          ),
        },
      ],
    },
  ];

  //////////////////////////////////////////////////////////////////////////////

  const mobileAuthRoutes = [
    {
      path: '/user/register',
      element: (
        <Suspense fallback={<RegisterMobileLoader />}>
          <RegisterMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<LoginMobileLoader />}>
          <LoginMobile />
        </Suspense>
      ),
    },
  ];

  const mobileRoutes = [
    {
      path: '',
      element: (
        <Suspense fallback={<Loader />}>
          <h1> the index mobile </h1>
        </Suspense>
      ),
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<ChatListMobileLoader />}>
          <ChatListMobile />
        </Suspense>
      ),
    },
    {
      path: `/chat/:id`,
      element: (
        <Suspense fallback={<ChatMobileLoader />}>
          <Chat className="chat-component" />
        </Suspense>
      ),
    },
    {
      path: '/user/:id',
      element: (
        <Suspense fallback={<ProfileMobileLoader />}>
          <ProfileMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<SettingsMobileLoader />}>
          <SettingsMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings/dangerzone',
      element: (
        <Suspense fallback={<DangerZoneMobileLoader />}>
          <DangerZoneMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/general',
      element: (
        <Suspense fallback={<GeneralMobileLoader />}>
          <GeneralMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/security',
      element: (
        <Suspense fallback={<SecurityMobileLoader />}>
          <SecurityMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/preferences',
      element: (
        <Suspense fallback={<Loader />}>
          <PreferencesMobile />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Guard />,
      errorElement: <ErrorPage />,
      children: [...(screenSize > 1023 ? routes : mobileRoutes)],
    },
    ...(screenSize > 1023 ? authRoutes : mobileAuthRoutes),
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
