const joi = require('joi');
const throttle = require('express-throttle');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('../../../enums.js');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');

const { ConversationModel } = require('../../../models/Conversation');
const { UserModel } = require('../../../models/User');
const { MessageModel } = require('../../../models/Message');
const { ParticipantModel } = require('../../../models/Participant');

module.exports.get = [
  joiValidate({ page: joi.number().min(1) }, InformationTypes.QUERY),
  async (req, res) => {
    if (req.params.id === req.apiUserId) return res.status(418).json('You want to talk to yourself? Think.');

    const [conversation] = await ConversationModel.aggregate([
      {
        $match: {
          $or: [
            {
              type: ConversationType.Direct,
              users: { $all: [ObjectId(req.params.id), ObjectId(req.apiUserId)], $size: 2 },
            },
            {
              _id: ObjectId(req.params.id),
              type: ConversationType.Group,
              users: { $all: [ObjectId(req.apiUserId)] },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'participants',
          localField: '_id',
          foreignField: 'conversation',
          let: { users: '$users' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$user', '$$users'] },
              },
            },
          ],
          as: 'participants',
        },
      },
      {
        $project: {
          name: 1,
          participants: 1,
          icon: 1,
          type: 1,
          messagesCount: {
            $size: '$messages',
          },
          messages: {
            $slice: ['$messages', 0, 20],
          },
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'messages',
          foreignField: '_id',
          as: 'messages',
        },
      },
    ]);

    await ConversationModel.updateOne({ id: conversation.id }, { hideFromHistory: false }, { timestamps: false });
    res.status(200).json(conversation);
  },
];

module.exports.post = [
  throttle({ burst: 10, period: '5s' }),
  joiValidate(joi.object({ message: joi.string().max(50000).required() })),
  async (req, res) => {
    if (req.params.id === req.apiUserId) return res.status(418).json('Go get some friends...');

    const [conversation] = await ConversationModel.aggregate([
      {
        $match: {
          $or: [
            {
              type: ConversationType.Direct,
              users: { $all: [ObjectId(req.params.id), ObjectId(req.apiUserId)], $size: 2 },
            },
            {
              _id: ObjectId(req.params.id),
              type: ConversationType.Group,
              users: { $all: [ObjectId(req.apiUserId)] },
            },
          ],
        },
      },
    ]);

    if (conversation) {
      const newMessage = await MessageModel.create({ author: req.apiUserId, body: req.body.message });
      await ConversationModel.updateOne(
        { id: conversation.id },
        { $push: { messages: { $each: [newMessage.id], $position: 0 } }, hideFromHistory: false }
      );

      return res.status(200).json();
    }

    // check if ID is of a person
    const targetUser = await UserModel.findOne({ _id: req.params.id });
    if (targetUser) {
      const newMessage = await MessageModel.create({ author: req.apiUserId, body: req.body.message });
      await ConversationModel.create({ users: [req.apiUserId, req.params.id], messages: [newMessage.id] });

      return res.status(201).json();
    } else {
      return res.status(406).json('Conversation or user does not exist.');
    }
  },
];

// module.exports.delete = patch dm themes here, group settings are at the group endpoint

module.exports.delete = [
  async (req, res) => {
    const [conversation] = await ConversationModel.aggregate([
      {
        $match: {
          $or: [
            {
              type: ConversationType.Direct,
              users: { $all: [ObjectId(req.params.id), ObjectId(req.apiUserId)], $size: 2 },
            },
            {
              _id: ObjectId(req.params.id),
              type: ConversationType.Group,
              users: { $all: [ObjectId(req.apiUserId)] },
            },
          ],
        },
      },
    ]);

    if (conversation.type == ConversationType.Group) {
      const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: conversation._id });

      if (!groupMember.groupOwner) return res.status(403).json('Only the group owner can delete the group.');
    }

    await ConversationModel.deleteOne({ _id: conversation._id });

    res.status(200).json();
  },
];
