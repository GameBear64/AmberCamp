const ObjectId = require('mongoose').Types.ObjectId;
const { ConversationModel } = require('../../models/Conversation');
const { MessageModel } = require('../../models/Message');
const { UserModel } = require('../../models/User');

module.exports = async ({ io, socket }, data) => {
  if (data.userId === socket.apiUserId) return socket.emit('error', 'Go get some friends...');

  const conversation = await ConversationModel.findOne({ 'participants.user': { $in: [ObjectId(socket.apiUserId)] } });

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
  const targetUser = await UserModel.findOne({ _id: data.userId });
  if (targetUser) {
    let newMessage = await MessageModel.create({ author: socket.apiUserId, body: data.message });
    await ConversationModel.create({
      participants: [{ user: ObjectId(socket.apiUserId) }, { user: ObjectId(data.userId) }],
      messages: [newMessage.id],
    });

    newMessage = await MessageModel.populate(newMessage, { path: 'author', select: 'handle picture' });

    return io.to([data.userId, socket.apiUserId]).emit('message/created', newMessage);
  } else {
    return socket.emit('error', 'Conversation or user does not exist.');
  }
};
