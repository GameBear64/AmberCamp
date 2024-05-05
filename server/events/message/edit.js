const { MessageModel } = require('../../models/Message');
const { ConversationModel } = require('../../models/Conversation');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async ({ io, socket }, message) => {
  const targetMessage = await MessageModel.findOne({ _id: message.id });

  if (!targetMessage) return socket.emit('error', 'Message Not Found');
  if (targetMessage.author.toString() !== socket.apiUserId) return socket.emit('error', 'No permission to edit this message');

  const conversation = await ConversationModel.findOne({ messages: { $in: [ObjectId(message.id)] } });
  const participantIDs = conversation.participants.map(({ user }) => user.toString());

  await targetMessage.updateOne({body: message.body});

  return io.to(participantIDs).emit('message/edited', message);
};
