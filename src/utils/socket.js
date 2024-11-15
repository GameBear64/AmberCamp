import { io } from 'socket.io-client';

import { errorSnackBar, impossibleSnackBar } from './snackbars';

const socket = io(`http://${window.location.hostname}:3030`, {
  autoConnect: true,
  auth: {
    jwt: window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME),
  },
});

socket.on('error', (data) => {
  errorSnackBar(data);
});

socket.on('impossible', (data) => {
  impossibleSnackBar(data);
});

export default socket;
