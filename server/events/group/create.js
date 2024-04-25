const ObjectId = require('mongoose').Types.ObjectId;
const { ConversationModel } = require('../../models/Conversation');
const joi = require('joi');
const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

module.exports = [
  socketValidate({
    title: joi.string().required(),
    participants: joi.array().min(3).max(50).items(joi.custom(isObjectID)).required(),
    picture: joi.custom(isObjectID).optional(),
    color: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
    icon: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
  }),
  async ({ io, socket }, data) => {
    const group = await ConversationModel.create({
      ...data,
      participants: [
        ...data.participants.map((user) => ({ user: ObjectId(user) })),
        { user: ObjectId(socket.apiUserId), groupOwner: true },
      ],
    });

    return io.to(group.participants.map(({ user }) => user.toString())).emit('group/created', group);
  },
];
