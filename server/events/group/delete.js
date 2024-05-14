const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../models/Conversation');
const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

module.exports = [
  socketValidate({
    groupId: joi.custom(isObjectID).required(),
  }),
  async ({ io, socket }, data) => {
    const group = await ConversationModel.findOne({ _id: data.groupId });
    const owner = group.participants.find((user) => user.groupOwner);

    if (owner.user.toString() != socket.apiUserId) {
      await group.updateOne({ $pull: { participants: { user: ObjectId(socket.apiUserId) } } }, { timestamps: false });
      // for system messages later
      // io.to(group.participants.map(({ user }) => user.toString())).emit('group/left', data.groupId, socket.apiUserId);
      io.to(socket.apiUserId).emit('group/deleted', data.groupId);
    }

    await group.deleteOne();
    return io.to(group.participants.map(({ user }) => user.toString())).emit('group/deleted', data.groupId);
  },
];
