const { UserModel } = require("../../models/User");

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.apiUserId });
  return res.status(200).send(user);
};

module.exports.delete = async (req, res) => {
  res.status(200).send({ message: 'good bye user' });
};
