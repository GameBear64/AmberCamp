import { io } from 'socket.io-client';

export default io(`http://${window.location.hostname}:3030`, {
  autoConnect: true,
  auth: {
    jwt: window.localStorage.getItem(`${import.meta.env.VITE_LOCAL_STORAGE_NAME}`),
  },
});
