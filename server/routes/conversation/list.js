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
  async (req, res) => {
    const conversation = await ConversationModel.aggregate([
      {
        $match: {
          users: { $all: [ObjectId(req.apiUserId)] },
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
                user: ObjectId(req.apiUserId),
                $expr: { $in: ['$user', '$$users'] },
              },
            },
            { $project: { hideFromHistory: 1, updatedAt: 1 } },
          ],
          as: 'currentUser',
        },
      },
      {
        $unwind: '$currentUser',
      },
      {
        $match: {
          'currentUser.hideFromHistory': { $ne: true },
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
        $project: {
          newMessages: {
            $gt: [
              { $convert: { input: '$currentUser.updatedAt', to: 'double' } },
              { $convert: { input: '$updatedAt', to: 'double' } },
            ],
          },
          users: 1,
          type: 1,
          name: 1,
          icons: 1,
          theme: 1,
        },
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
