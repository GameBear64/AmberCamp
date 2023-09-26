module.exports = ({ io, socket }, message) => {
  io.emit('message', { user: socket.id, message });
};
