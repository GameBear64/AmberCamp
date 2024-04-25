import { useOutlet } from 'react-router-dom';
import { screens } from 'tailwindcss/defaultTheme';

import NavBar from '@components/Layout/NavBar';

import useScreenSize from '@utils/react/screenSize';

export default function Layout({ children, placeholder }) {
  const screenSize = useScreenSize({ timeout: 100 });
  const outlet = useOutlet();

  return (
    <div className="flex h-screen bg-base text-txtPrimary">
      <div className="flex-1">
        {screenSize <= parseInt(screens.md) && (
          <div className="flex h-full flex-col justify-between ">
            {outlet || children}
            {!outlet && <NavBar />}
          </div>
        )}
        {screenSize > parseInt(screens.md) && (
          <div className="grid h-full grid-flow-row grid-cols-[17em_1fr] grid-rows-1 bg-base">
            <div className="overflow-x-auto">{children}</div>
            <div className="row-span-2 h-full overflow-x-auto bg-base-x">{outlet || placeholder}</div>
            <NavBar />
          </div>
        )}
      </div>
    </div>
  );
}
