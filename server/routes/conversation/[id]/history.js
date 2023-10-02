const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('../../../enums.js');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');

const { ConversationModel } = require('../../../models/Conversation');

module.exports.get = [
  joiValidate({ page: joi.number().min(1).required() }, InformationTypes.QUERY),
  async (req, res) => {
    const page = req.query.page || 1;
    const messagesPerPage = 20;

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
        $project: {
          messagesCount: {
            $size: '$messages',
          },
          messagesPerPage: {
            $literal: messagesPerPage,
          },
          pages: {
            $ceil: {
              $divide: [{ $size: '$messages' }, { $literal: messagesPerPage }],
            },
          },
          messages: {
            $slice: ['$messages', page * messagesPerPage - messagesPerPage, page * messagesPerPage],
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

    res.status(200).json(conversation);
  },
];
