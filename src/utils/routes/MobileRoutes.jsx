import { lazy, Suspense } from 'react';
const ChatListMobile = lazy(() => import('../../views/ChatList/ChatList.m'));
const ProfileMobile = lazy(() => import('../../views/Profile/Profile.m'));
const Settings = lazy(() => import('../../views/Settings/Settings/Settings.m'));
const DangerZone = lazy(() => import('../../views/Settings/DangerZone/DangerZone'));
const SecurityMobile = lazy(() => import('../../views/Settings/Security/Security'));
const PreferencesMobile = lazy(() => import('../../views/Settings/Preferences'));
const Redirect = lazy(() => import('../../views/UtilPages/Redirect'));
const Chat = lazy(() => import('../../views/Chat/Chat'));
const General = lazy(() => import('../../views/Settings/General'));

import { ChatLoaderMobile } from '../../views/Chat/Loader';
import { ChatListLoader } from '../../views/ChatList/Loader';
import { ChatListMobileLoader } from '../../views/ChatList/Loader';
import Contacts from '../../views/Contacts/Contacts';
import { ProfileMobileLoader } from '../../views/Profile/slices/Loader';
import { SettingsTabsLoader } from '../../views/Settings/Loader';
import { SettingsPageLoader } from '../../views/Settings/Loader';
import Loader from '../../views/UtilPages/Loader';

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
    path: 'user/settings',
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
        <General />
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
