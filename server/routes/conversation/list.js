const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../models/Conversation');
const { participantsToUsers } = require('../../helpers/aggregations');

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
              hideFromHistory: false,
            },
          },
        },
      },
      ...participantsToUsers,
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
