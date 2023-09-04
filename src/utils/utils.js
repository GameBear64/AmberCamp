import { useUpload } from './useUpload';

export const chunkBuffer = function* (str, size) {
  const numChunks = Math.ceil(str.length / size);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    let progress = Math.floor(((i + 1) / numChunks) * 100);
    yield { chunk: str.substr(o, size), progress: `${i + 1}-${progress}-${numChunks}` };
  }
};

export const cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map((field) => ([field] in object ? { [field]: object[field] } : {})));
};

export const removeEmptyProperties = (object) => {
  return Object.keys(object)
    .filter((key) => object[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
};

export async function readFile(file) {
  if (!file) return Promise.reject('No file provided');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      useUpload({
        data: event.target.result.split(';base64,').pop(),
        name: file.name,
        mimetype: file.type,
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    };

    reader.onerror = (error) => reject(error);
  });
}

export const getCurrentUserId = () => {
  try {
    const token = window.localStorage.getItem(`${import.meta.env.VITE_LOCAL_STORAGE_NAME}`);
    return JSON.parse(atob(token.split('.')[1]))?.id;
  } catch (e) {
    return null;
  }
};
