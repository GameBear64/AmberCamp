import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';

import Guard from './Special/RouterGuard';
import authRoutes from './AuthRoutes';
import routes from './DesktopRoutes';
import mobileRoutes from './MobileRoutes';

const ErrorPage = lazy(() => import('./Special/ErrorPage'));
const NotFound = lazy(() => import('./Special/NotFound'));

import Loader from './Special/Loader';

export const router = (screenSize = 1023) => createBrowserRouter([
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
  ...authRoutes,
  { path: '*', element: <NotFound /> },
]);

export default function Router() {
  const screenSize = resizeScreen();
  
  return <RouterProvider router={router(screenSize)} />;
}
