const joi = require('joi');

const { DirectOrGroup } = require('../../../helpers/aggregations');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');

module.exports.get = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({ page: joi.number().min(1).required() }, InformationTypes.QUERY),
  async (req, res) => {
    const page = req.query.page || 1;
    const messagesPerPage = 20;

    const [conversation] = await ConversationModel.aggregate([
      ...DirectOrGroup(req),
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

    res.status(200).json(conversation);
  },
];
