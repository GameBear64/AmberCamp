const joi = require('joi');

const { UserModel } = require('../../../../models/User');

const { joiValidate, InformationTypes } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

module.exports.post = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("That's just sad...");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
    let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');

    if (!friend) return res.status(404).json('User not found');

    if (user.contacts.includes(req.params.id)) return res.status(409).json('Already friends');

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

      if (!updatedUser.acknowledged) return res.status(404).json('User not found');
    }
    return res.status(200).json();
  },
];
