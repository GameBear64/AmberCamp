import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';
import resizeScreen from '../../utils/resizeScreen';

const ChatList = lazy(() => import('../ChatList/ChatList'));
const Chat = lazy(() => import('../Chat/Chat'));

export default function Router() {
  const screenSize = resizeScreen();
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<>...</>}>
          <h1> the index </h1>
        </Suspense>
      ),
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<>...</>}>
          <ChatList className="classList-component " />
        </Suspense>
      ),

      children: screenSize >= 800 && [
        {
          path: '',
          element: (
            <Suspense fallback={<>...</>}>
              <h1> no chat </h1>
            </Suspense>
          ),
        },
        {
          path: ':id',
          element: (
            <Suspense fallback={<>...</>}>
              <Chat className="chat-component" />
            </Suspense>
          ),
        },
      ],
    },
    screenSize < 800 && {
      path: `/chat/:id`,
      element: (
        <Suspense fallback={<>...</>}>
          <Chat className="chat-component" />
        </Suspense>
      ),
    },
    {
      path: '/user/register',
      element: (
        <Suspense fallback={<>...</>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/user/login',
      element: (
        <Suspense fallback={<>...</>}>
          <Login />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
