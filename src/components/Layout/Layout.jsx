import NavBar from '@components/NavBar/NavBar';

export default function Layout({ left, right, native = false }) {
  //bg-[#2c2f33] left
  return (
    <div className={`grid grid-cols-[20em_1fr] ${!native && 'grid-rows-[1fr_3em]'} grid-flow-row h-screen`}>
      <div
        className={`${!native && 'shadow-[0_3px_10px_rgb(0,0,0,0.2)]'} overflow-x-${native ? 'hidden' : 'auto'} ${
          native && 'overflow-y-hidden'
        }`}>
        {left}
      </div>
      <div className="row-span-2 overflow-x-auto">{right}</div>
      {!native && <NavBar />}
    </div>
  );
}
