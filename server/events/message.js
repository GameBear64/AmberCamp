module.exports = ({ io, socket }, message) => {
  console.log('message', message);

  io.emit('message', { user: socket.id, message });
};
