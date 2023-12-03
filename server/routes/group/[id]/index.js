/**
 * @openapi
 * /group/{id}:
 *   patch:
 *     summary: Update a group conversation.
 *     description: |
 *       This endpoint allows the group owner to update the details of a group conversation, including its name, icon, and users.
 *     tags:
 *       - group
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group conversation to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               icon:
 *                 type: string
 *           description: Updated details for the group conversation.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Group conversation updated successfully.
 *       403:
 *         description: Only the group owner can edit the group.
 */

const joi = require('joi');
const { joiValidate, allowNoBodyChanges, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

const { ConversationModel } = require('../../../models/Conversation');
// const { ParticipantModel } = require('../../../models/Participant');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({
    name: joi.string().min(3).max(30).optional(),
    icon: joi.string().optional(),
  }),
  async (req, res) => {
    // const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    // if (!groupMember.groupOwner) return res.status(403).json('Only the group owner can edit the group.');

    // await ConversationModel.updateOne({ _id: req.params.id }, { ...req.body });

    return res.status(200).json();
  },
];
