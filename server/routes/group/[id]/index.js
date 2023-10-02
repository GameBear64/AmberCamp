const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationType } = require('../../../enums.js');
const { joiValidate, allowNoBodyChanges } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');
const { ParticipantModel } = require('../../../models/Participant');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({
    name: joi.string().min(3).max(30).optional(),
    icon: joi.string().optional(),
    users: joi.array().items(joi.custom(isObjectID)).min(1).optional(),
  }),
  async (req, res) => {
    const conversation = await ConversationModel.findOne({
      _id: ObjectId(req.params.id),
      type: ConversationType.Group,
      users: { $all: [ObjectId(req.apiUserId)] },
    });

    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (!groupMember.groupOwner) return res.status(403).json('Only the group owner can edit the group.');

    await ConversationModel.updateOne({ _id: conversation._id }, { ...req.body });

    // TODO handle new users, create p[articipans for each]
    return res.status(200).json();
  },
];
