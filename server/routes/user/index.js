const { UserModel } = require('../../models/User');

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId });
  if (!user) return res.status(404).json('User not found');
  return res.status(200).json(user);
};

module.exports.delete = async (req, res) => {
  let rez = await UserModel.deleteOne({ _id: req.apiUserId });
  if (rez.deletedCount == 0) return res.status(404).json('User not found');

  res.status(200).json('User deleted');
};
