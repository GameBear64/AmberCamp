/**
 * @openapi
 * /conversation/{id}/hide:
 *   get:
 *     summary: Hide a conversation from chat history.
 *     description: |
 *       This endpoint allows a user to hide a conversation from their chat history. The user must not be the owner of the conversation to perform this action.
 *     tags:
 *       - conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to hide.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: conversation hidden successfully.
 *       403:
 *         description: Cannot hide conversations that you own.
 */

const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

// const { ParticipantModel } = require('../../../models/Participant');
const { ConversationModel } = require('../../../models/Conversation');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

module.exports.get = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    // const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    // const [conversation] = await ConversationModel.aggregate([
    //   {
    //     $match: {
    //       users: { $all: [ObjectId(req.apiUserId)] },
    //     },
    //   },
    // ]);
    // if (groupMember.groupOwner) return res.status(403).json('Cannot hide groups that you own.');
    // await groupMember.updateOne({ hideFromHistory: true });
    return res.status(200).json();
  },
];
