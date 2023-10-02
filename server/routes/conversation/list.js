// GET: Get all conversations that include the user id in its participants, order by date
// fetch all user participation, get the hidden conversations, filter above list and send

const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../models/Conversation');

module.exports.get = [
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
            { $project: { hideFromHistory: 1 } },
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
          pipeline: [{ $project: { _id: 1, picture: 1, handle: 1 } }],
          as: 'users',
        },
      },
      {
        $project: {
          messages: 0,
          createdAt: 0,
          currentUser: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$type',
          conversations: { $push: '$$ROOT' },
        },
      },
    ]);

    // order by date updated

    res.status(200).json(conversation);
  },
];
