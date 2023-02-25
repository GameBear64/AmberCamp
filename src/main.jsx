import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import ErrorPage from './routes/ErrorPage/ErrorPage';

const ChatList = lazy(() => import('./routes/ChatList/ChatList'));
const Chat = lazy(() => import('./routes/Chat/Chat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<>...</>}>
        <ChatList></ChatList>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/chat',
    element: (
      <Suspense fallback={<>...</>}>
        <Chat></Chat>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
