const { MessageModel } = require('../../models/Message');
const { ConversationModel } = require('../../models/Conversation');
const ObjectId = require('mongoose').Types.ObjectId;
const allEmojis = require('../../helpers/emojis.json')

module.exports = async ({ io, socket }, data) => {
  if (!allEmojis.includes(data.emoji)) return socket.emit('error', 'Invalid reaction');

  let targetMessage = await MessageModel.findOne({ _id: data.messageId });
  if (!targetMessage) return socket.emit('error', 'Message Not Found');

  const conversation = await ConversationModel.findOne({ messages: { $in: [ObjectId(data.messageId)] } });
  const participantIDs = conversation.participants.map(({ user }) => user.toString());

  if (targetMessage.reactions.some(r => r.color == data.color && r.emoji == data.emoji)) {
    await targetMessage.updateOne(
      { $pull: { reactions: { emoji: data.emoji, color: data.color } } },
      { timestamps: false }
    );
  } else {
    await targetMessage.updateOne(
      { $push: { reactions: { emoji: data.emoji, color: data.color } } },
      { timestamps: false }
    );
  }

  // get fresh data
  targetMessage = await MessageModel.findOne({ _id: data.messageId });

  return io.to(participantIDs).emit('message/reacted', {id: targetMessage._id, reactions: targetMessage.reactions});
};
