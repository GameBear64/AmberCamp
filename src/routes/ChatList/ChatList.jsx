import { useState } from 'react';
import { Link } from 'react-router-dom';

import './ChatList.style.scss';

export default function ChatList() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>index</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p className="font-bold underline mt-10">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Link to={`chat`}>
        go to <span className="material-icons">chat_bubble</span>
      </Link>
    </div>
  );
}
