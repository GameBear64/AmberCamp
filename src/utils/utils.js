import { setChat } from '@stores/chat';
import { clearPreferences } from '@stores/preferences';
import { removeUser } from '@stores/user';

import { useUpload } from './useUpload';
/**
 * @param {string} str - The input string to be chunked.
 * @param {number} size - The size of each chunk.
 */
export const chunkBuffer = function* (str, size) {
  const numChunks = Math.ceil(str.length / size);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    let progress = Math.floor(((i + 1) / numChunks) * 100);

    yield { chunk: str.substr(o, size), progress: `${i + 1}-${progress}-${numChunks}` };
  }
};

/**
 * @param {Object} object - The input object to be cleaned.
 * @param {string[]} desiredFields - An array of field names to include in the cleaned object.
 */
export const cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map((field) => ([field] in object ? { [field]: object[field] } : {})));
};

/**
 * Removes properties with empty values from an object.
 */
export const removeEmptyProperties = (object) => {
  return Object.keys(object)
    .filter((key) => object[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
};

/**
 * @param {File} file - The file to be read.
 * @returns {Promise} A promise that resolves with the file data or rejects with an error message.
 */
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

/**
 * Decodes HTML entities in a string.
 * @param {string} input - The input string containing HTML-encoded entities.
 */
export function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

export function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
export const clearAll = () => {
  removeUser();
  setChat('');
  clearPreferences();
};
