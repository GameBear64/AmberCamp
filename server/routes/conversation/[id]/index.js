const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { participantsToUsers, DirectOrGroup, populateMessages } = require('../../../helpers/aggregations');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');

module.exports.get = [
  joiValidate({ page: joi.number().min(1) }, InformationTypes.QUERY),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id === req.apiUserId) return res.status(418).json('You want to talk to yourself? Think.');

    const [conversation] = await ConversationModel.aggregate([
      ...DirectOrGroup(req),
      ...participantsToUsers,
      {
        $project: {
          participants: 1,
          type: 1,
          name: 1,
          color: 1,
          icon: 1,
          updatedAt: 1,
          messagesCount: {
            $size: '$messages',
          },
          messages: {
            $slice: ['$messages', 0, 20],
          },
        },
      },
      ...populateMessages,
      {
        $project: {
          messages: 1,
          participants: 1,
          type: 1,
          name: 1,
          color: 1,
          icon: 1,
          updatedAt: 1,
          messagesCount: 1,
        },
      },
    ]);

    const lastMessage = conversation?.messages[conversation.messagesCount - 1]?._id || null;

    await ConversationModel.updateOne(
      { id: conversation?.id, 'participants.user': ObjectId(req.apiUserId) },
      {
        $set: {
          'participants.$.hideFromHistory': false,
          'participants.$.lastMessageSeen': lastMessage,
        },
      },
      { timestamps: false }
    );

    res.status(200).json(conversation || {});
  },
];
