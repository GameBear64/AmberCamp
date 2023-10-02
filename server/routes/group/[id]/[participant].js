// auth owner and [participant]
// PUT: put one participant [participant] into the group [id]
// DELETE: kick or leave the group, authorized by the group leader or participant themself
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
    nickname: joi.string().max(30).optional(),
    color: joi.string().optional(),
  }),
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (!(groupMember.groupOwner || req.params.participant == req.apiUserId)) {
      return res.status(403).json('You do not have permission to do this.');
    }

    await ParticipantModel.updateOne({ _id: req.params.id }, { ...req.body });
    return res.status(200).json();
  },
];

module.exports.put = [
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (groupMember.groupOwner) return res.status(403).json('You do not have permission to do this.');

    // await ParticipantModel.updateOne({ _id: req.params.id }, { ...req.body });
    // create new participant
    // put in group
    return res.status(200).json();
  },
];

module.exports.patch = [
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (!(groupMember.groupOwner || req.params.participant == req.apiUserId)) {
      return res.status(403).json('You do not have permission to do this.');
    }

    await ParticipantModel.updateOne({ _id: req.params.id }, { ...req.body });
    return res.status(200).json();
  },
];
