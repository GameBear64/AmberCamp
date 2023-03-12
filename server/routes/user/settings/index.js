const joi = require('joi');
const { UserModel } = require('../../../models/User');

const validationSchema = joi.object({
  name: joi.string().min(3).max(30),
  biography: joi.string().max(256),
  picture: joi.string(),
  background: joi.string(),
});

module.exports.patch = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.json(200);

  let validation = validationSchema.validate(req.body);
  if (validation.error) return res.status(400).json(validation.error.details[0].message);

  let user = await UserModel.updateOne({ _id: req.apiUserId }, { ...req.body });
  if (user.matchedCount == 0) return res.status(404).json('User not found');

  return res.status(200).json('Updated');
};
