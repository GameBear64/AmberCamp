module.exports = async ({ io, socket }, {to}) => {
  // TODO: add throttle  
  return io.to(to).emit('message/typing', socket.apiUserId);
};
