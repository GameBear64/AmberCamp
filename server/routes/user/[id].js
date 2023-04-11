const joi = require('joi');
const { UserModel } = require('../../models/User');

const { joiValidate } = require('../../helpers/middleware');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json('User not found');

  let relationship = await user.getRelationship(req.apiUserId);

  return res.status(200).json({ ...user.toObject(), relationship });
};

const validationSchema = joi.object({
  email: joi.string().min(10).max(255).required().email(),
  password: joi.string().min(8).max(255).required(),
});

module.exports.post = [
  joiValidate(validationSchema),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json('User not found');

    let relationship = await user.getRelationship(req.apiUserId);

    let relStats = await relationship.updateOne({ ...req.body });
    if (relStats.acknowledged == 0) return res.status(404).json('Could not update');

    return res.status(200).json('Updated');
  },
];
