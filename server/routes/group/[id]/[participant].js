/**
 * @openapi
 * /group/{id}/{participant}:
 *   patch:
 *     summary: Update participant details.
 *     description: |
 *       This endpoint allows a group owner or the participant themselves to update participant details within a conversation.
 *     tags:
 *       - group
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation.
 *       - in: path
 *         name: participant
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the participant to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 maxLength: 30
 *               color:
 *                 type: string
 *           description: Participant details to update.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Participant details updated successfully.
 *       403:
 *         description: You do not have permission to do this.s
 *   delete:
 *     summary: Remove a participant from a conversation.
 *     description: |
 *       This endpoint allows a group owner or the participant themselves to remove a participant from a conversation.
 *     tags:
 *       - group
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation.
 *       - in: path
 *         name: participant
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the participant to remove.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Participant removed from the conversation successfully.
 *       403:
 *         description: You do not have permission to do this.
 */

const joi = require('joi');

const { joiValidate, allowNoBodyChanges, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');
const { ParticipantModel } = require('../../../models/Participant');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate(
    {
      id: joi.custom(isObjectID),
      participant: joi.custom(isObjectID),
    },
    InformationTypes.PARAMS
  ),
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
  joiValidate(
    {
      id: joi.custom(isObjectID),
      participant: joi.custom(isObjectID),
    },
    InformationTypes.PARAMS
  ),
  async (req, res) => {
    // direct messages do not have group owners so this guards against dms as well
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (groupMember.groupOwner) return res.status(403).json('You do not have permission to do this.');

    await ConversationModel.updateOne({ _id: req.params.id }, { $push: { users: req.params.participant } });

    return res.status(200).json();
  },
];

module.exports.delete = [
  joiValidate(
    {
      id: joi.custom(isObjectID),
      participant: joi.custom(isObjectID),
    },
    InformationTypes.PARAMS
  ),
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (!(groupMember.groupOwner || req.params.participant == req.apiUserId)) {
      return res.status(403).json('You do not have permission to do this.');
    }

    await ConversationModel.updateOne({ _id: req.params.id }, { $pull: { users: req.params.participant } });

    return res.status(200).json();
  },
];
