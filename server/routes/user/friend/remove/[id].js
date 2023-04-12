const ObjectId = require('mongoose').Types.ObjectId;
const { UserModel } = require('../../../../models/User');

module.exports.post = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid Id');
  if (req.params.id == req.apiUserId) return res.status(418).json("That's just sad...");

  let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
  let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');

  if (!user.contacts.includes(req.params.id)) return res.status(409).json('Can not remove someone not in your contacts');

  if (user.pendingContacts.includes(req.userInSession)) {
    await friend.updateOne({ $pull: { pendingContacts: req.apiUserId } }, { timestamps: false });
  } else {
    //current user
    await user.updateOne({ $pull: { contacts: req.params.id } }, { timestamps: false });
    //user's friend
    await friend.updateOne({ $pull: { contacts: req.apiUserId } }, { timestamps: false });
  }

  return res.status(200).json();
};
