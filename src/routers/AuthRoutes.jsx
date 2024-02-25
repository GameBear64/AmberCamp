import { Suspense } from 'react';

import { LoginLoader } from '../loaders/LoginLoader';
import Login from '../views/Login';
import Register from '../views/Register';

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
