/**
 * @openapi
 * /user/friend/block/{id}:
 *   post:
 *     summary: Block a friend
 *     description: Blocks the user with the specified ID as a friend.
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
 *         description: ID of the user to block as a friend.
 *     responses:
 *       '200':
 *         description: Returns an empty response if the friend was blocked successfully.
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
 *         description: Returns an error message if the user is already blocked.
 *         content:
 *           application/json:
 *             type: string
 *             example: Already blocked
 *       '418':
 *         description: Returns an error message if the user tries to block themselves as a friend.
 *         content:
 *           application/json:
 *             type: string
 *             example: You can't run from yourself...
 */

const joi = require('joi');
const { UserModel } = require('../../../../models/User');

const { joiValidate, InformationTypes } = require('../../../../middleware/validation');
const { isObjectID } = require('../../../../utils');

module.exports.post = [
  joiValidate({ id: joi.custom(isObjectID) }, InformationTypes.PARAMS),
  async (req, res) => {
    if (req.params.id == req.apiUserId) return res.status(418).json("You can't run from yourself...");

    let user = await UserModel.findOne({ _id: req.apiUserId }).select('blocked');
    if (user.blocked.includes(req.params.id)) return res.status(409).json('Already blocked');

    let exFriend = await UserModel.findOne({ _id: req.params.id });
    if (!exFriend) return res.status(404).json('User not found');

    await exFriend.updateOne(
      {
        $pull: { pendingContacts: req.apiUserId, contacts: req.apiUserId },
        $push: { blocked: req.apiUserId },
      },
      { timestamps: false }
    );

    await user.updateOne(
      {
        $pull: { pendingContacts: req.params.id, contacts: req.params.id },
        $push: { blocked: req.params.id },
      },
      { timestamps: false }
    );

    return res.status(200).json();
  },
];
