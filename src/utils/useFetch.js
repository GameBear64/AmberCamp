import { errorSnackBar } from './snackbars';
const baseURL =
  import.meta.env.VITE_SERVER_URL == 'same'
    ? `${window.location.protocol}//${window.location.hostname}`
    : import.meta.env.VITE_SERVER_URL;

export function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      jwt: requireAuth ? window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME) : '',
    },
  };

  return fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/${url}`, options)
    .then(async (res) => {
      // ugly but prevent "Unexpected end of JSON input"
      let data = await res.text();
      data = data ? JSON.parse(data) : '';
      // ==============================================

      if (res.status === 403) localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
      if (!res.ok) return Promise.reject(data || res.status);

      return data;
    })
    .catch((error) => {
      if (error === 'Not Authorized') {
        window.location.pathname = '/login';
      }
      errorSnackBar(error);
      return Promise.reject(error);
    });
}
