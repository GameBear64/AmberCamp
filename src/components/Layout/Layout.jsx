import NavBar from '@components/NavBar/NavBar';

export default function Layout({ left, right }) {
  //bg-[#2c2f33] left
  return (
    <div className="grid h-screen grid-flow-row grid-cols-[20em_1fr] grid-rows-[1fr_3em]">
      <div className="overflow-x-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">{left}</div>
      <div className="row-span-2 overflow-x-auto">{right}</div>
      <NavBar />
    </div>
  );
}
