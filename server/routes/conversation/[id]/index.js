/**
 * @openapi
 * /conversation/{id}:
 *   get:
 *     summary: Get conversation details.
 *     description: |
 *       This endpoint retrieves details about a conversation based on the provided conversation ID.
 *     tags:
 *       - conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to retrieve details from.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Conversation details successfully retrieved.
 *       418:
 *         description: Cannot talk to yourself.
 *   post:
 *     summary: Send a message to a conversation.
 *     description: |
 *       This endpoint allows a user to send a message to a conversation identified by the provided conversation ID.
 *     tags:
 *       - conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to send a message to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 maxLength: 50000
 *                 required: true
 *           description: The message to send.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *       201:
 *         description: Conversation created and message sent successfully (if conversation did not exist).
 *       406:
 *         description: Conversation or user does not exist.
 *       418:
 *         description: Cannot send a message to yourself.
 *       429:
 *         description: Rate limit exceeded.
 *   delete:
 *     summary: Delete a conversation.
 *     description: |
 *       This endpoint allows a user to delete a conversation based on the provided conversation ID.
 *     tags:
 *       - conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to delete.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Conversation deleted successfully.
 *       403:
 *         description: Only the group owner can delete the group.
 */

const joi = require('joi');
const throttle = require('express-throttle');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('../../../enums.js');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');
const { UserModel } = require('../../../models/User');
const { MessageModel } = require('../../../models/Message');
// const { ParticipantModel } = require('../../../models/Participant');

module.exports.get = [
  joiValidate({ page: joi.number().min(1) }, InformationTypes.QUERY),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
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
            { $project: { _id: 0, __v: 0, conversation: 0 } },
          ],
          as: 'participants',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          pipeline: [{ $project: { _id: 1, picture: 1, handle: 1, name: 1 } }],
          as: 'users',
        },
      },
      {
        $addFields: {
          participants: {
            $map: {
              input: '$participants',
              as: 'participant',
              in: {
                $mergeObjects: [
                  '$$participant',
                  {
                    user: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$users',
                            as: 'user',
                            cond: { $eq: ['$$user._id', '$$participant.user'] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
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
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                pipeline: [{ $project: { _id: 1, picture: 1, handle: 1, name: 1 } }],
                as: 'author',
              },
            },
            {
              $unwind: '$author',
            },
          ],
          as: 'messages',
        },
      },
    ]);

    await ConversationModel.updateOne({ id: conversation?.id }, { hideFromHistory: false }, { timestamps: false });
    res.status(200).json(conversation || {});
  },
];

module.exports.post = [
  throttle({ burst: 10, period: '5s' }),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({ message: joi.string().max(50000).required() }),
  async (req, res) => {
    if (req.params.id === req.apiUserId) return res.status(418).json('Go get some friends...');

    const conversation = await ConversationModel.findOne({ 'participants.user': { $in: [ObjectId(req.apiUserId)] } });

    if (conversation) {
      const newMessage = await MessageModel.create({ author: req.apiUserId, body: req.body.message });
      await conversation.updateOne({
        $push: { messages: { $each: [newMessage.id], $position: 0 } },
        hideFromHistory: false,
      });

      return res.status(200).json();
    }

    // check if ID is of a person
    const targetUser = await UserModel.findOne({ _id: req.params.id });
    if (targetUser) {
      const newMessage = await MessageModel.create({ author: req.apiUserId, body: req.body.message });
      await ConversationModel.create({
        participants: [{ user: ObjectId(req.apiUserId) }, { user: ObjectId(req.params.id) }],
        messages: [newMessage.id],
      });

      return res.status(201).json();
    } else {
      return res.status(406).json('Conversation or user does not exist.');
    }
  },
];

module.exports.delete = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    const conversation = await ConversationModel.findOne({ 'participants.user': { $in: [ObjectId(req.apiUserId)] } });

    if (conversation.type == ConversationType.Group) {
      const isOwner = conversation.participants.find((user) => user.groupOwner);
      if (!isOwner) return res.status(403).json('Only the group owner can delete the group.');
    }
    await ConversationModel.deleteOne({ _id: conversation._id });
    res.status(200).json();
  },
];
