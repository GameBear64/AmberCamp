/**
 * @openapi
 * /group/create:
 *   post:
 *     summary: Create a new group conversation.
 *     description: |
 *       This endpoint allows the group owner to create a new group conversation with the specified name, icon, and users.
 *     tags:
 *       - group
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
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *           description: Details for creating the new group conversation.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Group conversation created successfully.
 *       403:
 *         description: Only the group owner can create a group conversation.
 */

const joi = require('joi');

const { joiValidate, allowNoBodyChanges, InformationTypes } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');
const { ConversationType } = require('../../enums.js');

const { ConversationModel } = require('../../models/Conversation');
const { ParticipantModel } = require('../../models/Participant');

module.exports.post = [
  allowNoBodyChanges(),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({
    name: joi.string().min(3).max(30),
    icon: joi.string().optional(),
    users: joi.array().items(joi.custom(isObjectID)).min(1).required(),
  }),
  async (req, res) => {
    const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    if (!groupMember.groupOwner) return res.status(403).json('Only the group owner can edit the group.');

    await ConversationModel.create({
      type: ConversationType.Group,
      name: req.body.name,
      icon: req.body.icon,
      users: { $each: req.body.users },
    });

    return res.status(200).json();
  },
];
