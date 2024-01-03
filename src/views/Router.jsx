import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';

import authRoutes from '../utils/routes/AuthRoutes';
import routes from '../utils/routes/DescktopRoutes';
import mobileRoutes from '../utils/routes/MobileRoutes';

import Guard from './UtilPages/RouterGuard';

const ErrorPage = lazy(() => import('./UtilPages/ErrorPage'));
const NotFound = lazy(() => import('./UtilPages/NotFound'));

import Loader from './UtilPages/Loader';

export default function Router() {
  const screenSize = resizeScreen();

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
    ...authRoutes,
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
