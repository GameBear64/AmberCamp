import { Link } from 'react-router-dom';

export default function ChatList() {
  return (
    <div className="chat">
      <h1>chat</h1>
      <p className="font-bold underline mt-10">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <Link to={`/`}>
        back to <span className="material-icons">home</span>
      </Link>
    </div>
  );
}
