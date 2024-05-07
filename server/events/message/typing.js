const ObjectId = require('mongoose').Types.ObjectId;
const { ConversationModel } = require('../../models/Conversation');
const { UserModel } = require('../../models/User');

module.exports = async ({ io, socket }, { to }) => {
  const conversation = await ConversationModel.findOne({ _id: ObjectId(to) });
  const participantIDs = conversation?.participants?.map(({ user }) => user.toString()) || to;

  const currentUser = await UserModel.findOne({ _id: socket.apiUserId }).select('handle picture');

  return io.to(participantIDs).emit('message/typing', currentUser);
};
