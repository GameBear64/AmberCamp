const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const { ConversationModel } = require('../../../models/Conversation');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

module.exports.get = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({ messageId: joi.custom(isObjectID) }),
  async (req, res) => {

    const result = await ConversationModel.updateOne(
      { id: req.params.id, 'participants.user': ObjectId(req.apiUserId) },
      { $set: { "participants.$.lastMessageSeen" : req.body.messageId } },
      { timestamps: false }
    );

    // if acknowledged
    return res.status(200).json();
    // else
    // return res.status(404).json('No conversation found.');
  },
];