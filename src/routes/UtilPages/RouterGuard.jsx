import { Outlet, useNavigate } from 'react-router-dom';

import { useFetch } from '@utils/useFetch';

export default function RouteGuardian() {
  const navigate = useNavigate();

  useFetch({ url: '' }).then((data) => {
    if (data.status === 401) navigate('/user/login');
  });

  return <Outlet />;
}
