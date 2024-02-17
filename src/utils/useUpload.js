import getMD5 from 'spark-md5';

import { chunkBuffer } from './utils';

const baseURL =
  import.meta.env.VITE_SERVER_URL == 'same'
    ? `${window.location.protocol}//${window.location.hostname}`
    : import.meta.env.VITE_SERVER_URL;

export async function useUpload({ data, name, mimetype, size = 1000000 /* 1MB */, setProgress = () => {} }) {
  let md5 = getMD5.hash(data);
  let chunkGenerator = chunkBuffer(data, size);

  function postChunk({ done, value }, rez) {
    if (rez?.key) return rez;

    let { chunk, progress } = value;
    let [_currentChunk, progressPercentage] = progress.split('-');
    setProgress(progressPercentage);

    return fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/recourse/upload`, {
      method: 'POST',
      headers: {
        jwt: window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name.split('.').slice(0, -1).join('.'),
        type: name.split('.').pop(),
        mimetype,
        data: chunk,
        md5,
        progress,
      }),
    }).then(async (res) => {
      let rez = await res?.text();
      rez = rez?.length > 0 ? JSON.parse(rez) : null;
      if (res.ok && !done) {
        return postChunk(chunkGenerator.next(), rez);
      }
    });
  }

  return await postChunk(chunkGenerator.next());
}
