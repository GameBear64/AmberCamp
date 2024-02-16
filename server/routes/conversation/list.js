/**
 * @openapi
 * /conversation/list:
 *   get:
 *     summary: Get conversations for the current user.
 *     description: |
 *       This endpoint retrieves a list of conversations for the current user, excluding conversations marked as hidden from history.
 *     tags:
 *       - conversation
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of conversations successfully retrieved.
 *       500:
 *         description: Internal server error.
 */

const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../models/Conversation');

module.exports.get = [
  // TODO: agregate with the relationship to get the nickname status as well
  // TODO: use lastMessageSeen

  async (req, res) => {
    const conversation = await ConversationModel.aggregate([
      {
        $match: {
          participants: {
            $elemMatch: {
              user: ObjectId(req.apiUserId),
              hideFromHistory: false
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participants.user',
          foreignField: '_id',
          pipeline: [{ $project: { _id: 1, picture: 1, handle: 1, name: 1 } }],
          as: 'populatedParticipants',
        },
      },
      {
        $set: {
          'participants': {
            $map: {
              input: '$participants', as: 'participant',
              in: { $mergeObjects: [ '$$participant', { user: { $arrayElemAt: ['$populatedParticipants', { $indexOfArray: ['$populatedParticipants._id', '$$participant.user'] }] } } ] }
            }
          }
        }
      },
      {
        $unset: 'populatedParticipants'
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);    

    res
      .status(200)
      .json({ direct: conversation.filter((c) => c.type == 'Direct'), group: conversation.filter((c) => c.type == 'Group') });
  },
];
