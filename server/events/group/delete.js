const { ConversationModel } = require('../../models/Conversation');
const joi = require('joi');
const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

module.exports = [
  socketValidate({
    groupId: joi.custom(isObjectID).required(),
    name: joi.string().required(),
    color: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
    icon: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
  }),
  async ({ io, socket }, data) => {
    const group = await ConversationModel.findOne({ _id: data.groupId });
    const owner = group.participants.find((user) => user.groupOwner);
    if (owner.user.toString() != socket.apiUserId) return socket.emit('error', 'Only the owner can do this.');

    await group.deleteOne();

    return io.to(group.participants.map(({ user }) => user.toString())).emit('group/deleted', data.groupId);
  },
];
