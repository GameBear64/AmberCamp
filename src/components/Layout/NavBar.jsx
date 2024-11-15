import { Link } from 'react-router-dom';

import { useStore } from '@nanostores/react';

import { $chat } from '@stores/chat';

import { $user } from '../../stores/user';

export default function NavBar() {
  const user = useStore($user);
  const { id } = useStore($chat);

  return (
    <div className="sticky bottom-0 flex w-full justify-center border-t border-primary bg-base">
      <div className="mx-5 flex w-full max-w-md flex-row justify-between pt-2 text-center">
        <Link to={`/contacts/${user.id}`} className="material-symbols-rounded nav-btn">
          account_circle
        </Link>
        <Link to={`/chat/${id}`} className="material-symbols-rounded nav-btn">
          forum
        </Link>
        <Link to="/campfire" className="material-symbols-rounded nav-btn">
          quiz
        </Link>
        <Link to="/settings" className="material-symbols-rounded nav-btn">
          settings
        </Link>
      </div>
    </div>
  );
}
