const ObjectId = require('mongoose').Types.ObjectId;

const { QuestionModel } = require('../../models/Question');
const { participantsToUsers } = require('../../helpers/aggregations');

module.exports.get = async (req, res) => {
  let asked = await QuestionModel.aggregate([
    {
      $match: { author: ObjectId(req.apiUserId) },
    },
    {
      $lookup: {
        from: 'conversations',
        localField: 'answers',
        foreignField: '_id',
        as: 'answers',
      },
    },
    {
      $project: {
        seen: 0,
        rejected: 0,
        'answers.participants': 0,
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
        // pipeline: [...participantsToUsers],
        as: 'answers',
      },
    },
    {
      $project: {
        seen: 0,
        rejected: 0,
        'answers.participants': 0,
      },
    },
  ]);

  return res.status(200).json({ asked, answered });
};
