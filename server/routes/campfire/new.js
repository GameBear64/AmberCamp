const joi = require('joi');

const { joiValidate } = require('../../middleware/validation');
const { QuestionCategory } = require('../../helpers/enums.js');
const { QuestionModel } = require('../../models/Question.js');

module.exports.post = [
  joiValidate({
    question: joi.string().min(5).max(2000).required(),
    category: joi.string().valid(...Object.values(QuestionCategory)),
    anonymous: joi.boolean().required(),
  }),
  async (req, res) => {
    const created = await QuestionModel.create({ ...req.body, author: req.apiUserId });

    return res.status(200).json(created);
  },
];
