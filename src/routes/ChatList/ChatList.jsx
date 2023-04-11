import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';
import { useUpload } from '../../utils/useUpload';

import './ChatList.style.scss';

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
      }).then((img) => setImage({ ...img, mimetype: file.type }));
    };
  }

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
      <br />
      <br />
      <input type="file" onChange={(event) => readFile(event.target.files[0] || null)} />
      <br />
      <progress id="file" value={progress} max="100">
        {progress}%
      </progress>
      {image?.key && <img src={`http://localhost:3030/recourse/${image?.id}/${image?.key}?size=250`} alt="" />}
    </div>
  );
}
