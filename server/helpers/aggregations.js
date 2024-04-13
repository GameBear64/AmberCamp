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
];

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
];

exports.populateMessages = [
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
        {
          $lookup: {
            from: 'users',
            localField: 'reactions.author',
            foreignField: '_id',
            pipeline: [{ $project: { _id: 1, handle: 1, name: 1 } }],
            as: 'reactionAuthors',
          },
        },
        {
          $set: {
            reactions: {
              $map: {
                input: '$reactions',
                as: 'reaction',
                in: {
                  $mergeObjects: [
                    '$$reaction',
                    {
                      author: {
                        $arrayElemAt: ['$reactionAuthors', { $indexOfArray: ['$reactionAuthors._id', '$$reaction.author'] }],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $unset: 'reactionAuthors' },
      ],
      as: 'messages',
    },
  },
];
