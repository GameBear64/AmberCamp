// import { useEffect } from 'react';
import { Outlet, /*useNavigate*/ } from 'react-router-dom';

// import { errorSnackBar } from '@utils/snackbars';
// import useFetch from '@utils/useFetch';

export default function RouteGuardian() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   useFetch({ url: '' }).then((data) => {
  //     if (data.status === 401) {
  //       errorSnackBar(data.message);
  //       navigate('/login');
  //     }
  //   });
  // }, []);

  return <Outlet />;
}
