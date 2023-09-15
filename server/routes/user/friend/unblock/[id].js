/**
 * @openapi
 * /friend/unblock/{id}:
 *   post:
 *     summary: Unblock a friend
 *     description: Unblocks the user with the specified ID who was previously blocked as a friend.
 *     tags:
 *       - friends
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unblock as a friend.
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend was unblocked successfully.
 *       '400':
 *         description: Returns an error message if the ID is invalid.
 *         content:
 *           application/json:
 *             type: string
 *             example: Invalid Id
 *       '404':
 *         description: Returns an error message if the user is not found.
 *         content:
 *           application/json:
 *             type: string
 *             example: User not found
 *       '409':
 *         description: Returns an error message if the user is not blocked.
 *         content:
 *           application/json:
 *             type: string
 *             example: Already not blocked
 *       '418':
 *         description: Returns an error message if the user tries to unblock themselves as a friend.
 *         content:
 *           application/json:
 *             type: string
 *             example: I can't help you with this...
 */

const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

const validationSchema = joi.object({
  id: joi.custom(isObjectID),
});

module.exports.post = [
  joiValidate(validationSchema, 'params'),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("I can't help you with this...");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('blocked');
    if (!user.blocked.includes(req.params.id)) return res.status(409).json('Already not blocked');

    let exFriend = await UserModel.findOne({ _id: req.params.id });
    if (!exFriend) return res.status(404).json('User not found');

    await exFriend.updateOne({ $pull: { blocked: req.apiUserId } }, { timestamps: false });
    await user.updateOne({ $pull: { blocked: req.params.id } }, { timestamps: false });

    return res.status(200).json();
  },
];
