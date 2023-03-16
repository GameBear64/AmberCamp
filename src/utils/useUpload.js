import { chunkBuffer } from './utils';

export function useUpload({ file, name, size = 1000000 /* 1MB */ }) {
  for (let chunk of chunkBuffer(file, size)) {
    console.log(name, ' chunk: ', chunk);
  }
  // const baseURL =
  //   import.meta.env.VITE_SERVER_URL == 'same'
  //     ? `${window.location.protocol}//${window.location.hostname}`
  //     : import.meta.env.VITE_SERVER_URL;

  // let options = {
  //   method: 'POST',
  // };

  // fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/recourse/upload`, options).then((res) => res.json());

  return;
}
