import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0">
      <div className="h-full w-full rounded bg-white px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex w-full max-w-md flex-row justify-around pt-2 text-center">
          <button
            onClick={() => navigate('/chat')}
            className="material-symbols-outlined rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            forum
          </button>
          <button
            onClick={() => navigate(`/contacts`)}
            className="material-symbols-outlined rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            groups
          </button>
          <button className="material-symbols-outlined rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            device_unknown
          </button>
          <button
            onClick={() => navigate(`/settings`)}
            className="material-symbols-outlined rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            settings
          </button>
        </div>
      </div>
    </div>
  );
}
