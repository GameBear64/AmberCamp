const baseURL =
  import.meta.env.VITE_SERVER_URL == 'same'
    ? `${window.location.protocol}//${window.location.hostname}`
    : import.meta.env.VITE_SERVER_URL;

export function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
  };
  if (requireAuth) {
    options = {
      headers: {
        jwt: window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME),
        'content-type': 'application/json',
      },
      ...options,
    };
  }

  return fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/${url}`, options).then(async (res) => ({
    status: res.status,
    message: await res.text().then((text) => (text ? JSON.parse(text) : 'OK')),
  }));
}
