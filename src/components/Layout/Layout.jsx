import { useOutlet } from 'react-router-dom';

import NavBar from '@components/NavBar/NavBar';
export default function Layout({ children }) {
  const outlet = useOutlet();

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <div className="hidden h-full flex-col justify-between lg:flex">
          <div>{outlet || children}</div>
          <NavBar />
        </div>
        <div className="grid h-full grid-flow-row grid-cols-[17em_1fr] grid-rows-1 lg:hidden lg:grid-cols-none">
          <div className="border-base-subtle overflow-x-auto border-r-2">{children}</div>
          <div className="row-span-2 h-full overflow-x-auto">{outlet}</div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}
