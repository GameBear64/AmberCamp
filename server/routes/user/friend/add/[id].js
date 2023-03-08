const ObjectId = require('mongoose').Types.ObjectId;
const { UserModel } = require('../../../../models/User');

module.exports.post = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Id');
  if (req.params.id == req.apiUserId) return res.status(418).send("That's just sad...");

  let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
  let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');

  if (user.contacts.includes(req.params.id)) return res.status(409).send('Already friends');

  if (user.pendingContacts.includes(req.params.id)) {
    //current user
    await user.updateOne(
      { $pull: { pendingContacts: req.params.id }, $push: { contacts: req.params.id } },
      { timestamps: false }
    );
    //user's friend
    await friend.updateOne({ $push: { contacts: req.apiUserId } }, { timestamps: false });
  } else {
    let updatedUser = await friend.updateOne({ $push: { pendingContacts: req.apiUserId } }, { timestamps: false });

    if (!updatedUser.acknowledged) return res.status(404).send('User not found');
  }
  return res.status(200).send();
};
