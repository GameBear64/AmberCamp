import { Link } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import { $user } from '../../stores/user';

export default function NavBar() {
  const user = useStore($user);

  return (
    <div className="sticky bottom-0 flex w-full justify-center border-r-2 border-t-2 bg-white">
      <div className="mx-5 flex w-full max-w-md flex-row justify-between pt-2 text-center">
        <Link to={`/contacts/${user.id}`} className="material-symbols-outlined nav-btn">
          account_circle
        </Link>
        <Link to="/chat" className="material-symbols-outlined nav-btn">
          forum
        </Link>
        <Link className="material-symbols-outlined nav-btn ">quiz</Link>
        <Link to="/settings" className="material-symbols-outlined nav-btn">
          settings
        </Link>
      </div>
    </div>
  );
}
