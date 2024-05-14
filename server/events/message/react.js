const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const { MessageModel } = require('../../models/Message');
const { ConversationModel } = require('../../models/Conversation');
const allEmojis = require('../../helpers/emojis.json');

const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

module.exports = [
  socketValidate({
    messageId: joi.custom(isObjectID).required(),
    color: joi.string().required(),
    emoji: joi
      .string()
      .valid(...allEmojis)
      .required(),
  }),
  async ({ io, socket }, data) => {
    if (!allEmojis.includes(data.emoji)) return socket.emit('error', 'Invalid reaction');

    let targetMessage = await MessageModel.findOne({ _id: data.messageId });
    if (!targetMessage) return socket.emit('error', 'Message Not Found');

    const conversation = await ConversationModel.findOne({ messages: { $in: [ObjectId(data.messageId)] } });
    const participantIDs = conversation.participants.map(({ user }) => user.toString());

    const foundReaction = targetMessage.reactions.find(
      (r) => r.color == data.color && r.emoji == data.emoji && r.author == socket.apiUserId
    )?._id;
    if (foundReaction) {
      await targetMessage.updateOne({ $pull: { reactions: { _id: foundReaction } } }, { timestamps: false });
    } else {
      await targetMessage.updateOne(
        { $push: { reactions: { emoji: data.emoji, color: data.color, author: socket.apiUserId } } },
        { timestamps: false }
      );
    }

    // get fresh data
    targetMessage = await MessageModel.findOne({ _id: data.messageId }).populate('reactions.author', 'name handle');

    return io.to(participantIDs).emit('message/reacted', { id: targetMessage._id, reactions: targetMessage.reactions });
  },
];
