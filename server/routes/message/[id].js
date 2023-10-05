/**
 * @openapi
 * /message/{id}:
 *   patch:
 *     summary: Update a message.
 *     description: |
 *       This endpoint allows a user to update a specific message, including its content and reactions.
 *     tags:
 *       - message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 maxLength: 50000
 *               reactions:
 *                 type: array
 *           description: Updated message details.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Message updated successfully.
 *       403:
 *         description: You do not have permission to update this message.
 *       404:
 *         description: Message not found.
 *   delete:
 *     summary: Delete a message.
 *     description: |
 *       This endpoint allows a user to delete a specific message.
 *     tags:
 *       - message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *       403:
 *         description: You do not have permission to delete this message.
 *       404:
 *         description: Message not found.
 */

const joi = require('joi');
const { joiValidate, allowNoBodyChanges, InformationTypes } = require('../../middleware/validation');
const { isObjectID } = require('../../utils');

const { MessageModel } = require('../../models/Message');

module.exports.patch = [
  allowNoBodyChanges(),
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({
    message: joi.string().max(50000).required(),
    reactions: joi.array().optional(),
  }),
  async (req, res) => {
    const targetMessage = await MessageModel.findOne({ _id: req.params.id });

    if (!targetMessage) return res.status(404).json();
    if (targetMessage.author !== req.apiUserId) return res.status(403);

    await targetMessage.updateOne({ ...req.body });

    return res.status(200).json();
  },
];

module.exports.delete = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    const targetMessage = await MessageModel.findOne({ _id: req.params.id });

    if (!targetMessage) return res.status(404).json();
    if (targetMessage.author !== req.apiUserId) return res.status(403);

    await targetMessage.deleteOne();

    res.status(200).json();
  },
];
