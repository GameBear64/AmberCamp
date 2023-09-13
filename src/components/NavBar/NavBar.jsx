import { useNavigate } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';
import { getCurrentUserId } from '@utils/utils';

export default function NavBar() {
  const navigate = useNavigate();
  let screenSize = resizeScreen();

  return (
    <div className="sticky bottom-0">
      <div className="flex h-full w-full justify-center rounded bg-white px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
        <div className="flex w-full max-w-md flex-row justify-between pt-2 text-center">
          <span
            onClick={() => navigate('/chat')}
            className={`material-symbols-outlined cursor-pointer rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500`}>
            forum
          </span>
          <span className="material-symbols-outlined cursor-pointer rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            group
          </span>
          <span className="material-symbols-outlined cursor-pointer rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500">
            device_unknown
          </span>
          <span
            onClick={() => navigate(`/user/${getCurrentUserId()}`)}
            className={`material-symbols-outlined cursor-pointer rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500`}>
            person
          </span>
          <span
            onClick={() => navigate(`/user/settings${screenSize >= 1025 ? '/general' : ''}`)}
            className={`material-symbols-outlined cursor-pointer rounded p-1 text-[26px] transition duration-0 hover:shadow-md hover:duration-500`}>
            settings
          </span>
        </div>
      </div>
    </div>
  );
}
