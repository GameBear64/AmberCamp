const joi = require('joi');
const { UserModel } = require('../../../models/User');

const { noBodyChanges, joiValidate } = require('../../../helpers/middleware');

const validationSchema = joi.object({
  name: joi.string().min(3).max(30),
  biography: joi.string().max(256),
  picture: joi.string(),
  background: joi.string(),
});

module.exports.patch = [
  noBodyChanges(),
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });
    if (user.matchedCount == 0) return res.status(404).json('User not found');

    return res.status(200).json('Updated');
  },
];
