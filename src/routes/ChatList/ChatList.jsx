import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';

import './ChatList.style.scss';

export default function ChatList() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    useFetch({ url: '', requireAuth: false }).then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>index</h1>
      <p>{message}</p>
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
