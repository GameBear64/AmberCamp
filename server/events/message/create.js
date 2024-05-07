const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const { ConversationModel } = require('../../models/Conversation');
const { MessageModel } = require('../../models/Message');
const { UserModel } = require('../../models/User');

const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

module.exports = [
  socketValidate({
    targetId: joi.custom(isObjectID).required(),
    message: joi.string().required(),
  }),
  async ({ io, socket }, data) => {
    if (data.targetId === socket.apiUserId) return socket.emit('error', 'Go get some friends...');

    const conversation = await ConversationModel.findOne({
      $or: [
        { _id: ObjectId(data.targetId) },
        {
          'participants.user': { $all: [ObjectId(socket.apiUserId), ObjectId(data.targetId)] },
        },
      ],
    });

    if (conversation) {
      let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
      await conversation.updateOne({
        $push: { messages: { $each: [newMessage.id], $position: 0 } },
        hideFromHistory: false,
      });

      const participantIDs = conversation.participants.map(({ user }) => user.toString());
      newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });

      return io.to(participantIDs).emit('message/created', newMessage);
    }

    // check if ID is of a person
    const targetUser = await UserModel.findOne({ _id: data.targetId });
    if (targetUser) {
      let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
      await ConversationModel.create({
        participants: [{ user: ObjectId(socket.apiUserId) }, { user: ObjectId(data.targetId) }],
        messages: [newMessage.id],
      });

      newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });

      return io.to([data.targetId, socket.apiUserId]).emit('message/created', newMessage);
    } else {
      return socket.emit('error', 'Conversation or user does not exist.');
    }
  },
];
