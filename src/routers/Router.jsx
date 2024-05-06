import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import { $user } from '@stores/user';

const ChatList = lazy(() => import('../views/ChatList'));
const Chat = lazy(() => import('../views/Chat'));
const Contacts = lazy(() => import('../views/Contacts'));
const Profile = lazy(() => import('../views/Profile'));
const CampFire = lazy(() => import('../views/CampFire'));
const AnswerList = lazy(() => import('../views/AnswerList'));
const Settings = lazy(() => import('../views/Settings/Settings'));
const General = lazy(() => import('../views/Settings/General'));
const Security = lazy(() => import('../views/Settings/Security'));
const DangerZone = lazy(() => import('../views/Settings/DangerZone'));
const Preferences = lazy(() => import('../views/Settings/Preferences'));

import authRoutes from '../routers/AuthRoutes';
import Redirect from '../routers/utils/Redirect';

import { ChatListLoader } from './loaders/ChatListLoader';
import { ChatLoader } from './loaders/ChatLoader';
import { ProfileLoader } from './loaders/ProfileLoader';
import { SettingsLoader } from './loaders/SettingsLoader';
import { SettingsPageLoader } from './loaders/SettingsLoader';
import ErrorPage from './static/ErrorPage';
import Loader from './static/Loader';
import NotFound from './static/NotFound';
import ScreenHandler from './utils/ScreenHandler';

let router;

export default function Router() {
  const user = useStore($user);

  router = createBrowserRouter([
    {
      path: '/',
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
      path: '/campfire',
      element: (
        <Suspense fallback={<ChatListLoader />}>
          <CampFire />
        </Suspense>
      ),
      children: [
        {
          path: 'answers/:id',
          element: (
            <Suspense fallback={<ChatLoader />}>
              <AnswerList />
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
          <ScreenHandler from="/contacts" to={`/contacts/${user.id}`}>
            <Contacts />
          </ScreenHandler>
        </Suspense>
      ),
      children: [
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
          <ScreenHandler from="/settings" to="general">
            <Settings />
          </ScreenHandler>
        </Suspense>
      ),
      children: [
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
    ...authRoutes,
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export { router };
