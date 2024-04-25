const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { socketValidate } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');
const { ConversationModel } = require('../../../models/Conversation');

module.exports = [
  socketValidate({
    groupId: joi.custom(isObjectID).required(),
    participants: joi.array().min(3).max(50).items(joi.custom(isObjectID)).required(),
  }),
  async ({ io, socket }, data) => {
    let group = await ConversationModel.findOne({ _id: data.groupId });
    const owner = group.participants.find((user) => user.groupOwner);

    if (owner.user.toString() != socket.apiUserId) return socket.emit('error', 'Only the owner can do this.');

    await group.updateOne(
      { _id: ObjectId(data.groupId) },
      { $pull: { participants: data.participants.map((p) => ({ _id: ObjectId(p.id) })) } },
      { timestamps: false }
    );

    group = await ConversationModel.findOne({ _id: data.groupId });

    return io.to(group.participants.map(({ user }) => user.toString())).emit('group/participants/removed', data.participants);
  },
];
