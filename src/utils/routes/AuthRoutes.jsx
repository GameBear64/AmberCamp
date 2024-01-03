import { Suspense } from 'react';

import { LoginLoader } from '../../views/Login/Loader';
import Login from '../../views/Login/Login';
import Register from '../../views/Register/Register';

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
