import { lazy, Suspense } from 'react';

import { LoginLoader } from '../views/Login/Loader';
const Login = lazy(() => import('../views/Login/Login'));
const Register = lazy(() => import('../views/Register/Register'));


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

export default authRoutes;
