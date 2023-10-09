import { io } from 'socket.io-client';

export default io(`http://${window.location.hostname}:3030`, {
  autoConnect: true,
});
