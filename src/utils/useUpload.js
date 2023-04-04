import getMD5 from 'spark-md5';
import { chunkBuffer } from './utils';

const baseURL =
  import.meta.env.VITE_SERVER_URL == 'same'
    ? `${window.location.protocol}//${window.location.hostname}`
    : import.meta.env.VITE_SERVER_URL;

export function useUpload({ data, name, type, size = 1000000 /* 1MB */, setProgress = () => {} }) {
  let md5 = getMD5.hash(data);
  let chunkGenerator = chunkBuffer(data, size);

  function postChunk({ done, value }) {
    if (done) return 'Done';

    let { chunk, progress } = value;
    let [_currentChunk, progressPercentage] = progress.split('-');
    setProgress(progressPercentage);

    return fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/recourse/upload`, {
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        data: chunk,
        mimetype: type,
        md5,
        progress,
      }),
    }).then((res) => {
      if (res.ok && !done) {
        postChunk(chunkGenerator.next());
      }
    });
  }

  return postChunk(chunkGenerator.next());
}
