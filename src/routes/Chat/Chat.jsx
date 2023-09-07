import { Link, Outlet, useParams } from 'react-router-dom';

import resizeScreen from '@utils/resizeScreen';
export default function ChatList() {
  const screenSize = resizeScreen();
  let { id } = useParams();
  return (
    <>
      <div className="chat">
        <h1>Chat {id}</h1>
        {screenSize <= 800 && (
          <Link to={`/chat`}>
            back to <span className="material-icons">home</span>
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
}
