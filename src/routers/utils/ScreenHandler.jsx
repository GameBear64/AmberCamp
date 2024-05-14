import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { screens } from 'tailwindcss/defaultTheme';

import useScreenSize from '@utils/react/screenSize';

export default function ScreenHandler({ from, to, children }) {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const location = useLocation();

  useEffect(() => {    
    if (screenSize >= parseInt(screens.lg) && location.pathname === from) {
      navigate(to);
    }
  }, [screenSize, location.pathname]);

  return children;
}
