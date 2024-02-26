import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';

export default function ScreenHandler({ from, to, children }) {
  const navigate = useNavigate();
  const screenSize = resizeScreen();
  const location = useLocation();

  useEffect(() => {
    if (screenSize > 1024 && location.pathname === from) {
      navigate(to);
    }
  }, [screenSize, location.pathname]);

  return children;
}
