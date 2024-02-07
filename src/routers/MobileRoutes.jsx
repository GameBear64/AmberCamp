import { lazy, Suspense } from 'react';
const ChatListMobile = lazy(() => import('../views/ChatList/ChatList.m'));
const ProfileMobile = lazy(() => import('../views/Profile/Profile.m'));
const Settings = lazy(() => import('../views/Settings/Settings/Settings.m'));
const DangerZone = lazy(() => import('../views/Settings/DangerZone/DangerZone'));
const GeneralMobile = lazy(() => import('../views/Settings/General/General.m'));
const SecurityMobile = lazy(() => import('../views/Settings/Security/Security.m'));
const PreferencesMobile = lazy(() => import('../views/Settings/Preferences/Preferences.m'));
const Redirect = lazy(() => import('./Special/Redirect'));
const Chat = lazy(() => import('../views/Chat/Chat'));
const Contacts = lazy(() => import('../views/Contacts/Contacts'));

import { ChatLoaderMobile } from '../views/Chat/Loader';
import { ChatListLoader } from '../views/ChatList/Loader';
import { ChatListMobileLoader } from '../views/ChatList/Loader';
import { ProfileMobileLoader } from '../views/Profile/slices/Loader';
import { SettingsTabsLoader } from '../views/Settings/Loader';
import { SettingsPageLoader } from '../views/Settings/Loader';

import Loader from './Special/Loader';

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
        <Settings />
      </Suspense>
    ),
  },
  {
    path: '/settings/dangerzone',
    element: (
      <Suspense fallback={<SettingsPageLoader />}>
        <DangerZone />
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

export default mobileRoutes;
