const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate, InformationTypes } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

module.exports.post = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("Removing yourself happens at the 'user/delete' route.");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('contacts pendingContacts');
    let friend = await UserModel.findOne({ _id: req.params.id }).select('contacts pendingContacts');
    if (!friend) return res.status(404).json('User not found');

    if (!(user.contacts.includes(req.params.id) || friend.pendingContacts.includes(req.apiUserId)))
      return res.status(409).json('Can not remove someone not in your contacts');

    //current user
    await user.updateOne({ $pull: { contacts: req.params.id, pendingContacts: req.params.id } }, { timestamps: false });
    //user's friend
    await friend.updateOne({ $pull: { contacts: req.apiUserId, pendingContacts: req.apiUserId } }, { timestamps: false });

    return res.status(200).json();
  },
];
