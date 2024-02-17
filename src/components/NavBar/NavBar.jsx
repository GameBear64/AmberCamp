import { Link } from 'react-router-dom';

import { getUserId } from '@stores/user';

export default function NavBar() {
  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden border-r-2 border-gray-300 p-2">
      <div className="flex flex-col gap-2 text-center">
        <Link to={`/contacts/${getUserId()}`} className="material-symbols-outlined nav-btn">
          account_circle
        </Link>
        <Link to="/chat" className="material-symbols-outlined nav-btn">
          forum
        </Link>
        <Link to={`/contacts/${getUserId()}`} className="material-symbols-outlined nav-btn">
          group
        </Link>
        <Link className="material-symbols-outlined nav-btn ">quiz</Link>
      </div>
      <Link to="/settings" className="material-symbols-outlined nav-btn">
        settings
      </Link>
    </div>
  );
}
