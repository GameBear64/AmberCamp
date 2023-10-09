import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Layout from '@layout';
import { useFetch } from '@utils/useFetch';
import { useUpload } from '@utils/useUpload';

export default function ChatList() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Loading...');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState({ id: null, key: null, mimetype: null });

  useEffect(() => {
    useFetch({ url: '' }).then((data) => setMessage(data.message));
  }, []);

  function readFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      useUpload({
        data: event.target.result.split(';base64,').pop(),
        name: file.name,
        mimetype: file.type,
        setProgress,
      }).then((data) => setImage(data));
    };
  }

  return (
    <Layout
      left={
        <>
          <h1>index</h1>
          <p>{message.message}</p>
          <h1>ChatList</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </div>
          <div className="chats flex flex-col">
            <Link className="chat" to={`/chat`}>
              no chat
            </Link>
            <Link className="chat" to={`/chat/1`}>
              go to <span className="material-icons">chat_bubble</span>
            </Link>
            <Link className="chat" to={`/chat/2`}>
              go to <span className="material-icons">chat_bubble</span>
            </Link>
            <Link className="chat" to={`/chat/3`}>
              go to <span className="material-icons">chat_bubble</span>
            </Link>
            <Link className="chat" to={`/chat/4`}>
              go to <span className="material-icons">chat_bubble</span>
            </Link>
            <Link className="chat" to={`/chat/5`}>
              go to <span className="material-icons">chat_bubble</span>
            </Link>
            <br />
            <br />
            <br />
            <a href="http://localhost:3030/api-docs/#/" target="_blank" rel="noreferrer">
              API Documentation
            </a>
            <br />
            <br />
            <br />
            <br />
            <input type="file" onChange={(event) => readFile(event.target.files[0] || null)} />
            <br />
            <progress id="file" value={progress} max="100">
              {progress}%
            </progress>
            {(image?.mimetype?.includes('image') || image?.mimetype?.includes('video')) && image?.key && (
              <img src={`http://localhost:3030/recourse/${image?.key}?size=250`} alt="" />
            )}
          </div>
        </>
      }
      right={<Outlet />}
    />
  );
}
