export function useFetch({ url, requireAuth = true }) {
  const baseURL =
    import.meta.env.VITE_SERVER_URL == 'same'
      ? `${window.location.protocol}//${window.location.hostname}`
      : import.meta.env.VITE_SERVER_URL;

  let options = {};
  if (requireAuth) {
    options = {
      ...options,
      headers: {
        jwt: JSON.parse(window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME)).jwt,
        'content-type': 'application/json',
      },
    };
  }

  return fetch(`${baseURL}:${import.meta.env.VITE_SERVER_PORT}/${url}`, options).then((res) => res.json());
}
