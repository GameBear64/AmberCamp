const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../models/Conversation');
const { QuestionModel } = require('../../models/Question');

module.exports.get = async (req, res) => {
  const asked = await QuestionModel.aggregate([
    {
      $match: { author: ObjectId(req.apiUserId) },
    },
  ]);

  const answered = await QuestionModel.aggregate([
    {
      $match: { seen: { $in: [ObjectId(req.apiUserId)] }, rejected: { $nin: [ObjectId(req.apiUserId)] } },
    },
  ]);

  return res.status(200).json({ asked, answered });
};
