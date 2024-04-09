const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('./enums.js');

exports.participantsToUsers = [
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
                    '$populatedParticipants',
                    { $indexOfArray: ['$populatedParticipants._id', '$$participant.user'] },
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
    $unset: 'populatedParticipants',
  },
]

exports.DirectOrGroup = (req) => [
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
]