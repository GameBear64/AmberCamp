const joi = require('joi');
const { UserModel } = require('../../models/User');

const { joiValidate } = require('../../middleware/validation');
const { getFriendshipStatus } = require('../../utils');

module.exports.get = async (req, res) => {
  const selectionString = '+pendingContacts +contacts +blocked';
  let status = 'Me';

  const user = await UserModel.findOne({ _id: req.params.id }).select(selectionString);
  if (!user) return res.status(404).json('User not found');

  let relationship = await user.getRelationship(req.apiUserId);

  if (req.apiUserId !== req.params.id) {
    const currentUser = await UserModel.findOne({ _id: req.apiUserId }).select(selectionString);
    status = getFriendshipStatus(currentUser, user);
  }

  // remove private fields
  const cleanedUser = user?.toObject();
  delete cleanedUser.pendingContacts;
  delete cleanedUser.contacts;
  delete cleanedUser.blocked;

  return res.status(200).json({ ...relationship?.toObject(), ...cleanedUser, status });
};

module.exports.post = [
  joiValidate({
    nickname: joi.string().min(3).max(30).optional(),
    notes: joi.array().optional(),
    accentColor: joi.string().optional(),
  }),
  async (req, res) => {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json('User not found');

    let relationship = await user.getRelationship(req.apiUserId);

    let relStats = await relationship.updateOne({ ...req.body });
    if (relStats.acknowledged == 0) return res.status(404).json('Could not update');

    return res.status(200).json();
  },
];

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
