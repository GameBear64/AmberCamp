const ObjectId = require('mongoose').Types.ObjectId;

const { QuestionModel } = require('../../../models/Question.js');

const { participantsToUsers, populateMessages } = require('../../../helpers/aggregations');

module.exports.get = async (req, res) => {
  const [question] = await QuestionModel.aggregate([
    {
      $match: { _id: ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: 'conversations',
        localField: 'answers',
        foreignField: '_id',
        pipeline: [...participantsToUsers, ...populateMessages],
        as: 'answers',
      },
    },
  ]);

  return res.status(200).json(question?.answers || []);
};
