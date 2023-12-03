// group/[id]/transfer?to='userId'
/**
 * @openapi
 * /group/{id}/transfer:
 *   put:
 *     summary: Transfer group ownership.
 *     description: |
 *       This endpoint allows the current group owner to transfer ownership of a group to another user.
 *     tags:
 *       - group
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group to transfer ownership.
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to transfer ownership to.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Group ownership transferred successfully.
 *       403:
 *         description: You do not own this group, therefore you cannot transfer it.
 *       404:
 *         description: Could not find specified user.
 */

const joi = require('joi');

// const { ParticipantModel } = require('../../../models/Participant');
const { joiValidate, InformationTypes } = require('../../../middleware/validation');
const { isObjectID } = require('../../../utils');

module.exports.put = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  joiValidate({ to: joi.custom(isObjectID) }, InformationTypes.QUERY),

  async (req, res) => {
    // const groupMember = await ParticipantModel.findOne({ user: req.apiUserId, conversation: req.params.id });
    // if (groupMember.groupOwner) return res.status(403).json('You do not own this group, therefore you cannot transfer it.');

    // const targetMember = await ParticipantModel.findOne({ user: req.query.to, conversation: req.params.id });
    // if (!targetMember) return res.status(404).json('Could not find specified user.');

    // await groupMember.updateOne({ groupOwner: false });
    // await targetMember.updateOne({ groupOwner: true });

    return res.status(200).json();
  },
];
