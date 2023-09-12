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
const Loader = lazy(() => import('./UtilPages/Loader'));
const NotFound = lazy(() => import('./UtilPages/NotFound'));

export default function Router() {
  const screenSize = resizeScreen();

  const authRoutes = [
    {
      path: '/user/register',
      element: (
        <Suspense fallback={<Loader />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<Loader />}>
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
        <Suspense fallback={<Loader />}>
          <ChatList className="classList-component " />
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: (
            <Suspense fallback={<Loader />}>
              <h1> no chat </h1>
            </Suspense>
          ),
        },
        {
          path: ':id',
          element: (
            <Suspense fallback={<Loader />}>
              <Chat className="chat-component" />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/user/:id',
      element: (
        <Suspense fallback={<Loader />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<Loader />}>
          <Settings />
        </Suspense>
      ),
      children: [
        {
          path: 'general',
          element: (
            <Suspense fallback={<Loader />}>
              <General />
            </Suspense>
          ),
        },
        {
          path: 'dangerzone',
          element: (
            <Suspense fallback={<Loader />}>
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
            <Suspense fallback={<Loader />}>
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
        <Suspense fallback={<Loader />}>
          <RegisterMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<Loader />}>
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
        <Suspense fallback={<Loader />}>
          <ChatListMobile />
        </Suspense>
      ),
    },
    {
      path: `/chat/:id`,
      element: (
        <Suspense fallback={<Loader />}>
          <Chat className="chat-component" />
        </Suspense>
      ),
    },
    {
      path: '/user/:id',
      element: (
        <Suspense fallback={<Loader />}>
          <ProfileMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings',
      element: (
        <Suspense fallback={<Loader />}>
          <SettingsMobile />
        </Suspense>
      ),
    },
    {
      path: '/user/settings/dangerzone',
      element: (
        <Suspense fallback={<Loader />}>
          <DangerZoneMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/general',
      element: (
        <Suspense fallback={<Loader />}>
          <GeneralMobile />
        </Suspense>
      ),
    },
    {
      path: 'user/settings/security',
      element: (
        <Suspense fallback={<Loader />}>
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
