const joi = require('joi');
const { UserModel } = require('../../models/User');
const { joiValidate } = require('../../middleware/validation');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId });

  if (!user) return res.status(404).json('User not found');
  return res.status(200).json(user);
};

module.exports.delete = [
  joiValidate({ password: joi.string().min(8).max(255).required() }),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.apiUserId }).select('+password +settings').populate('picture');

    let validPassword = await user.validatePassword(req.body?.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    await user.deleteOne();

    res.status(200).json();
  },
];
