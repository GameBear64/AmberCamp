import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="sticky bottom-0">
      <div className="rounded bg-white flex w-full justify-center h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 ">
        <div className="flex flex-row max-w-md w-full text-center justify-between pt-2">
          <span
            onClick={() => navigate('/chat')}
            className={`material-symbols-outlined text-[26px] cursor-pointer hover:shadow-md rounded p-1 transition duration-0 hover:duration-500`}>
            forum
          </span>
          <span className="material-symbols-outlined text-[26px] cursor-pointer hover:shadow-md rounded p-1 transition duration-0 hover:duration-500">
            group
          </span>
          <span className="material-symbols-outlined text-[26px] cursor-pointer hover:shadow-md rounded p-1 transition duration-0 hover:duration-500">
            device_unknown
          </span>
          <span
            onClick={() => navigate('/user')}
            className={`material-symbols-outlined text-[26px] cursor-pointer hover:shadow-md rounded transition duration-0 hover:duration-500 p-1`}>
            person
          </span>
          <span
            onClick={() => navigate('/user/settings')}
            className={`material-symbols-outlined text-[26px] cursor-pointer hover:shadow-md rounded p-1 transition duration-0 hover:duration-500`}>
            settings
          </span>
        </div>
      </div>
    </div>
  );
}