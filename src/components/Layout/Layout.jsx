import NavBar from '@components/NavBar/NavBar';

export default function Layout({ left, right }) {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1">
        <div className="grid h-full grid-flow-row grid-cols-[17em_1fr] grid-rows-1 lg:grid-cols-[20em_1fr]">
          <div className="border-base-subtle overflow-x-auto border-r-2">{left}</div>
          <div className="row-span-2 h-full overflow-x-auto">{right}</div>
        </div>
      </div>
    </div>
  );
}
