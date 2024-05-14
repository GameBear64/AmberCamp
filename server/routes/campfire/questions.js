const ObjectId = require('mongoose').Types.ObjectId;

const { QuestionModel } = require('../../models/Question');
const { participantsToUsers } = require('../../helpers/aggregations');

module.exports.get = async (req, res) => {
  const asked = await QuestionModel.aggregate([
    {
      $match: { author: ObjectId(req.apiUserId) },
    },
    {
      $lookup: {
        from: 'conversations',
        localField: 'answers',
        foreignField: '_id',
        pipeline: [...participantsToUsers],
        as: 'answers',
      },
    },
  ]);

  const answered = await QuestionModel.aggregate([
    {
      $match: { seen: { $in: [ObjectId(req.apiUserId)] }, rejected: { $nin: [ObjectId(req.apiUserId)] } },
    },
    {
      $lookup: {
        from: 'conversations',
        localField: 'answers',
        foreignField: '_id',
        pipeline: [...participantsToUsers],
        as: 'answers',
      },
    },
  ]);

  // not trully anonymous

  return res.status(200).json({ asked, answered });
};
