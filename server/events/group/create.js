// const ObjectId = require('mongoose').Types.ObjectId;
// const { ConversationModel } = require('../../models/Conversation');
// const { MessageModel } = require('../../models/Message');
// const { UserModel } = require('../../models/User');
const { socketValidate } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');
const joi = require('joi');

module.exports = [
  socketValidate({
    title: joi.string().required(),
    participants: joi.array().items(joi.custom(isObjectID)),
    picture: joi.string().optional(),
    color: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
    icon: joi.string().when('picture', { is: joi.exist(), then: joi.optional(), otherwise: joi.required() }),
  }),
  async ({ io, socket }, data) => {
    console.log(data);
    return socket.emit('group/created', 'heyo');
    // if (data.userId === socket.apiUserId) return socket.emit('error', 'Go get some friends...');
    // await ConversationModel.create({
    //   participants: [{ user: ObjectId(socket.apiUserId), groupOwner: true }, { user: ObjectId(data.userId) }],
    // });
    // const conversation = await ConversationModel.findOne({
    //   'participants.user': { $all: [ObjectId(socket.apiUserId), ObjectId(data.userId)] },
    // });
    // if (conversation) {
    //   let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
    //   await conversation.updateOne({
    //     $push: { messages: { $each: [newMessage.id], $position: 0 } },
    //     hideFromHistory: false,
    //   });
    //   const participantIDs = conversation.participants.map(({ user }) => user.toString());
    //   newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });
    //   console.log(participantIDs);
    //   return io.to(participantIDs).emit('message/created', newMessage);
    // }
    // // check if ID is of a person
    // const targetUser = await UserModel.findOne({ _id: data.userId });
    // if (targetUser) {
    //   let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
    //   await ConversationModel.create({
    //     participants: [{ user: ObjectId(socket.apiUserId) }, { user: ObjectId(data.userId) }],
    //     messages: [newMessage.id],
    //   });
    //   newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });
    //   return io.to([data.userId, socket.apiUserId]).emit('message/created', newMessage);
    // } else {
    //   return socket.emit('error', 'Conversation or user does not exist.');
    // }
  },
];
