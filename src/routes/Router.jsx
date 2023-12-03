import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';
import { getCurrentUserId } from '@utils/utils';

// Auth
import Guard from './UtilPages/RouterGuard';
const Register = lazy(() => import('./Register/Register'));
const RegisterMobile = lazy(() => import('./Register/Register.m'));
const Login = lazy(() => import('./Login/Login'));
const LoginMobile = lazy(() => import('./Login/Login.m'));

// Routes
const ChatList = lazy(() => import('./ChatList/ChatList'));
const Chat = lazy(() => import('./Chat/Chat'));
const Contacts = lazy(() => import('./Contacts/Contacts'));
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
const NotFound = lazy(() => import('./UtilPages/NotFound'));
const Redirect = lazy(() => import('./UtilPages/Redirect'));

// Loaders
import { ChatLoader, ChatLoaderMobile } from './Chat/Loader';
import { ChatListLoader, ChatListMobileLoader } from './ChatList/Loader';
import { LoginLoader, LoginMobileLoader } from './Login/Loader';
import { ProfileLoader, ProfileMobileLoader } from './Profile/Loader';
import { SettingsLoader, SettingsPageLoader, SettingsTabsLoader } from './Settings/Loader';
import Loader from './UtilPages/Loader'; // Generic loader

export default function Router() {
  const screenSize = resizeScreen();

  const authRoutes = [
    {
      path: '/register',
      element: (
        <Suspense fallback={<LoginLoader />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/login',
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
              <Redirect to={`/contacts/${getCurrentUserId()}`} />
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

  //////////////////////////////////////////////////////////////////////////////

  const mobileAuthRoutes = [
    {
      path: '/register',
      element: (
        <Suspense fallback={<LoginMobileLoader />}>
          <RegisterMobile />
        </Suspense>
      ),
    },
    {
      path: '/login',
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
      element: <Redirect to="/chat" />,
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
        <Suspense fallback={<ChatLoaderMobile />}>
          <Chat className="chat-component" />
        </Suspense>
      ),
    },
    {
      path: '/contacts',
      element: (
        <Suspense fallback={<ChatListLoader />}>
          <Contacts />
        </Suspense>
      ),
    },
    {
      path: '/contacts/:id',
      element: (
        <Suspense fallback={<ProfileMobileLoader />}>
          <ProfileMobile />
        </Suspense>
      ),
    },
    {
      path: '/settings',
      element: (
        <Suspense fallback={<SettingsTabsLoader />}>
          <SettingsMobile />
        </Suspense>
      ),
    },
    {
      path: '/settings/dangerzone',
      element: (
        <Suspense fallback={<SettingsPageLoader />}>
          <DangerZoneMobile />
        </Suspense>
      ),
    },
    {
      path: '/settings/general',
      element: (
        <Suspense fallback={<SettingsPageLoader />}>
          <GeneralMobile />
        </Suspense>
      ),
    },
    {
      path: '/settings/security',
      element: (
        <Suspense fallback={<SettingsPageLoader />}>
          <SecurityMobile />
        </Suspense>
      ),
    },
    {
      path: '/settings/preferences',
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
      element: (
        <Suspense fallback={<Loader />}>
          <Guard />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [...(screenSize > 1023 ? routes : mobileRoutes)],
    },
    ...(screenSize > 1023 ? authRoutes : mobileAuthRoutes),
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
