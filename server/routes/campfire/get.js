const joi = require('joi');

const { joiValidate, InformationTypes } = require('../../middleware/validation');
const { QuestionCategory } = require('../../helpers/enums.js');
const { QuestionModel } = require('../../models/Question.js');

module.exports.get = [
  joiValidate({ category: joi.string().valid(...Object.values(QuestionCategory)) }, InformationTypes.QUERY),
  async (req, res) => {
    const question = await QuestionModel.findOne({
      seen: { $ne: req.apiUserId },
      rejected: { $ne: req.apiUserId },
      author: { $ne: req.apiUserId },
    }).sort({
      createdAt: -1,
    });

    if (!question) return res.status(404).json('No more questions');

    // await question.updateOne({ $push: { seen: req.apiUserId } });

    return res.status(200).json(question);
  },
];
