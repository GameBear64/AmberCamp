const { UserModel } = require("../../models/User");

module.exports.get = async (req, res) => {
  let user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return res.status(404).send("User not found");

  let relationship = await user.getRelationship(req.apiUserId)

  return res.status(200).send({ ...user.toObject(), relationship });
};

// update user - relation file
// module.exports.post = async (req, res) => {
//   let user = await UserModel.findOne({ _id: req.params.id });
//   if (!user) return res.status(404).send("User not found");

//   let relationship = await user.getRelationship(req.apiUserId)

//   return res.status(200).send({ ...user.toObject(), relationship });
// };