const { MessageModel } = require('../../models/Message');
const { ConversationModel } = require('../../models/Conversation');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async ({ io, socket }, messageId) => {
  const targetMessage = await MessageModel.findOne({ _id: messageId });

  if (!targetMessage) return socket.emit('error', 'Message Not Found');
  if (targetMessage.author.toString() !== socket.apiUserId) return socket.emit('error', 'No permission to delete this message');

  const conversation = await ConversationModel.findOne({ messages: { $in: [ObjectId(messageId)] } });
  const participantIDs = conversation.participants.map(({ user }) => user.toString());

  await conversation.updateOne({ $pull: { messages: targetMessage._id } });
  await targetMessage.deleteOne();

  return io.to(participantIDs).emit('message/deleted', messageId);
};
