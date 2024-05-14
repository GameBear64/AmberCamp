const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { QuestionModel } = require('../../models/Question');
const { ConversationModel } = require('../../models/Conversation');
const { MessageModel } = require('../../models/Message');
const { UserModel } = require('../../models/User');

const { ConversationType } = require('../../helpers/enums.js');
const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');
const { LogTimings } = require('concurrently');

module.exports = [
  socketValidate({
    targetId: joi.custom(isObjectID).required(),
    message: joi.string().required(),
  }),
  async ({ io, socket }, data) => {
    if (data.targetId === socket.apiUserId) return socket.emit('error', 'Go get some friends...');

    // Is a camp fire question?
    const question = await QuestionModel.findOne({ _id: ObjectId(data.targetId) });

    const conversation = await ConversationModel.findOne({
      $or: [
        { _id: ObjectId(data.targetId) },
        {
          'participants.user': { $all: [ObjectId(socket.apiUserId), ObjectId(data.targetId)] },
        },
        {
          _id: { $in: question.answers },
          'participants.user': { $all: [ObjectId(socket.apiUserId), ObjectId(question?.author)] },
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

    // Is camp question but no conversation found
    if (question) {
      let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
      const newConversation = await ConversationModel.create({
        type: ConversationType.Question,
        participants: [{ user: ObjectId(socket.apiUserId) }, { user: ObjectId(question.author) }],
        messages: [newMessage.id],
      });

      await question.updateOne({ $push: { answers: newConversation } });

      newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });

      return io.to([data.targetId, socket.apiUserId]).emit('message/created', newMessage);
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
