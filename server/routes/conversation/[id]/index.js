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
 */

const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('../../../helpers/enums.js');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');

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
              participants: {
                $all: [{ $elemMatch: { user: ObjectId(req.params.id) } }, { $elemMatch: { user: ObjectId(req.apiUserId) } }],
                $size: 2,
              },
            },
            {
              _id: ObjectId(req.params.id),
              type: ConversationType.Group,
              participants: {
                $all: [{ $elemMatch: { user: ObjectId(req.apiUserId) } }],
              },
            },
          ],
        },
      },
      {
        $project: {
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
      {
        $project: {
          messages: 1,
          messagesCount: {
            $size: '$messages',
          },
        }
      }
    ]);

    const lastMessage = conversation.messages[conversation.messagesCount - 1]?._id || null

    await ConversationModel.updateOne(
      { id: conversation?.id, 'participants.user': ObjectId(req.apiUserId) },
      { $set: 
        { 
          "participants.$.hideFromHistory" : false,
          "participants.$.lastMessageSeen" : lastMessage,
        }
      },
      { timestamps: false }
    );
    

    res.status(200).json(conversation || {});
  },
];


// this is dumb but ill keep it for reference
// module.exports.delete = [
//   joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
//   async (req, res) => {
//     const conversation = await ConversationModel.findOne({ 'participants.user': { $in: [ObjectId(req.apiUserId)] } });

//     if (conversation.type == ConversationType.Group) {
//       const isOwner = conversation.participants.find((user) => user.groupOwner);
//       if (!isOwner) return res.status(403).json('Only the group owner can delete the group.');
//     }
//     await ConversationModel.deleteOne({ _id: conversation._id });
//     res.status(200).json();
//   },
// ];
