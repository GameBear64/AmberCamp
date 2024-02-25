import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';

export default function ScreenHandler({ to, children }) {
  const navigate = useNavigate();
  const screenSize = resizeScreen();
  const location = useLocation();

  useEffect(() => {
    if (screenSize > 1024) {
      navigate(to);
    }
  }, [screenSize, location.pathname]);

  return children;
}
