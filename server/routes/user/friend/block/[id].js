const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate, InformationTypes } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

module.exports.post = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("You can't run from yourself...");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('blocked');
    if (user.blocked.includes(req.params.id)) return res.status(409).json('Already blocked');

    let exFriend = await UserModel.findOne({ _id: req.params.id });
    if (!exFriend) return res.status(404).json('User not found');

    await exFriend.updateOne(
      {
        $pull: { pendingContacts: req.apiUserId, contacts: req.apiUserId },
        $push: { blocked: req.apiUserId },
      },
      { timestamps: false }
    );

    await user.updateOne(
      {
        $pull: { pendingContacts: req.params.id, contacts: req.params.id },
        $push: { blocked: req.params.id },
      },
      { timestamps: false }
    );

    return res.status(200).json();
  },
];
